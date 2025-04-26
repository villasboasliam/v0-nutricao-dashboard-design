'use client';

import React, { useState } from 'react';
import { storage } from '@/lib/firebase'; // Certifique-se de ter configurado corretamente o Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function TesteUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Função para tratar o arquivo escolhido
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      console.log('Arquivo selecionado:', file.name);
    }
  };

  // Função para fazer o upload do arquivo
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Por favor, selecione um arquivo PDF.');
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    setLoading(true);
    setMessage('');
    console.log('Iniciando upload...');

    try {
      const storageRef = ref(storage, `uploads/${selectedFile.name}`); // Altere o caminho conforme necessário
      const snapshot = await uploadBytes(storageRef, selectedFile);

      console.log('Arquivo enviado com sucesso:', snapshot);
      setMessage('Upload realizado com sucesso!');
      
      // Agora, obtemos a URL do arquivo carregado
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('URL do arquivo:', downloadURL);

      // Você pode salvar essa URL no Firestore ou exibi-la na interface, se necessário
    } catch (error) {
      setMessage('Erro no upload do arquivo.');
      console.error('Erro no upload:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center">Teste de Envio de PDF</h1>

      <div className="mt-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="mt-4">
          {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
        >
          {loading ? 'Enviando...' : 'Enviar PDF'}
        </button>
      </div>

      {message && (
        <div className="mt-4 text-center">
          <p className={`text-lg ${message.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
        </div>
      )}
    </div>
  );
}
