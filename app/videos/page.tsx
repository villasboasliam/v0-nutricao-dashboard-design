"use client"

import { FileText, Home, LineChart, Menu, Play, Plus, Users, Video } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"

// Importe o toast
import { useToast } from "@/components/ui/use-toast"

// Dentro da função VideosPage, adicione:
export default function VideosPage() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { toast } = useToast() // Adicione o hook useToast

  // Função para lidar com a adição de vídeo
  const handleAddVideo = () => {
    // Simulação de adição de vídeo
    toast({
      title: "Vídeo adicionado com sucesso!",
      description: "O vídeo foi adicionado à sua biblioteca.",
      variant: "default",
    })
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
            {t("dashboard")}
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
            {t("patients")}
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
            href="/videos"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/videos"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Video className="h-4 w-4" />
            {t("videos")}
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
            {t("profile")}
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
                  {t("dashboard")}
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
                  {t("patients")}
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
                  href="/videos"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/videos"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Video className="h-4 w-4" />
                  {t("videos")}
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
                  {t("profile")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{t("videos")}</h2>
            </div>
          </div>

          <ThemeToggle />
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">{t("video.library")}</h1>
              {/* Modifique o botão de adicionar vídeo: */}
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleAddVideo}>
                <Plus className="mr-2 h-4 w-4" />
                {t("new.video")}
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <img
                      src="/placeholder.svg?height=200&width=350"
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">Dicas para Alimentação Saudável</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Aprenda como montar um prato equilibrado e nutritivo.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      {t("watch")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <img
                      src="/placeholder.svg?height=200&width=350"
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">Exercícios para Perda de Peso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rotina de exercícios para complementar a dieta de emagrecimento.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      {t("watch")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <img
                      src="/placeholder.svg?height=200&width=350"
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">Receitas Proteicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Aprenda a preparar refeições ricas em proteínas e saborosas.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      {t("watch")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <img
                      src="/placeholder.svg?height=200&width=350"
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">Suplementação Nutricional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Guia completo sobre suplementos alimentares e quando utilizá-los.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      {t("watch")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
