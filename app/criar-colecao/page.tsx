"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function CriarColecaoPage() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleCriarNovaColecao = async () => {
    // Aqui você fará a chamada para a sua API para salvar a nova coleção
    console.log("Criando coleção:", { nome, descricao })

    // Exemplo de chamada simulada à API (substitua pela sua lógica real)
    try {
      const response = await fetch('/api/colecoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, descricao }),
      });

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Coleção criada com sucesso.",
        });
        router.push('/materiais'); // Redireciona de volta para a página de materiais
      } else {
        const errorData = await response.json();
        toast({
          title: "Erro ao criar coleção",
          description: errorData.message || "Ocorreu um erro ao criar a coleção.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro de conexão",
        description: error.message || "Não foi possível conectar ao servidor.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Criar Nova Coleção</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome da Coleção</Label>
            <Input
              id="nome"
              placeholder="Ex: Guias de Receitas Veganas"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="descricao">Descrição (Opcional)</Label>
            <Input
              id="descricao"
              placeholder="Breve descrição da coleção"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <Button onClick={handleCriarNovaColecao}>Criar Coleção</Button>
          <Button variant="outline" onClick={() => router.back()}>Cancelar</Button>
        </CardContent>
      </Card>
    </div>
  );
}