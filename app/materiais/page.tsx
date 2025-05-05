"use client"

import { FileText, Home, LineChart, Menu, Plus, Upload, Users, Video } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation" // Import useRouter para navegação

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react" // Import useState

export default function MateriaisPage() {
  const pathname = usePathname()
  const router = useRouter() // Inicializa o router
  const { toast } = useToast()

  const [isAddingNewCollection, setIsAddingNewCollection] = useState(false) // Estado para controlar a visibilidade do formulário de nova coleção
  const [newCollectionTitle, setNewCollectionTitle] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [newCollectionPdf, setNewCollectionPdf] = useState<File | null>(null)

  // Função para lidar com o envio de material (a ser adaptada para coleções)
  const handleSendMaterial = () => {
    if (newCollectionTitle && newCollectionDescription && newCollectionPdf) {
      // Aqui você irá implementar a lógica para enviar os dados e o PDF para o Firebase
      console.log("Enviando nova coleção:", {
        title: newCollectionTitle,
        description: newCollectionDescription,
        pdf: newCollectionPdf,
      })
      toast({
        title: "Coleção adicionada com sucesso!",
        description: `A coleção "${newCollectionTitle}" foi criada.`,
        variant: "default",
      })
      setIsAddingNewCollection(false) // Esconde o formulário após o envio
      // Limpar os estados do formulário
      setNewCollectionTitle("")
      setNewCollectionDescription("")
      setNewCollectionPdf(null)
    } else {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos e selecione um arquivo PDF.",
        variant: "destructive",
      })
    }
  }

  const handleNewCollectionClick = () => {
    setIsAddingNewCollection(true) // Mostra o formulário de nova coleção
  }

  const handleCancelNewCollection = () => {
    setIsAddingNewCollection(false) // Esconde o formulário de nova coleção
    // Limpar os estados do formulário ao cancelar
    setNewCollectionTitle("")
    setNewCollectionDescription("")
    setNewCollectionPdf(null)
  }

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNewCollectionPdf(event.target.files[0])
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 flex-col bg-card border-r border-border lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
            <LineChart className="h-5 w-5" />
            <span>NutriDash</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          <Link
            href="/"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/pacientes"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/pacientes" || pathname.startsWith("/pacientes/")
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Users className="h-4 w-4" />
            Pacientes
          </Link>
          <Link
            href="/materiais"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/materiais"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <FileText className="h-4 w-4" />
            Materiais
          </Link>
          
          <Link
            href="/financeiro"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/financeiro"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
            Financeiro
          </Link>
          <Link
            href="/perfil"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/perfil"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Users className="h-4 w-4" />
            Perfil
          </Link>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
                  <LineChart className="h-5 w-5" />
                  <span>NutriDash</span>
                </Link>
              </div>
              <nav className="flex-1 space-y-1 p-2">
                <Link
                  href="/"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/pacientes"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/pacientes" || pathname.startsWith("/pacientes/")
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Pacientes
                </Link>
                <Link
                  href="/materiais"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/materiais"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Materiais
                </Link>
                
                <Link
                  href="/financeiro"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/financeiro"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                  Financeiro
                </Link>
                <Link
                  href="/perfil"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/perfil"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Perfil
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Materiais</h2>
            </div>
          </div>

          <ThemeToggle />
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">Biblioteca de Materiais</h1>
              <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleNewCollectionClick}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Coleção
              </Button>
            </div>

            {isAddingNewCollection && (
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Nova Coleção</CardTitle>
                  <CardDescription>Crie uma nova coleção de materiais para seus pacientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="grid w-full gap-2">
                      <Label htmlFor="collection-name">Nome da Coleção</Label>
                      <Input
                        id="collection-name"
                        placeholder="Ex: Dicas de Café da Manhã Saudável"
                        value={newCollectionTitle}
                        onChange={(e) => setNewCollectionTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid w-full gap-2">
                      <Label htmlFor="collection-description">Descrição</Label>
                      <Input
                        id="collection-description"
                        placeholder="Breve descrição da coleção"
                        value={newCollectionDescription}
                        onChange={(e) => setNewCollectionDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid w-full gap-2">
                      <Label htmlFor="pdf-upload">Arquivo PDF</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="pdf-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 dark:border-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              Clique para fazer upload ou arraste o arquivo
                            </p>
                            <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
                          </div>
                          <input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handlePdfChange}
                          />
                        </label>
                      </div>
                      {newCollectionPdf && (
                        <p className="mt-2 text-sm text-muted-foreground">Arquivo selecionado: {newCollectionPdf.name}</p>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" onClick={handleCancelNewCollection}>
                        Cancelar
                      </Button>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSendMaterial}>
                        Criar Coleção
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Aqui serão renderizados os cards dinamicamente */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Os cards dinâmicos serão inseridos aqui */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}