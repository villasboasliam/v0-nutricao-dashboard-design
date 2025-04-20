"use client"
import { ArrowLeft, Camera, FileText, Home, LineChart, Menu, Upload, Users, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"

// Importe o toast
import { useToast } from "@/components/ui/use-toast"

// Adicione imports para os componentes necessários
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"

// Dados fictícios de pacientes
const patients = {
  "1": {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 98765-4321",
    birthdate: "15/05/1985",
    address: "Rua das Flores, 123 - São Paulo, SP",
    lastVisit: "15/04/2023",
    status: "Ativo",
    metrics: [
      {
        date: "15/04/2023",
        weight: "68.5",
        height: "165",
        imc: "25.2",
        bodyFat: "24.8",
        leanMass: "75.2",
        waist: "82",
        hip: "98",
        chest: "95",
        arm: "32",
      },
      {
        date: "15/03/2023",
        weight: "70.2",
        height: "165",
        imc: "25.8",
        bodyFat: "25.5",
        leanMass: "74.5",
        waist: "84",
        hip: "99",
        chest: "96",
        arm: "32",
      },
      {
        date: "15/02/2023",
        weight: "71.5",
        height: "165",
        imc: "26.3",
        bodyFat: "26.2",
        leanMass: "73.8",
        waist: "85",
        hip: "100",
        chest: "97",
        arm: "31",
      },
      {
        date: "15/01/2023",
        weight: "72.8",
        height: "165",
        imc: "26.7",
        bodyFat: "27.0",
        leanMass: "73.0",
        waist: "86",
        hip: "101",
        chest: "98",
        arm: "31",
      },
    ],
    diets: [
      {
        id: "d1",
        name: "Dieta de Emagrecimento - Abril",
        date: "15/04/2023",
        file: "dieta_maria_abril.pdf",
      },
      {
        id: "d2",
        name: "Dieta de Manutenção - Março",
        date: "15/03/2023",
        file: "dieta_maria_marco.pdf",
      },
    ],
    photos: [
      {
        id: "p1",
        date: "15/04/2023",
        description: "Frente",
        url: "/placeholder.svg?height=300&width=200",
      },
      {
        id: "p2",
        date: "15/04/2023",
        description: "Lateral",
        url: "/placeholder.svg?height=300&width=200",
      },
    ],
  },
  "2": {
    id: "2",
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "(11) 91234-5678",
    birthdate: "22/08/1990",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    lastVisit: "22/04/2023",
    status: "Ativo",
    metrics: [
      {
        date: "22/04/2023",
        weight: "82.3",
        height: "178",
        imc: "26.0",
        bodyFat: "18.5",
        leanMass: "81.5",
        waist: "88",
        hip: "102",
        chest: "105",
        arm: "38",
      },
      {
        date: "22/03/2023",
        weight: "83.5",
        height: "178",
        imc: "26.3",
        bodyFat: "19.2",
        leanMass: "80.8",
        waist: "89",
        hip: "103",
        chest: "106",
        arm: "37",
      },
      {
        date: "22/02/2023",
        weight: "84.8",
        height: "178",
        imc: "26.8",
        bodyFat: "20.0",
        leanMass: "80.0",
        waist: "90",
        hip: "104",
        chest: "107",
        arm: "37",
      },
    ],
    diets: [
      {
        id: "d3",
        name: "Dieta Hipertrófica - Abril",
        date: "22/04/2023",
        file: "dieta_joao_abril.pdf",
      },
    ],
    photos: [],
  },
}

// Dentro da função PatientDetailPage, adicione:
export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patientId = params.id
  const [patient, setPatient] = useState(patients[patientId as keyof typeof patients])
  const pathname = usePathname()
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()

  // Estado para controlar o status do paciente
  const [isActive, setIsActive] = useState(patient?.status === "Ativo")

  // Função para alternar o status do paciente
  const togglePatientStatus = () => {
    setIsActive(!isActive)

    // Atualiza o status do paciente
    if (patient) {
      const updatedPatient = {
        ...patient,
        status: !isActive ? "Ativo" : "Inativo",
      }
      setPatient(updatedPatient)

      toast({
        title: `Paciente ${!isActive ? "ativado" : "inativado"} com sucesso!`,
        description: `O paciente foi ${!isActive ? "ativado" : "inativado"}.`,
        variant: "default",
      })
    }
  }

  // Função para excluir paciente
  const handleDeletePatient = () => {
    // Em um cenário real, faríamos uma chamada à API para excluir o paciente
    // Simulação de exclusão de paciente
    toast({
      title: "Paciente removido com sucesso!",
      description: "O paciente foi excluído permanentemente.",
      variant: "default",
    })

    // Redireciona para a lista de pacientes após a exclusão
    setTimeout(() => {
      router.push("/pacientes")
    }, 1500)
  }

  // Função para lidar com o envio de dieta
  const handleSendDiet = () => {
    // Simulação de envio de dieta
    toast({
      title: "Dieta enviada com sucesso!",
      description: "A dieta foi enviada para o paciente.",
      variant: "default",
    })
  }

  // Função para lidar com o envio de foto
  const handleSendPhoto = () => {
    // Simulação de envio de foto
    toast({
      title: "Foto enviada com sucesso!",
      description: "A foto foi adicionada ao histórico do paciente.",
      variant: "default",
    })
  }

  // Resto do código...

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold">Paciente não encontrado</h1>
        <Button asChild className="mt-4">
          <Link href="/pacientes">Voltar para lista de pacientes</Link>
        </Button>
      </div>
    )
  }

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
            <div className="flex items-center">
              <h2 className="text-lg font-medium">Detalhes do Paciente</h2>
            </div>
          </div>

          <ThemeToggle />
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/pacientes">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Voltar</span>
                </Link>
              </Button>
              <h1 className="text-2xl font-semibold tracking-tight">{patient.name}</h1>
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

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{patient.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                        <p>{patient.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
                      <p>{patient.birthdate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                      <p>{patient.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Última Consulta</p>
                      <p>{patient.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Valor da Consulta</p>
                      <p>R$ 250,00</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Editar valor
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Após o card de informações pessoais, adicione: */}
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Switch id="patient-status" checked={isActive} onCheckedChange={togglePatientStatus} />
                  <Label htmlFor="patient-status">{isActive ? "Paciente Ativo" : "Paciente Inativo"}</Label>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Excluir Paciente</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o paciente e todos os seus dados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeletePatient} className="bg-red-600 hover:bg-red-700">
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas Atuais</CardTitle>
                  <CardDescription>Última atualização: {patient.metrics[0]?.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Peso</p>
                      <p>{patient.metrics[0]?.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Altura</p>
                      <p>{patient.metrics[0]?.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">IMC</p>
                      <p>{patient.metrics[0]?.imc}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">% Gordura</p>
                      <p>{patient.metrics[0]?.bodyFat}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">% Massa Magra</p>
                      <p>{patient.metrics[0]?.leanMass}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cintura</p>
                      <p>{patient.metrics[0]?.waist} cm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="metricas" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="metricas">Métricas</TabsTrigger>
                <TabsTrigger value="dietas">Dietas</TabsTrigger>
                <TabsTrigger value="fotos">Fotos</TabsTrigger>
              </TabsList>

              {/* Aba de Métricas */}
              <TabsContent value="metricas" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Atualizar Métricas</CardTitle>
                    <CardDescription>Registre as novas medidas do paciente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="grid w-full gap-2">
                        <Label htmlFor="metric-date">Data da Medição</Label>
                        <Input id="metric-date" type="date" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="grid w-full gap-2">
                          <Label htmlFor="weight">Peso (kg)</Label>
                          <Input id="weight" type="number" placeholder="70.5" />
                        </div>
                        <div className="grid w-full gap-2">
                          <Label htmlFor="body-fat">Percentual de Gordura (%)</Label>
                          <Input id="body-fat" type="number" placeholder="22.5" />
                        </div>
                        <div className="grid w-full gap-2">
                          <Label htmlFor="lean-mass">Percentual de Massa Magra (%)</Label>
                          <Input id="lean-mass" type="number" placeholder="77.5" />
                        </div>
                        <div className="grid w-full gap-2">
                          <Label htmlFor="imc">IMC</Label>
                          <Input id="imc" type="number" placeholder="24.8" />
                        </div>
                      </div>

                      <Separator className="my-2" />

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="grid w-full gap-2">
                          <Label htmlFor="waist">Cintura (cm)</Label>
                          <Input id="waist" type="number" placeholder="82" />
                        </div>
                        <div className="grid w-full gap-2">
                          <Label htmlFor="hip">Quadril (cm)</Label>
                          <Input id="hip" type="number" placeholder="98" />
                        </div>
                        <div className="grid w-full gap-2">
                          <Label htmlFor="chest">Tórax (cm)</Label>
                          <Input id="chest" type="number" placeholder="95" />
                        </div>
                        <div className="grid w-full gap-2">
                          <Label htmlFor="arm">Braço (cm)</Label>
                          <Input id="arm" type="number" placeholder="32" />
                        </div>
                      </div>

                      <Button className="w-full md:w-auto mt-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                        Salvar Medidas
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Histórico de Métricas</CardTitle>
                    <CardDescription>Evolução das medidas ao longo do tempo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Data</th>
                            <th className="text-left p-2">Peso</th>
                            <th className="text-left p-2">IMC</th>
                            <th className="text-left p-2">% Gordura</th>
                            <th className="text-left p-2">% Massa Magra</th>
                            <th className="text-left p-2">Cintura</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patient.metrics.map((metric, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{metric.date}</td>
                              <td className="p-2">{metric.weight} kg</td>
                              <td className="p-2">{metric.imc}</td>
                              <td className="p-2">{metric.bodyFat}%</td>
                              <td className="p-2">{metric.leanMass}%</td>
                              <td className="p-2">{metric.waist} cm</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 space-y-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-4">Evolução do Peso (kg)</h3>
                        <div className="h-[180px]">
                          <WeightChart metrics={patient.metrics} />
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-4">Percentual de Gordura (%)</h3>
                        <div className="h-[180px]">
                          <MinimalLineChart
                            data={patient.metrics.map((m) => Number(m.bodyFat))}
                            labels={patient.metrics.map((m) => m.date)}
                            color="#6366f1"
                          />
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-4">Percentual de Massa Magra (%)</h3>
                        <div className="h-[180px]">
                          <MinimalLineChart
                            data={patient.metrics.map((m) => Number(m.leanMass))}
                            labels={patient.metrics.map((m) => m.date)}
                            color="#10b981"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Dietas */}
              <TabsContent value="dietas" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Enviar Nova Dieta</CardTitle>
                    <CardDescription>Faça upload de dietas em PDF para o paciente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="grid w-full gap-2">
                        <Label htmlFor="diet-name">Nome da Dieta</Label>
                        <Input id="diet-name" placeholder="Ex: Dieta de Emagrecimento - Maio 2023" />
                      </div>
                      <div className="grid w-full gap-2">
                        <Label htmlFor="diet-date">Data</Label>
                        <Input id="diet-date" type="date" />
                      </div>
                      <div className="grid w-full gap-2">
                        <Label htmlFor="pdf-upload">Arquivo PDF</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="pdf-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 dark:border-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                Clique para fazer upload ou arraste o arquivo
                              </p>
                              <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
                            </div>
                            <input id="pdf-upload" type="file" accept=".pdf" className="hidden" />
                          </label>
                        </div>
                      </div>
                      {/* Modifique o botão de enviar dieta: */}
                      <Button
                        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={handleSendDiet}
                      >
                        Enviar Dieta
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Histórico de Dietas</CardTitle>
                    <CardDescription>Dietas enviadas anteriormente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {patient.diets.map((diet) => (
                        <div key={diet.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                            </div>
                            <div>
                              <p className="font-medium">{diet.name}</p>
                              <p className="text-sm text-muted-foreground">Enviado em: {diet.date}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Baixar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Fotos */}
              <TabsContent value="fotos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Enviar Novas Fotos</CardTitle>
                    <CardDescription>Faça upload de fotos para acompanhamento visual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="grid w-full gap-2">
                        <Label htmlFor="photo-date">Data</Label>
                        <Input id="photo-date" type="date" />
                      </div>
                      <div className="grid w-full gap-2">
                        <Label htmlFor="photo-description">Descrição</Label>
                        <Input id="photo-description" placeholder="Ex: Frente, Lateral, Costas" />
                      </div>
                      <div className="grid w-full gap-2">
                        <Label htmlFor="photo-upload">Foto</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="photo-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 dark:border-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Camera className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                Clique para fazer upload ou arraste a imagem
                              </p>
                              <p className="text-xs text-muted-foreground">JPG, PNG (MAX. 5MB)</p>
                            </div>
                            <input id="photo-upload" type="file" accept="image/*" className="hidden" />
                          </label>
                        </div>
                      </div>
                      {/* Modifique o botão de enviar foto: */}
                      <Button
                        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={handleSendPhoto}
                      >
                        Enviar Foto
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Galeria de Fotos</CardTitle>
                    <CardDescription>Histórico de fotos do paciente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {patient.photos.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {patient.photos.map((photo) => (
                          <div key={photo.id} className="flex flex-col">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border">
                              <Image
                                src={photo.url || "/placeholder.svg"}
                                alt={photo.description}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="mt-2">
                              <p className="font-medium">{photo.description}</p>
                              <p className="text-sm text-muted-foreground">{photo.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <Camera className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Nenhuma foto disponível</p>
                      </div>
                    )}
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

// Atualize o componente WeightChart para usar a mesma lógica
function WeightChart({ metrics }: { metrics: any[] }) {
  // Inverte o array para mostrar a evolução cronológica (mais antigo para mais recente)
  const sortedMetrics = [...metrics].reverse()
  const weights = sortedMetrics.map((metric) => Number.parseFloat(metric.weight))
  const dates = sortedMetrics.map((metric) => metric.date)
  const maxWeight = Math.max(...weights)
  const minWeight = Math.min(...weights) * 0.9 // Usamos 90% do valor mínimo como base
  const yAxisMax = maxWeight + (maxWeight - minWeight) * 0.2 // Topo é 20% acima da diferença

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 items-end gap-2">
        {weights.map((weight, i) => (
          <div key={i} className="relative flex w-full flex-col items-center">
            <div className="absolute -top-6 text-xs font-medium">{weight}</div>
            <div
              className="w-full rounded-t-sm bg-indigo-500 shadow-md dark:bg-indigo-600"
              style={{
                height: `${((weight - minWeight) / (yAxisMax - minWeight)) * 100}%`,
                minHeight: "20px",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex h-6 items-center justify-between mt-2">
        {dates.map((date, i) => (
          <div key={i} className="text-xs font-medium">
            {date.split("/").slice(0, 2).join("/")}
          </div>
        ))}
      </div>
    </div>
  )
}

// Atualize também o componente MinimalLineChart para usar a mesma lógica
function MinimalLineChart({
  data,
  labels,
  color,
}: {
  data: number[]
  labels: string[]
  color: string
}) {
  // Inverte os arrays para mostrar a evolução cronológica (mais antigo para mais recente)
  const reversedData = [...data].reverse()
  const reversedLabels = [...labels].reverse()

  // Calcula os valores mínimos e máximos para o eixo Y
  const maxValue = Math.max(...reversedData)
  const minValue = Math.min(...reversedData) * 0.9 // Usamos 90% do valor mínimo como base
  const yAxisMax = maxValue + (maxValue - minValue) * 0.2 // Topo é 20% acima da diferença
  const range = yAxisMax - minValue

  // Calcula os pontos para o gráfico de linha
  const points = reversedData.map((value, index) => {
    const x = (index / (reversedData.length - 1)) * 100
    const y = 100 - ((value - minValue) / range) * 85 // Usamos 85% da altura para deixar espaço para os rótulos
    return [x, y]
  })

  // Cria o path para a linha
  const linePath = points.map((point, i) => (i === 0 ? "M" : "L") + point[0] + "," + point[1]).join(" ")

  return (
    <div className="relative h-full w-full">
      {/* Área do gráfico */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Linha de base (eixo X) */}
          <line x1="0" y1="95" x2="100" y2="95" stroke="#e5e7eb" strokeWidth="1" />

          {/* Linha do gráfico */}
          <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Pontos no gráfico */}
          {points.map((point, index) => (
            <g key={index}>
              <circle cx={point[0]} cy={point[1]} r="3" fill={color} />
            </g>
          ))}

          {/* Valores nos pontos */}
          {points.map((point, index) => (
            <text
              key={index}
              x={point[0]}
              y={point[1] - 8}
              fontSize="8"
              textAnchor="middle"
              fill={color}
              fontWeight="bold"
            >
              {reversedData[index]}
            </text>
          ))}
        </svg>
      </div>

      {/* Eixo X - Datas */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
        {reversedLabels.map((date, index) => (
          <span key={index}>{date.split("/").slice(0, 2).join("/")}</span>
        ))}
      </div>
    </div>
  )
}
