import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(req: NextRequest, { params }: { params: { colecaoId: string } }) {
  const { colecaoId } = params;
  const nutricionistaId = 'ID_DO_NUTRICIONISTA_LOGADO'; // *** SUBSTITUA PELA LÓGICA REAL DE AUTENTICAÇÃO ***

  try {
    if (!nutricionistaId) {
      return NextResponse.json({ message: "Nutricionista não autenticado.", status: 401 });
    }

    const colecaoDocRef = db.collection('nutricionistas').doc(nutricionistaId).collection('colecoes').doc(colecaoId);
    const materiaisSubcollectionRef = colecaoDocRef.collection('materiais');
    const snapshot = await materiaisSubcollectionRef.get();
    const materiais = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(materiais, { status: 200 });
  } catch (error: any) {
    console.error(`Erro ao buscar materiais da coleção ${colecaoId}:`, error);
    return NextResponse.json({ message: `Erro ao buscar materiais da coleção ${colecaoId}`, status: 500 });
  }
}