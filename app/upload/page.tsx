'use client'; // Certifique-se de que o componente é um Client Component

import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Por favor, selecione um arquivo para upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);  // O nome 'file' deve ser o mesmo que você usa no backend

    try {
      const response = await fetch('/api/teste-upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Upload bem-sucedido!');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
      alert('Erro ao fazer upload do arquivo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default UploadForm;
