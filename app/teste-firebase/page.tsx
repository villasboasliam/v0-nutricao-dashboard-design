"use client"

import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function TesteFirebasePage() {
  const [mensagem, setMensagem] = useState("Conectando...")

  useEffect(() => {
    async function testarFirebase() {
      try {
        // Adiciona um documento de teste
        const docRef = await addDoc(collection(db, "testes"), {
          criadoEm: new Date(),
          mensagem: "Olá Firebase!",
        })

        // Busca todos os documentos da coleção "testes"
        const snapshot = await getDocs(collection(db, "testes"))
        const docs = snapshot.docs.map(doc => doc.data())

        setMensagem(`✅ Conectado! Documentos encontrados: ${docs.length}`)
      } catch (error) {
        console.error("Erro ao testar Firebase:", error)
        setMensagem("❌ Erro ao conectar com Firebase")
      }
    }

    testarFirebase()
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Teste de Conexão Firebase</h1>
      <p>{mensagem}</p>
    </div>
  )
}
