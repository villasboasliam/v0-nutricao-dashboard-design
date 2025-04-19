"use client"

import { BarChart3, FileText, Home, LineChart, Menu, Users, Video } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EvolucaoPage() {
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
              <h2 className="text-lg font-medium">Evolução Física</h2>
            </div>
          </div>

          <Button variant="outline" className="ml-auto">
            Login
          </Button>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">Evolução Física</h1>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/pacientes">Selecionar Paciente</Link>
              </Button>
            </div>

            <Tabs defaultValue="peso" className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
                <TabsTrigger value="peso">Peso</TabsTrigger>
                <TabsTrigger value="composicao">Composição Corporal</TabsTrigger>
                <TabsTrigger value="medidas">Medidas</TabsTrigger>
                <TabsTrigger value="fotos">Fotos</TabsTrigger>
              </TabsList>

              <TabsContent value="peso" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução do Peso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                      <p className="text-muted-foreground">Selecione um paciente para visualizar a evolução do peso</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="composicao" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Composição Corporal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                      <p className="text-muted-foreground">
                        Selecione um paciente para visualizar a composição corporal
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medidas" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Medidas Corporais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                      <p className="text-muted-foreground">
                        Selecione um paciente para visualizar as medidas corporais
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fotos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Comparativo de Fotos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                      <p className="text-muted-foreground">
                        Selecione um paciente para visualizar o comparativo de fotos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
