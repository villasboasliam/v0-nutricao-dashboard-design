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



export default function PerfilPage() {
    const pathname = usePathname()
    const { t } = useLanguage()
    const { theme } = useTheme()
    const { data: session } = useSession()
    const router = useRouter()
    const { toast } = useToast()


    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        crn: "",
        valorConsultaPadrao: "",
        dataNascimento: "",
        cep: "",
        endereco: "",
        cidade: "",
        estado: ""
    })
    const [saveButtonText, setSaveButtonText] = useState("Salvar alterações")
    const [isSaving, setIsSaving] = useState(false)


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
                    valorConsultaPadrao: data.valorConsultaPadrao || "",
                    dataNascimento: data.dataNascimento || "",
                    cep: data.cep || "",
                    endereco: data.endereco || "",
                    cidade: data.cidade || "",
                    estado: data.estado || ""
                })
            }
        }
        fetchUserData()
    }, [session])


    const buscarEndereco = async (cep: string) => {
        if (!cep || cep.length !== 8) {
            toast({
                title: "Atenção",
                description: "Por favor, insira um CEP válido com 8 dígitos.",
            })
            return
        }


        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await response.json()


            if (data.erro) {
                toast({
                    title: "Erro",
                    description: "Não foi possível encontrar o endereço para este CEP.",
                })
                return
            }


            setFormData({
                ...formData,
                endereco: data.logradouro,
                cidade: data.localidade,
                estado: data.uf,
            })
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao buscar o endereço.",
            })
            console.error("Erro ao buscar CEP:", error)
        }
    }


    const handleSave = async () => {
        if (!session?.user?.email) return
        setIsSaving(true)
        setSaveButtonText("Salvando...")
        const ref = doc(db, "nutricionistas", session.user.email)
        await updateDoc(ref, {
            nome: formData.nome,
            telefone: formData.telefone,
            crn: formData.crn,
            valorConsultaPadrao: formData.valorConsultaPadrao,
            dataNascimento: formData.dataNascimento,
            cep: formData.cep,
            endereco: formData.endereco,
            cidade: formData.cidade,
            estado: formData.estado
        })
        toast({
            title: "Sucesso",
            description: "Dados salvos com sucesso."
        })
        setIsSaving(false)
        setSaveButtonText("Salvo!")
        setTimeout(() => {
            setSaveButtonText("Salvar alterações")
        }, 2000)
    }


    return (
        <div className="flex min-h-screen">
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
                    <SidebarItem href="/financeiro" icon={<LineChart className="h-4 w-4" />} label="Financeiro" pathname={pathname} />
                    <SidebarItem href="/perfil" icon={<Users className="h-4 w-4" />} label={t("profile")} pathname={pathname} />
                </nav>
            </aside>


            <div className="flex flex-col flex-1 lg:ml-64">
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
                            <nav className="flex-1 space-y-1 p-2">
                                <SidebarItem href="/" icon={<Home className="h-4 w-4" />} label={t("dashboard")} pathname={pathname} />
                                <SidebarItem href="/pacientes" icon={<Users className="h-4 w-4" />} label={t("patients")} pathname={pathname} />
                                <SidebarItem href="/materiais" icon={<FileText className="h-4 w-4" />} label="Materiais" pathname={pathname} />
    
                                <SidebarItem href="/financeiro" icon={<LineChart className="h-4 w-4" />} label="Financeiro" pathname={pathname} />
                                <SidebarItem href="/perfil" icon={<Users className="h-4 w-4" />} label={t("profile")} pathname={pathname} />
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <h2 className="text-lg font-medium">Perfil</h2>
                    </div>
                    <ThemeToggle />
                </header>


                <main className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações Pessoais</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nome">Nome completo</Label>
                                        <Input id="nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" value={formData.email} disabled />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="telefone">Telefone</Label>
                                        <Input id="telefone" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                                        <Input
                                            id="dataNascimento"
                                            type="date"
                                            value={formData.dataNascimento}
                                            onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="crn">CRN</Label>
                                        <Input id="crn" value={formData.crn} onChange={(e) => setFormData({ ...formData, crn: e.target.value })} />
                                    </div>
                                </CardContent>
                            </Card>


                            <Card>
                                <CardHeader>
                                    <CardTitle>Endereço</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="cep">CEP</Label>
                                        <Input
                                            id="cep"
                                            value={formData.cep}
                                            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                                            onBlur={(e) => buscarEndereco(e.target.value.replace(/\D/g, ""))}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="endereco">Endereço</Label>
                                        <Input id="endereco" value={formData.endereco} onChange={(e) => setFormData({ ...formData, endereco: e.target.value })} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input id="cidade" value={formData.cidade} onChange={(e) => setFormData({ ...formData, cidade: e.target.value })} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="estado">Estado</Label>
                                        <Input id="estado" value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })} />
                                    </div>
                                </CardContent>
                            </Card>


                            <Card>
                                <CardHeader>
                                    <CardTitle>Configurações</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="valorConsulta">Valor Consulta Padrão (R$)</Label>
                                        <Input
                                            id="valorConsulta"
                                            type="number"
                                            value={formData.valorConsultaPadrao}
                                            onChange={(e) => setFormData({ ...formData, valorConsultaPadrao: e.target.value })}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>


                        {/* Botões de ação */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSaving}>
                                <Save className="mr-2 h-4 w-4" /> {saveButtonText}
                            </Button>
                            <Button onClick={() => signOut({ callbackUrl: "/" })} variant="destructive">
                                <LogOut className="mr-2 h-4 w-4" /> {t("logout")}
                            </Button>
                        </div>
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