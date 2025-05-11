import { NextRequest, NextResponse } from 'next/server';
import { admin } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  const emailToCheck = req.nextUrl.searchParams.get('email');

  if (!emailToCheck) {
    return NextResponse.json({ error: 'Por favor, forneça um e-mail como parâmetro.' }, { status: 400 });
  }

  try {
    const user = await admin.auth().getUserByEmail(emailToCheck);
    return NextResponse.json({ customClaims: user.customClaims }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json({ error: `Erro ao buscar usuário com o e-mail: ${emailToCheck}` }, { status: 500 });
  }
}