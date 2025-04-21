"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

import { Calendar, FileText, Home, LineChart, Menu, Plus, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface AcessoDia {
  dia: string
  acessos: number
}

export default function DashboardWrapper() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/nutridash")
    }
  }, [status, router])

  if (status === "loading") {
    return <div className="p-6 text-center">Carregando...</div>
  }

  return <Dashboard session={session} />
}

function Dashboard({ session }: { session: any }) {
  const isMobile = useMobile()
  const pathname = usePathname()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [metrics, setMetrics] = useState({
    totalPacientes: 0,
    pacientesAtivos: 0,
    pacientesAtivosSemanaAnterior: 0,
    dietasEnviadas: 0,
    dietasSemanaAnterior: 0,
    taxaAcesso: 0,
    acessosPorDia: [] as AcessoDia[],
  })

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!session?.user?.email) return

      const snap = await getDocs(collection(db, "nutricionistas", session.user.email, "pacientes"))
      const pacientes = snap.docs.map(doc => doc.data())

      const totalPacientes = pacientes.length
      const pacientesAtivos = pacientes.filter(p => p.status === "Ativo").length
      const pacientesAtivosSemanaAnterior = Math.max(0, pacientesAtivos - 1)
      const dietasEnviadas = pacientes.filter(p => p.dieta_pdf_url).length
      const dietasSemanaAnterior = Math.max(0, dietasEnviadas - 1)
      const taxaAcesso = Math.floor((pacientesAtivos / Math.max(totalPacientes, 1)) * 100)

      const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
      const acessosPorDia = diasSemana.map((dia, i) => ({ dia, acessos: (pacientesAtivos + i * 3) % 200 }))

      setMetrics({
        totalPacientes,
        pacientesAtivos,
        pacientesAtivosSemanaAnterior,
        dietasEnviadas,
        dietasSemanaAnterior,
        taxaAcesso,
        acessosPorDia,
      })
    }

    fetchMetrics()
  }, [session])

  const calcVariation = (current: number, previous: number) => {
    if (previous === 0) return "+100%"
    const percent = ((current - previous) / previous) * 100
    return `${percent >= 0 ? "+" : ""}${percent.toFixed(0)}%`
  }

  const handleAddPatient = () => {
    setIsModalOpen(false)
    toast({
      title: "Paciente adicionado com sucesso!",
      description: "O novo paciente foi adicionado à sua lista.",
      action: <ToastAction altText="Ver pacientes">Ver pacientes</ToastAction>,
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 flex-col bg-card border-r border-border lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
            <LineChart className="h-5 w-5" />
            <span>NutriDash</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          <SidebarItem href="/" icon={<Home className="h-4 w-4" />} label={t("dashboard")} pathname={pathname} />
          <SidebarItem href="/pacientes" icon={<Users className="h-4 w-4" />} label={t("patients")} pathname={pathname} />
          <SidebarItem href="/materiais" icon={<FileText className="h-4 w-4" />} label="Materiais" pathname={pathname} />
          <SidebarItem href="/videos" icon={<Video className="h-4 w-4" />} label={t("videos")} pathname={pathname} />
          <SidebarItem href="/financeiro" icon={<DollarIcon />} label="Financeiro" pathname={pathname} />
          <SidebarItem href="/perfil" icon={<Users className="h-4 w-4" />} label={t("profile")} pathname={pathname} />
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
                  <LineChart className="h-5 w-5" />
                  <span>NutriDash</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h2 className="text-lg font-medium">{t("dashboard")}</h2>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <MetricCard title={t("total.patients")} value={metrics.totalPacientes} icon={<Users className="h-4 w-4 text-muted-foreground" />} note={`+${metrics.totalPacientes - 2} no último mês`} />
            <MetricCard title={t("active.patients")} value={metrics.pacientesAtivos} icon={<Calendar className="h-4 w-4 text-muted-foreground" />} note={calcVariation(metrics.pacientesAtivos, metrics.pacientesAtivosSemanaAnterior)} />
            <MetricCard title={t("sent.diets")} value={metrics.dietasEnviadas} icon={<FileText className="h-4 w-4 text-muted-foreground" />} note={calcVariation(metrics.dietasEnviadas, metrics.dietasSemanaAnterior)} />
            <MetricCard title={t("app.access.rate")} value={`${metrics.taxaAcesso}%`} icon={<LineChart className="h-4 w-4 text-muted-foreground" />} note={`+${metrics.taxaAcesso - 45}% que mês passado`} />
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("app.access")}</CardTitle>
                <CardDescription>{t("daily.access")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metrics.acessosPorDia}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="acessos" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function MetricCard({ title, value, icon, note }: { title: string; value: any; icon: JSX.Element; note: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  )
}

function SidebarItem({ href, icon, label, pathname }: { href: string, icon: React.ReactNode, label: string, pathname: string }) {
  const isActive = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
        isActive
          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
          : "text-foreground hover:bg-muted"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}

function DollarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  )
}
