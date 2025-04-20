"use client"

import { BarChart3, FileText, Home, LineChart, Menu, Plus, Users, Video } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DietasPage() {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 flex-col bg-white border-r border-border lg:flex">
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
              pathname === "/" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/pacientes"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/pacientes" || pathname.startsWith("/pacientes/")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users className="h-4 w-4" />
            Pacientes
          </Link>
          <Link
            href="/dietas"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/dietas" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FileText className="h-4 w-4" />
            Dietas
          </Link>
          <Link
            href="/videos"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/videos" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Video className="h-4 w-4" />
            Vídeos
          </Link>
          <Link
            href="/evolucao"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/evolucao" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Evolução Física
          </Link>
          <Link
            href="/perfil"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/perfil" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users className="h-4 w-4" />
            Perfil
          </Link>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
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
                    pathname === "/" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/pacientes"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/pacientes" || pathname.startsWith("/pacientes/")
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Pacientes
                </Link>
                <Link
                  href="/dietas"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/dietas" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Dietas
                </Link>
                <Link
                  href="/videos"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/videos" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Video className="h-4 w-4" />
                  Vídeos
                </Link>
                <Link
                  href="/evolucao"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/evolucao" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Evolução Física
                </Link>
                <Link
                  href="/perfil"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/perfil" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
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
              <h2 className="text-lg font-medium">Dietas</h2>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">Biblioteca de Dietas</h1>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Nova Dieta
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dieta de Emagrecimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Plano alimentar para redução de peso com déficit calórico moderado.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dieta Hipertrófica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Plano alimentar para ganho de massa muscular com superávit calórico.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dieta Low Carb</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Plano alimentar com baixo teor de carboidratos e maior consumo de proteínas.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dieta Cetogênica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Plano alimentar com alto teor de gorduras e mínimo de carboidratos.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dieta Vegetariana</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Plano alimentar sem carnes, com foco em proteínas vegetais.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dieta para Diabéticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Plano alimentar com controle de índice glicêmico e carboidratos.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
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
