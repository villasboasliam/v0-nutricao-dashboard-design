"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"

import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Card } from "@/components/ui/card"
import { Home, Users, FileText, Video, LineChart, Menu } from "lucide-react"

export default function NovoPacientePage() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [senha, setSenha] = useState("")

  const [nutricionistaId, setNutricionistaId] = useState("")

  useEffect(() => {
    const fetchNutriId = async () => {
      if (!session?.user?.email) return
      const q = query(collection(db, "nutricionistas"), where("email", "==", session.user.email))
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        setNutricionistaId(snapshot.docs[0].id)
      }
    }
    fetchNutriId()
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nutricionistaId) return
    const ref = collection(db, "nutricionistas", nutricionistaId, "pacientes")
    await addDoc(ref, {
      nome,
      email,
      telefone,
      senha_provisoria: senha,
      status: "Ativo",
      data_criacao: new Date(),
    })
    router.push("/pacientes")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <aside className="hidden w-64 flex-col bg-card border-r border-border lg:flex fixed h-full">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
            <LineChart className="h-5 w-5" />
            <span>NutriDash</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          <Link href="/" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname === "/" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300" : "text-foreground hover:bg-muted"}`}>
            <Home className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/pacientes" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname?.startsWith("/pacientes") ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300" : "text-foreground hover:bg-muted"}`}>
            <Users className="h-4 w-4" /> Pacientes
          </Link>
          <Link href="/materiais" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname === "/materiais" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300" : "text-foreground hover:bg-muted"}`}>
            <FileText className="h-4 w-4" /> Materiais
          </Link>
          <Link href="/videos" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname === "/videos" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300" : "text-foreground hover:bg-muted"}`}>
            <Video className="h-4 w-4" /> Vídeos
          </Link>
          <Link href="/financeiro" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname === "/financeiro" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300" : "text-foreground hover:bg-muted"}`}>
            <LineChart className="h-4 w-4" /> Financeiro
          </Link>
          <Link href="/perfil" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname === "/perfil" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300" : "text-foreground hover:bg-muted"}`}>
            <Users className="h-4 w-4" /> Perfil
          </Link>
        </nav>
      </aside>

      <div className="lg:ml-64 flex-1 flex flex-col">
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
          <h1 className="text-lg font-semibold">Cadastrar Paciente</h1>
          <div className="flex-1" />
          <ThemeToggle />
        </header>

        <main className="flex-1 p-6">
          <Card className="max-w-xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="senha">Senha Provisória</Label>
                <Input id="senha" type="text" value={senha} onChange={(e) => setSenha(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Cadastrar Paciente
              </Button>
            </form>
          </Card>
        </main>
      </div>
    </div>
  )
}


