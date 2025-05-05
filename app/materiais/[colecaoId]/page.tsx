"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

// Interface para representar um material (adapte conforme sua necessidade)
interface Material {
  id: string;
  nome: string;
  descricao?: string;
  url: string;
}

export default function ColecaoDetalhesPage() {
  const { colecaoId } = useParams()
  const [materiais, setMateriais] = useState<Material[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchMateriaisDaColecao = async () => {
      if (colecaoId) {
        // Aqui você fará a chamada para a sua API para buscar os materiais da coleção
        console.log("Buscando materiais da coleção:", colecaoId)

        // Exemplo de chamada simulada à API (substitua pela sua lógica real)
        try {
          const response = await fetch(`/api/colecoes/${colecaoId}/materiais`);
          if (response.ok) {
            const data = await response.json();
            setMateriais(data);
          } else {
            console.error("Erro ao buscar materiais da coleção");
          }
        } catch (error) {
          console.error("Erro de conexão ao buscar materiais:", error);
        }
      }
    }

    fetchMateriaisDaColecao()
  }, [colecaoId])

  return (
    <div className="flex flex-col min-h-screen py-6 bg-background">
      <div className="container mx-auto px-4">
        <Button variant="outline" className="mb-4" onClick={() => router.back()}>
          Voltar para Materiais
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight mb-4">
          Materiais da Coleção: {colecaoId}
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {materiais.map((material) => (
            <Card key={material.id}>
              <CardHeader>
                <CardTitle>{material.nome}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {material.descricao && <p className="text-sm text-muted-foreground">{material.descricao}</p>}
                <Button asChild>
                  <a href={material.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Visualizar PDF
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
          {materiais.length === 0 && <p>Nenhum material encontrado nesta coleção.</p>}
        </div>
      </div>
    </div>
  );
}