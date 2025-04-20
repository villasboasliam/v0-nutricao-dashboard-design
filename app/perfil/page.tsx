"use client"

import { FileText, Home, LineChart, Menu, Save, Users, Video } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function PerfilPage() {
  const pathname = usePathname()
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()

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
              <h2 className="text-lg font-medium">{t("profile")}</h2>
            </div>
          </div>

          <ThemeToggle />
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">{t("my.profile")}</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("personal.info")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full gap-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" value="Dr. Ana Nutricionista" />
                    </div>
                    <div className="grid w-full gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value="ana.nutri@email.com" />
                    </div>
                    <div className="grid w-full gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" value="(11) 98765-4321" />
                    </div>
                    <div className="grid w-full gap-2">
                      <Label htmlFor="crn">CRN</Label>
                      <Input id="crn" value="CRN-3 12345" />
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      <Save className="mr-2 h-4 w-4" />
                      {t("save.changes")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("security")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Mantenha sua conta segura atualizando sua senha regularmente.
                    </p>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                      <Link href="/perfil/atualizar-senha">{t("update.password")}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("my.plan")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-2">{t("current.plan")}</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-lg">Plano Profissional</h4>
                          <Badge className="bg-indigo-600">Ativo</Badge>
                        </div>
                        <p className="text-2xl font-bold mb-2">
                          R$ 99,90<span className="text-sm font-normal text-muted-foreground">/mês</span>
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">Faturado mensalmente</p>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                          {t("upgrade.plan")}
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-2">{t("plan.features")}</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Até 150 pacientes
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Acesso a todos os recursos
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Exportação de relatórios
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Suporte prioritário
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">{t("billing.info")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Método de pagamento</p>
                        <p>Cartão de crédito terminando em 4242</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("next.billing")}</p>
                        <p>15/06/2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("account.settings")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">{t("notifications")}</h3>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificações por email</p>
                          <p className="text-sm text-muted-foreground">
                            Receber emails sobre novos pacientes e consultas
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline">Desativar</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificações no aplicativo</p>
                          <p className="text-sm text-muted-foreground">Receber notificações no aplicativo</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline">Desativar</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">{t("preferences")}</h3>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t("dark.theme")}</p>
                          <p className="text-sm text-muted-foreground">Alternar entre tema claro e escuro</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={theme === "dark" ? "default" : "outline"}
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className={theme === "dark" ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""}
                          >
                            {theme === "dark" ? "Ativado" : "Ativar"}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t("language")}</p>
                          <p className="text-sm text-muted-foreground">Selecionar idioma do sistema</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select value={language} onValueChange={(value) => setLanguage(value as "pt" | "en")}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Selecione o idioma" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pt">Português</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
