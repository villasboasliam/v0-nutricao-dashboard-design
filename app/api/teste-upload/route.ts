import { NextResponse } from 'next/server';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwpmYmOjIdNNNUp5fw96GDNkzFDVLwEYs",
  authDomain: "nutriapp-42e7f.firebaseapp.com",
  projectId: "nutriapp-42e7f",
  storageBucket: "nutriapp-42e7f.appspot.com",
  messagingSenderId: "190772156418",
  appId: "1:190772156418:web:b219b0de024ff64eff2f1b"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function POST(request: Request) {
  try {
    // Recebe o arquivo do formulário
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // Cria uma referência única para o arquivo no Firebase Storage
    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

    // Realiza o upload diretamente com o arquivo
    await uploadBytes(storageRef, file);  // Note que não precisamos mais de `Buffer.from` aqui

    // Sucesso no upload
    return NextResponse.json({
      success: true,
      filename: file.name,
      size: file.size
    });

  } catch (error: any) {
    console.error("Erro ao fazer upload:", error);

    return NextResponse.json(
      {
        error: "Falha no upload",
        details: error.message
      },
      { status: 500 }
    );
  }
}
