import { NextRequest, NextResponse } from 'next/server';
import { admin } from '@/lib/firebase-admin';
import nodemailer from 'nodemailer';

// Configure o transporter do Nodemailer (fora da função handler para ser reutilizado)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // Use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const { nome, email, telefone, nutricionistaId } = await req.json();

  if (!nome || !email || !telefone || !nutricionistaId) {
    return NextResponse.json({ error: 'Por favor, preencha todos os campos.' }, { status: 400 });
  }

  try {
    // 1. Criar usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      // Sem senha aqui. O Firebase enviará um e-mail de verificação/redefinição.
    });

    const uid = userRecord.uid;

    // Adicionar custom claims para identificar o paciente e a plataforma
    await admin.auth().setCustomUserClaims(uid, { role: 'paciente', platform: 'app' });

    // 2. Criar documento no Firestore com o UID como ID
    await admin.firestore()
      .collection('nutricionistas')
      .doc(nutricionistaId)
      .collection('pacientes')
      .doc(uid)
      .set({
        nome,
        email,
        telefone,
        status: "Ativo",
        data_criacao: admin.firestore.FieldValue.serverTimestamp(),
      });

    // 3. Enviar e-mail de verificação (que também permite definir a senha)
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/login`, // URL para onde o paciente será redirecionado
      handleCodeInApp: false, // O código não será tratado no app antes de redirecionar
    };
    const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);

    // 4. Enviar o e-mail de verificação
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verifique seu e-mail para acessar o NutriDash App',
      html: `<p>Olá ${nome},</p><p>Por favor, clique no link abaixo para verificar seu e-mail e definir sua senha para acessar o **NutriDash App**:</p><p><a href="${link}">${link}</a></p><p>Se você não solicitou este cadastro, pode ignorar este e-mail.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`E-mail de verificação enviado para ${email}`);

    return NextResponse.json({ message: 'Paciente criado com sucesso! Um e-mail de verificação foi enviado para o **NutriDash App**.', uid: uid }, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao criar paciente ou enviar e-mail:', error);
    let errorMessage = 'Erro ao criar o paciente.';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Este e-mail já está em uso.';
    } else if (error.message.includes('Failed to send email')) {
      errorMessage = 'Erro ao enviar o e-mail de verificação.';
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}