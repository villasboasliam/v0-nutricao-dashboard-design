"use client"

import { Calendar, FileText, Home, LineChart, Menu, Plus, Users, Video } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FinanceiroPage() {
  const pathname = usePathname()
  const [valorConsulta, setValorConsulta] = useState("250,00")
  const [periodoGrafico, setPeriodoGrafico] = useState("mensal")

  // Dados fictícios de receita
  const receitaMensal = "R$ 12.500,00"
  const receitaSemanal = "R$ 3.250,00"
  const receitaAnual = "R$ 150.000,00"

  // Dados fictícios de consultas
  const consultas = [
    { id: 1, paciente: "Maria Silva", data: "15/05/2023", horario: "09:00", valor: "R$ 250,00", status: "Realizada" },
    { id: 2, paciente: "João Santos", data: "15/05/2023", horario: "10:30", valor: "R$ 250,00", status: "Realizada" },
    { id: 3, paciente: "Ana Oliveira", data: "16/05/2023", horario: "14:00", valor: "R$ 250,00", status: "Agendada" },
    { id: 4, paciente: "Carlos Pereira", data: "16/05/2023", horario: "15:30", valor: "R$ 250,00", status: "Agendada" },
    { id: 5, paciente: "Juliana Costa", data: "17/05/2023", horario: "09:00", valor: "R$ 300,00", status: "Agendada" },
    {
      id: 6,
      paciente: "Roberto Almeida",
      data: "17/05/2023",
      horario: "10:30",
      valor: "R$ 250,00",
      status: "Agendada",
    },
    { id: 7, paciente: "Fernanda Lima", data: "18/05/2023", horario: "14:00", valor: "R$ 250,00", status: "Agendada" },
    { id: 8, paciente: "Marcelo Santos", data: "18/05/2023", horario: "15:30", valor: "R$ 250,00", status: "Agendada" },
  ]

  // Dados para os gráficos de diferentes períodos
  const dadosSemanal = [450, 580, 320, 480, 650, 420, 350]
  const labelsSemanal = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

  const dadosMensal = [8500, 9200, 10500, 11000, 10200, 9800, 10500, 11200, 12000, 12500, 13000, 12500]
  const labelsMensal = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const dadosAnual = [95000, 105000, 120000, 135000, 150000]
  const labelsAnual = ["2019", "2020", "2021", "2022", "2023"]

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
            href="/videos"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/videos"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Video className="h-4 w-4" />
            Vídeos
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
                  href="/videos"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/videos"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Video className="h-4 w-4" />
                  Vídeos
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
              <h2 className="text-lg font-medium">Controle Financeiro</h2>
            </div>
          </div>

          <ThemeToggle />
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">Controle Financeiro</h1>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Nova Consulta
              </Button>
            </div>

            {/* Valor padrão da consulta */}
            <Card>
              <CardHeader>
                <CardTitle>Valor Padrão da Consulta</CardTitle>
                <CardDescription>Este valor será aplicado como padrão para todas as consultas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4">
                  <div className="grid w-full max-w-sm gap-2">
                    <Label htmlFor="valor-consulta">Valor (R$)</Label>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">R$</span>
                      <Input
                        id="valor-consulta"
                        value={valorConsulta}
                        onChange={(e) => setValorConsulta(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Salvar</Button>
                </div>
              </CardContent>
            </Card>

            {/* Métricas financeiras */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Receita Semanal</CardTitle>
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
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{receitaSemanal}</div>
                  <p className="text-xs text-muted-foreground">13 consultas esta semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
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
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{receitaMensal}</div>
                  <p className="text-xs text-muted-foreground">50 consultas este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Receita Anual</CardTitle>
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
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{receitaAnual}</div>
                  <p className="text-xs text-muted-foreground">600 consultas este ano</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de receita com seletor de período */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Receita</CardTitle>
                    <CardDescription>Evolução da receita por período</CardDescription>
                  </div>
                  <Tabs value={periodoGrafico} onValueChange={setPeriodoGrafico} className="w-full sm:w-auto">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="semanal">Semanal</TabsTrigger>
                      <TabsTrigger value="mensal">Mensal</TabsTrigger>
                      <TabsTrigger value="anual">Anual</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {periodoGrafico === "semanal" && (
                    <RevenueChart data={dadosSemanal} labels={labelsSemanal} prefix="R$ " />
                  )}
                  {periodoGrafico === "mensal" && (
                    <RevenueChart data={dadosMensal} labels={labelsMensal} prefix="R$ " />
                  )}
                  {periodoGrafico === "anual" && <RevenueChart data={dadosAnual} labels={labelsAnual} prefix="R$ " />}
                </div>
              </CardContent>
            </Card>

            {/* Agenda e Consultas */}
            <Tabs defaultValue="agenda" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
                <TabsTrigger value="consultas">Consultas</TabsTrigger>
              </TabsList>

              {/* Aba de Agenda */}
              <TabsContent value="agenda" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Agenda de Consultas</CardTitle>
                    <CardDescription>Integração com Google Calendário</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            Sincronizar com Google Calendário
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select defaultValue="maio">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Selecione o mês" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="janeiro">Janeiro</SelectItem>
                              <SelectItem value="fevereiro">Fevereiro</SelectItem>
                              <SelectItem value="marco">Março</SelectItem>
                              <SelectItem value="abril">Abril</SelectItem>
                              <SelectItem value="maio">Maio</SelectItem>
                              <SelectItem value="junho">Junho</SelectItem>
                              <SelectItem value="julho">Julho</SelectItem>
                              <SelectItem value="agosto">Agosto</SelectItem>
                              <SelectItem value="setembro">Setembro</SelectItem>
                              <SelectItem value="outubro">Outubro</SelectItem>
                              <SelectItem value="novembro">Novembro</SelectItem>
                              <SelectItem value="dezembro">Dezembro</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="2023">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Ano" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2023">2023</SelectItem>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2025">2025</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
                          <div>Dom</div>
                          <div>Seg</div>
                          <div>Ter</div>
                          <div>Qua</div>
                          <div>Qui</div>
                          <div>Sex</div>
                          <div>Sáb</div>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {/* Dias do mês - primeira semana */}
                          <div className="h-24 border rounded-md p-1 text-muted-foreground">30</div>
                          <div className="h-24 border rounded-md p-1">1</div>
                          <div className="h-24 border rounded-md p-1">2</div>
                          <div className="h-24 border rounded-md p-1">3</div>
                          <div className="h-24 border rounded-md p-1">4</div>
                          <div className="h-24 border rounded-md p-1">5</div>
                          <div className="h-24 border rounded-md p-1">6</div>

                          {/* Segunda semana */}
                          <div className="h-24 border rounded-md p-1">7</div>
                          <div className="h-24 border rounded-md p-1">8</div>
                          <div className="h-24 border rounded-md p-1">9</div>
                          <div className="h-24 border rounded-md p-1">10</div>
                          <div className="h-24 border rounded-md p-1">11</div>
                          <div className="h-24 border rounded-md p-1">12</div>
                          <div className="h-24 border rounded-md p-1">13</div>

                          {/* Terceira semana */}
                          <div className="h-24 border rounded-md p-1">14</div>
                          <div className="h-24 border rounded-md p-1 bg-indigo-50 dark:bg-indigo-950">
                            <div className="text-sm">15</div>
                            <div className="text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 mt-1 text-indigo-600 dark:text-indigo-300">
                              09:00 - Maria S.
                            </div>
                            <div className="text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 mt-1 text-indigo-600 dark:text-indigo-300">
                              10:30 - João S.
                            </div>
                          </div>
                          <div className="h-24 border rounded-md p-1 bg-indigo-50 dark:bg-indigo-950">
                            <div className="text-sm">16</div>
                            <div className="text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 mt-1 text-indigo-600 dark:text-indigo-300">
                              14:00 - Ana O.
                            </div>
                            <div className="text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 mt-1 text-indigo-600 dark:text-indigo-300">
                              15:30 - Carlos P.
                            </div>
                          </div>
                          <div className="h-24 border rounded-md p-1 bg-indigo-50 dark:bg-indigo-950">
                            <div className="text-sm">17</div>
                            <div className="text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 mt-1 text-indigo-600 dark:text-indigo-300">
                              09:00 - Juliana C.
                            </div>
                            <div className="text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 mt-1 text-indigo-600 dark:text-indigo-300">
                              10:30 - Roberto A.
                            </div>
                          </div>
                          <div className="h-24 border rounded-md p-1 bg-indigo-50 dark:bg-indigo-950">
                            <div className="text-sm">18</div>
                            <div className="text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 mt-1 text-indigo-600 dark:text-indigo-300">
                              14:00 - Fernanda L.
                            </div>
                            <div className="text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 mt-1 text-indigo-600 dark:text-indigo-300">
                              15:30 - Marcelo S.
                            </div>
                          </div>
                          <div className="h-24 border rounded-md p-1">19</div>
                          <div className="h-24 border rounded-md p-1">20</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Consultas */}
              <TabsContent value="consultas" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Consultas</CardTitle>
                    <CardDescription>Consultas realizadas e agendadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Paciente</th>
                            <th className="text-left p-2">Data</th>
                            <th className="text-left p-2">Horário</th>
                            <th className="text-left p-2">Valor</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {consultas.map((consulta) => (
                            <tr key={consulta.id} className="border-b">
                              <td className="p-2">{consulta.paciente}</td>
                              <td className="p-2">{consulta.data}</td>
                              <td className="p-2">{consulta.horario}</td>
                              <td className="p-2">{consulta.valor}</td>
                              <td className="p-2">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    consulta.status === "Realizada"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  }`}
                                >
                                  {consulta.status}
                                </span>
                              </td>
                              <td className="p-2">
                                <Button variant="outline" size="sm">
                                  Detalhes
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

// Componente para o gráfico de receita
function RevenueChart({ data, labels, prefix = "" }) {
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data) * 0.8 // Usamos 80% do valor mínimo como base
  const yAxisMax = maxValue + (maxValue - minValue) * 0.2 // Topo é 20% acima da diferença

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 items-end gap-2">
        {data.map((value, i) => (
          <div key={i} className="relative flex w-full flex-col items-center">
            <div className="absolute -top-6 text-xs font-medium">
              {prefix}
              {value}
            </div>
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
        {labels.map((label, i) => (
          <div key={i} className="text-xs font-medium">
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
