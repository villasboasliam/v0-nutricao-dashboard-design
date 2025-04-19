"use client"

import { useState } from "react"
import { FileText, Home, LineChart, Menu, Search, Users, Video } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"

// Dados fictícios de pacientes
const patients = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 98765-4321",
    lastVisit: "15/04/2023",
    status: "Ativo",
    metrics: {
      weight: "68.5",
      height: "165",
      imc: "25.2",
      bodyFat: "24.8%",
    },
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "(11) 91234-5678",
    lastVisit: "22/04/2023",
    status: "Ativo",
    metrics: {
      weight: "82.3",
      height: "178",
      imc: "26.0",
      bodyFat: "18.5%",
    },
  },
  {
    id: "3",
    name: "Ana Oliveira",
    email: "ana.oliveira@email.com",
    phone: "(11) 99876-5432",
    lastVisit: "10/04/2023",
    status: "Inativo",
    metrics: {
      weight: "59.8",
      height: "162",
      imc: "22.8",
      bodyFat: "26.2%",
    },
  },
  {
    id: "4",
    name: "Carlos Pereira",
    email: "carlos.pereira@email.com",
    phone: "(11) 98765-1234",
    lastVisit: "05/04/2023",
    status: "Ativo",
    metrics: {
      weight: "75.6",
      height: "175",
      imc: "24.7",
      bodyFat: "15.3%",
    },
  },
  {
    id: "5",
    name: "Juliana Costa",
    email: "juliana.costa@email.com",
    phone: "(11) 91234-9876",
    lastVisit: "18/04/2023",
    status: "Ativo",
    metrics: {
      weight: "63.2",
      height: "168",
      imc: "22.4",
      bodyFat: "23.7%",
    },
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const pathname = usePathname()
  const { t } = useLanguage()

  // Filtra os pacientes com base no termo de pesquisa
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 flex-col bg-card border-r border-border lg:flex fixed h-full">
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
          <div
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed"
            title="Disponível na página de cada paciente"
          >
            <FileText className="h-4 w-4" />
            Dietas
          </div>
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

      <div className="lg:ml-64 flex-1 flex flex-col">
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
                <div
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed"
                  title="Disponível na página de cada paciente"
                >
                  <FileText className="h-4 w-4" />
                  Dietas
                </div>
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
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar pacientes..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>

          <ThemeToggle />

          <Button variant="outline" className="ml-2">
            Login
          </Button>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">{t("patients")}</h1>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/">{t("back.to.dashboard")}</Link>
              </Button>
            </div>

            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="todos">{t("all")}</TabsTrigger>
                <TabsTrigger value="ativos">{t("active")}</TabsTrigger>
                <TabsTrigger value="inativos">{t("inactive")}</TabsTrigger>
              </TabsList>
              <TabsContent value="todos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("patient.list")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <Link key={patient.id} href={`/pacientes/${patient.id}`}>
                            <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                                </div>
                                <div>
                                  <p className="font-medium">{patient.name}</p>
                                  <p className="text-sm text-muted-foreground">{patient.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="hidden md:block">
                                  <p className="text-sm text-right">{t("last.visit")}</p>
                                  <p className="text-sm font-medium text-right">{patient.lastVisit}</p>
                                </div>
                                <div>
                                  <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      patient.status === "Ativo"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                    }`}
                                  >
                                    {patient.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                          <p className="text-muted-foreground">Nenhum paciente encontrado</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ativos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pacientes Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {filteredPatients
                        .filter((patient) => patient.status === "Ativo")
                        .map((patient) => (
                          <Link key={patient.id} href={`/pacientes/${patient.id}`}>
                            <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                                </div>
                                <div>
                                  <p className="font-medium">{patient.name}</p>
                                  <p className="text-sm text-muted-foreground">{patient.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="hidden md:block">
                                  <p className="text-sm text-right">{t("last.visit")}</p>
                                  <p className="text-sm font-medium text-right">{patient.lastVisit}</p>
                                </div>
                                <div>
                                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    {patient.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="inativos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pacientes Inativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {filteredPatients
                        .filter((patient) => patient.status === "Inativo")
                        .map((patient) => (
                          <Link key={patient.id} href={`/pacientes/${patient.id}`}>
                            <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                                </div>
                                <div>
                                  <p className="font-medium">{patient.name}</p>
                                  <p className="text-sm text-muted-foreground">{patient.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="hidden md:block">
                                  <p className="text-sm text-right">{t("last.visit")}</p>
                                  <p className="text-sm font-medium text-right">{patient.lastVisit}</p>
                                </div>
                                <div>
                                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                    {patient.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
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
