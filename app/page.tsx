"use client"

import { useState } from "react"
import { Calendar, FileText, Home, LineChart, Menu, Plus, Users, Video } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"

export default function Dashboard() {
  const isMobile = useMobile()
  const pathname = usePathname()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()

  // Simulação de estado de autenticação - em um cenário real, isso viria de um contexto de autenticação
  //const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Se não estiver autenticado, redireciona para a landing page
  //if (!isAuthenticated) {
  // Em um ambiente real, usaríamos um middleware ou hook para isso
  // Como estamos simulando, vamos apenas renderizar a landing page
  //  return (
  //    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
  //      <div className="text-center space-y-4 max-w-md">
  //        <LineChart className="h-12 w-12 text-indigo-600 mx-auto" />
  //        <h1 className="text-3xl font-bold">Bem-vindo ao NutriDash</h1>
  //        <p className="text-muted-foreground">
  //          A plataforma completa para nutricionistas gerenciarem seus pacientes e otimizarem seus resultados.
  //        </p>
  //        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-6">
  //          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
  //            <Link href="/landing">Conhecer a plataforma</Link>
  //          </Button>
  //          <Button variant="outline" asChild>
  //            <Link href="/login">Fazer login</Link>
  //          </Button>
  //        </div>
  //      </div>
  //    </div>
  //  )
  //}

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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{t("dashboard")}</h2>
            </div>
          </div>

          <ThemeToggle />

          <Button variant="outline" className="ml-2" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">{t("dashboard")}</h1>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    {t("add.patient")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("add.patient")}</DialogTitle>
                    <DialogDescription>
                      Preencha os dados do novo paciente para adicioná-lo ao sistema.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" placeholder="Nome do paciente" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@exemplo.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Celular</Label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Metric cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t("total.patients")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">+5 no último mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t("active.patients")}</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">84</div>
                  <p className="text-xs text-muted-foreground">+12% que semana passada</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t("sent.diets")}</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">243</div>
                  <p className="text-xs text-muted-foreground">+18 esta semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t("app.access.rate")}</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+5% que mês passado</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end mt-4">
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/pacientes">{t("view.all.patients")}</Link>
              </Button>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t("app.access")}</CardTitle>
                <CardDescription>{t("daily.access")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <AccessChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

// Modifique a função AccessChart para que as barras ocupem mais espaço vertical
function AccessChart() {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  const data = [65, 78, 82, 75, 89, 57, 63]
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data) * 0.8 // Usamos 80% do valor mínimo como base
  const yAxisMax = maxValue + (maxValue - minValue) * 0.2 // Topo é 20% acima da diferença

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 items-end gap-2">
        {data.map((value, i) => (
          <div key={i} className="relative flex w-full flex-col items-center">
            <div className="absolute -top-6 text-xs font-medium">{value}</div>
            <div
              className="w-full rounded-t-sm bg-indigo-500 shadow-md dark:bg-indigo-600"
              style={{
                height: `${((value - minValue) / (yAxisMax - minValue)) * 100}%`,
                minHeight: "20px",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex h-6 items-center justify-between mt-2">
        {days.map((day, i) => (
          <div key={i} className="text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}
