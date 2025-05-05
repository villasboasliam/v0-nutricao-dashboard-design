import { NextResponse, NextRequest } from 'next/server';
import { db, admin } from '@/lib/firebase-admin'; // Importe o 'admin'

async function getNutricionistaId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return null; // Token não encontrado ou formato incorreto
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null; // Token inválido
  }
}

export async function GET(req: NextRequest) {
  const nutricionistaId = await getNutricionistaId(req);

  if (!nutricionistaId) {
    return NextResponse.json({ message: "Nutricionista não autenticado.", status: 401 });
  }

  try {
    const nutricionistaDocRef = db.collection('nutricionistas').doc(nutricionistaId);
    const colecoesSubcollectionRef = nutricionistaDocRef.collection('colecoes');
    const snapshot = await colecoesSubcollectionRef.get();
    const colecoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(colecoes, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar coleções:", error);
    return NextResponse.json({ message: "Erro ao buscar coleções.", status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const nutricionistaId = await getNutricionistaId(req);

  if (!nutricionistaId) {
    return NextResponse.json({ message: "Nutricionista não autenticado.", status: 401 });
  }

  try {
    const { nome, descricao } = await req.json();

    if (!nome) {
      return NextResponse.json({ message: "O nome da coleção é obrigatório.", status: 400 });
    }

    const nutricionistaDocRef = db.collection('nutricionistas').doc(nutricionistaId);
    const colecoesSubcollectionRef = nutricionistaDocRef.collection('colecoes');

    const docRef = await colecoesSubcollectionRef.add({
      nome,
      descricao,
      createdAt: new Date(),
      ownerId: nutricionistaId,
    });

    const novaColecao = {
      id: docRef.id,
      nome,
      descricao,
      createdAt: new Date(),
      ownerId: nutricionistaId,
    };

    return NextResponse.json(novaColecao, { status: 201 }); // 201 Created

  } catch (error: any) {
    console.error("Erro ao criar coleção:", error);
    return NextResponse.json({ message: "Erro ao criar a coleção.", status: 500 });
  }
}