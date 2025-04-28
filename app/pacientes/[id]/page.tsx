"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { ArrowLeft, Camera, FileText, Home, LineChart, Menu, Upload, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { arrayUnion } from "firebase/firestore";
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/components/ui/use-toast"
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
import { useParams } from "next/navigation"

export default function PatientDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useLanguage()
  const { toast } = useToast()

  const [selectedPDF, setSelectedPDF] = useState<File | null>(null)
  const [patient, setPatient] = useState<any | null>(null)
  const [isActive, setIsActive] = useState(true)

  const [dataNovaMetrica, setDataNovaMetrica] = useState("")
  const [pesoNovo, setPesoNovo] = useState("")
  const [gorduraNova, setGorduraNova] = useState("")
  const [massaMagraNova, setMassaMagraNova] = useState("")
  const [cinturaNova, setCinturaNova] = useState("")
  const [quadrilNovo, setQuadrilNovo] = useState("")
  const [toraxNovo, setToraxNovo] = useState("")
  const [bracoNovo, setBracoNovo] = useState("")

  const [editInfoOpen, setEditInfoOpen] = useState(false)
  const [editMetricsOpen, setEditMetricsOpen] = useState(false)

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    telefone: "",
    birthdate: "",
    valorConsulta: "",
  })

  const [editMetrics, setEditMetrics] = useState({
    peso: 0,
    altura: 0,
    gordura: 0,
    massaMagra: 0,
    cintura: 0,
  })

  const uploadPDF = async (file: File, patientId: string) => {
    if (!file) return null;
    const storageRef = ref(storage, `pacientes/${patientId}/dietas/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
  const handleUploadPDF = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session?.user?.email) {
      toast({ title: "Erro de autenticação", description: "Usuário não autenticado. Tente novamente." });
      return;
    }
    const file = selectedPDF;
    if (!file) {
      toast({ title: "Nenhum arquivo selecionado", description: "Por favor, selecione um arquivo PDF." });
      return;
    }
    try {
      const downloadURL = await uploadPDF(file, id);
      toast({ title: "Upload concluído", description: "O arquivo foi enviado com sucesso." });
      const ref = doc(db, "nutricionistas", session.user.email, "pacientes", id);
      await updateDoc(ref, {
        dietas: arrayUnion({ nome: file.name, url: downloadURL }),
      });
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      toast({ title: "Erro ao fazer upload", description: "Não foi possível enviar o arquivo." });
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      if (!session?.user?.email) return
      const ref = doc(db, "nutricionistas", session.user.email, "pacientes", id)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        setPatient({
          ...data,
          historicoMetricas: data.historicoMetricas || [],
        });
        setIsActive(data.status === "Ativo")
        setEditData({
          name: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
          birthdate: data.birthdate || "",
          valorConsulta: data.valorConsulta || "",
        })
        setEditMetrics({
          peso: data.peso_atual || 0,
          altura: data.altura || 0,
          gordura: data.gordura || 0,
          massaMagra: data.massa_magra || 0,
          cintura: data.cintura || 0,
        })
      } else {
        setPatient(null)
      }
    }
    fetchPatient()
  }, [id, session])

  const handleSaveInfo = async () => {
    if (!session?.user?.email) return
    const ref = doc(db, "nutricionistas", session.user.email, "pacientes", id)
    await updateDoc(ref, {
      nome: editData.name,
      email: editData.email,
      telefone: editData.telefone,
      birthdate: editData.birthdate,
      valorConsulta: editData.valorConsulta,
    })
    setPatient((prev: any) => ({ ...prev, ...editData }))
    toast({ title: "Informações atualizadas com sucesso" })
    setEditInfoOpen(false)
  }

  const handleSaveMetrics = async () => {
    if (!session?.user?.email) return
    const ref = doc(db, "nutricionistas", session.user.email, "pacientes", id)
    await updateDoc(ref, {
      peso_atual: editMetrics.peso,
      altura: editMetrics.altura,
      gordura: editMetrics.gordura,
      massa_magra: editMetrics.massaMagra,
      cintura: editMetrics.cintura,
    })
    setPatient((prev: any) => ({ ...prev, ...editMetrics }))
    toast({ title: "Métricas atualizadas com sucesso" })
    setEditMetricsOpen(false)
  }
  const handleDeletePatient = async () => {
    if (!session?.user?.email) return
    const ref = doc(db, "nutricionistas", session.user.email, "pacientes", id)
    await updateDoc(ref, { status: "Inativo" })
    toast({
      title: "Paciente excluído",
      description: "O paciente foi removido do painel.",
    })
    router.push("/pacientes")
  }

  const togglePatientStatus = async () => {
    if (!session?.user?.email) return
    const novoStatus = isActive ? "Inativo" : "Ativo"
    const ref = doc(db, "nutricionistas", session.user.email, "pacientes", id)
    await updateDoc(ref, { status: novoStatus })
    setIsActive(!isActive)
    toast({
      title: `Paciente ${novoStatus === "Ativo" ? "ativado" : "inativado"}`,
    })
  }

  const salvarNovaMetrica = async () => {
    if (!session?.user?.email || !patient) return;

    const novaMetrica = {
      data: dataNovaMetrica,
      peso: Number(pesoNovo),
      gordura: Number(gorduraNova),
      massaMagra: Number(massaMagraNova),
      cintura: Number(cinturaNova),
    };

    const refPaciente = doc(db, "nutricionistas", session.user.email, "pacientes", id);
    const historicoAtualizado = [...(patient.historicoMetricas || []), novaMetrica];

    await updateDoc(refPaciente, {
      historicoMetricas: historicoAtualizado,
    });

    setPatient((prev: any) => ({
      ...prev,
      historicoMetricas: historicoAtualizado,
    }));

    setDataNovaMetrica("");
    setPesoNovo("");
    setGorduraNova("");
    setMassaMagraNova("");
    setCinturaNova("");

    toast({ title: "Nova métrica adicionada com sucesso" });
  };

  const excluirMetrica = async (data: string) => {
    if (!session?.user?.email || !patient) return;

    const historicoAtualizado = (patient.historicoMetricas || []).filter(
      (metrica: any) => metrica.data !== data
    );

    const refPaciente = doc(db, "nutricionistas", session.user.email, "pacientes", id);

    await updateDoc(refPaciente, {
      historicoMetricas: historicoAtualizado,
    });

    setPatient((prev: any) => ({
      ...prev,
      historicoMetricas: historicoAtualizado,
    }));

    toast({ title: "Métrica excluída com sucesso" });
  };

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
          <SidebarItem href="/videos" icon={<Video className="h-4 w-4" />} label={t("videos")} pathname={pathname} />
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
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/pacientes">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight">{patient?.nome}</h1>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Switch
              id="patient-status"
              checked={isActive}
              onCheckedChange={togglePatientStatus}
            />
            <Label htmlFor="patient-status">
              {isActive ? "Paciente Ativo" : "Paciente Inativo"}
            </Label>
          </div>

          {/* Informações Pessoais */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Informações Pessoais</CardTitle>
              </div>
              <Button
                onClick={() => setEditInfoOpen(true)}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Editar
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{patient?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                <p>{patient?.telefone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
                <p>{patient?.birthdate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor da Consulta</p>
                <p>R$ {patient?.valorConsulta || "Não informado"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Modal Editar Informações */}
          <Dialog open={editInfoOpen} onOpenChange={setEditInfoOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Informações Pessoais</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {Object.entries(editData).map(([field, value]) => (
                  <div key={field} className="grid gap-1">
                    <Label>{field}</Label>
                    <Input
                      value={value}
                      onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
              <DialogFooter className="mt-4">
                <Button
                  onClick={handleSaveInfo}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Métricas Atuais */}
          

          {/* Modal Editar Métricas */}
          <Dialog open={editMetricsOpen} onOpenChange={setEditMetricsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Métricas</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {Object.entries(editMetrics).map(([field, value]) => (
                  <div key={field} className="grid gap-1">
                    <Label>{field}</Label>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        setEditMetrics({ ...editMetrics, [field]: Number(e.target.value) })
                      }
                    />
                  </div>
                ))}
              </div>
              <DialogFooter className="mt-4">
                <Button
                  onClick={handleSaveMetrics}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Tabs Início */}
          <Tabs defaultValue="metricas" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
              <TabsTrigger value="metricas">Métricas</TabsTrigger>
              <TabsTrigger value="dietas">Dietas</TabsTrigger>
              <TabsTrigger value="fotos">Fotos</TabsTrigger>
            </TabsList>

            {/* Aba Métricas */}
            <TabsContent value="metricas" className="mt-4">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Histórico de Métricas</CardTitle>
                  <CardDescription>Veja o histórico de medições do paciente</CardDescription>
                </CardHeader>
                <CardContent>
                  {patient?.historicoMetricas?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Data</th>
                            <th className="p-2">Peso (kg)</th>
                            <th className="p-2">% Gordura</th>
                            <th className="p-2">% Massa Magra</th>
                            <th className="p-2">Cintura (cm)</th>
                            <th className="p-2 text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patient.historicoMetricas
                            .sort((a: any, b: any) => (a.data < b.data ? 1 : -1))
                            .map((item: any, index: number) => (
                              <tr key={index} className="border-b hover:bg-muted/50">
                                <td className="p-2">{item.data}</td>
                                <td className="p-2">{item.peso}</td>
                                <td className="p-2">{item.gordura}</td>
                                <td className="p-2">{item.massaMagra}</td>
                                <td className="p-2">{item.cintura}</td>
                                <td className="p-2 text-right">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => excluirMetrica(item.data)}
                                  >
                                    Excluir
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma métrica registrada ainda.</p>
                  )}
                </CardContent>
              </Card>
              {/* Formulário Nova Medição */}
              <Card>
                <CardHeader>
                  <CardTitle>Nova Medição</CardTitle>
                  <CardDescription>Preencha os campos para adicionar uma nova medição</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label>Data da Medição</Label>
                    <Input
                      type="date"
                      value={dataNovaMetrica}
                      onChange={(e) => setDataNovaMetrica(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="grid gap-2">
                      <Label>Peso (kg)</Label>
                      <Input
                        type="number"
                        placeholder="70.5"
                        value={pesoNovo}
                        onChange={(e) => setPesoNovo(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Percentual de Gordura (%)</Label>
                      <Input
                        type="number"
                        placeholder="22.5"
                        value={gorduraNova}
                        onChange={(e) => setGorduraNova(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Percentual de Massa Magra (%)</Label>
                      <Input
                        type="number"
                        placeholder="77.5"
                        value={massaMagraNova}
                        onChange={(e) => setMassaMagraNova(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Cintura (cm)</Label>
                      <Input
                        type="number"
                        placeholder="82"
                        value={cinturaNova}
                        onChange={(e) => setCinturaNova(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={salvarNovaMetrica}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Salvar Medição
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Dietas */}
            <TabsContent value="dietas" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Enviar Nova Dieta</CardTitle>
                  <CardDescription>Faça upload de dietas em PDF para o paciente</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUploadPDF}>
                    <div className="flex flex-col gap-4">
                      <div className="grid gap-2">
                        <Label>Nome da Dieta</Label>
                        <Input placeholder="Ex: Dieta de Emagrecimento - Maio 2025" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Data</Label>
                        <Input type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Arquivo PDF</Label>
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
                              <p className="text-xs text-muted-foreground">PDF (Máx 10MB)</p>
                            </div>
                            <input
                              id="pdf-upload"
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setSelectedPDF(file);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      {selectedPDF && (
                        <p className="text-sm text-green-600">{selectedPDF.name}</p>
                      )}
                      <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        Enviar Dieta
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Aba Fotos */}
            <TabsContent value="fotos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Enviar Novas Fotos</CardTitle>
                  <CardDescription>Faça upload de fotos para acompanhamento visual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="grid w-full gap-2">
                      <Label>Data</Label>
                      <Input type="date" />
                    </div>
                    <div className="grid w-full gap-2">
                      <Label>Descrição</Label>
                      <Input placeholder="Ex: Frente, Lateral, Costas" />
                    </div>
                    <div className="grid w-full gap-2">
                      <Label>Foto</Label>
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
                            <p className="text-xs text-muted-foreground">JPG, PNG (Máx 5MB)</p>
                          </div>
                          <input id="photo-upload" type="file" accept="image/*" className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Botão Excluir Paciente */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-6">
                Excluir Paciente
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não poderá ser desfeita. O paciente será removido do seu painel.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeletePatient}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Confirmar Exclusão
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  pathname,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
}) {
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
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
  );
}

function DollarIcon() {
  return (
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
  );
}
