"use client"

import { useToast } from "@/components/ui/use-toast"
import { Sheet } from "@/components/ui/sheet"

import {
  FileText, Home, LineChart, Menu, Save, Users, Video, LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"


import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PerfilPage() {
  const pathname = usePathname()
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    crn: "",
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return
      const ref = doc(db, "nutricionistas", session.user.email)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        setFormData({
          nome: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
          crn: data.crn || "",
        })
      }
    }
    fetchUserData()
  }, [session])

  const handleSave = async () => {
    if (!session?.user?.email) return
    const ref = doc(db, "nutricionistas", session.user.email)
    await updateDoc(ref, {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      crn: formData.crn,
    })
    toast({
      title: "Informações salvas",
      description: "Seus dados foram atualizados com sucesso.",
    })
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixa */}
      <aside className="hidden w-64 flex-col bg-card border-r border-border lg:flex fixed h-full">
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
          <SidebarItem href="/perfil" icon={<Users className="h-4 w-4" />} label={t("profile")} pathname={pathname} />
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Header topo */}
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
            <h2 className="text-lg font-medium">Perfil</h2>
          </div>
          <ThemeToggle />
        </header>

        {/* Página */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Info Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="crn">CRN</Label>
                  <Input id="crn" value={formData.crn} onChange={(e) => setFormData({ ...formData, crn: e.target.value })} />
                </div>
                <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Save className="mr-2 h-4 w-4" /> Salvar alterações
                </Button>
              </CardContent>
            </Card>

            {/* Logout */}
            <Card>
              <CardHeader>
                <CardTitle>Sair da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-fit px-4">
                      <LogOut className="mr-2 h-4 w-4" /> Sair
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
                      <AlertDialogDescription>Você será desconectado da sua conta atual.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => signOut({ callbackUrl: "/" })} className="bg-red-600 hover:bg-red-700 text-white">
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
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

