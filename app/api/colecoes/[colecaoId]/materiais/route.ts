import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/firebase-admin'; // Certifique-se de que este caminho está correto

export async function GET(req: NextRequest, { params }: { params: { colecaoId: string } }) {
  const { colecaoId } = params;

  try {
    // *** Adapte esta consulta ao seu modelo de dados no Firestore ***
    const materiaisRef = db.collection('materiais').where('colecaoId', '==', colecaoId);
    const snapshot = await materiaisRef.get();
    const materiais = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(materiais, { status: 200 });
  } catch (error: any) {
    console.error(`Erro ao buscar materiais da coleção ${colecaoId}:`, error);
    return NextResponse.json({ message: `Erro ao buscar materiais da coleção ${colecaoId}` }, { status: 500 });
  }
}