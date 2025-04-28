"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar, FileText, Home, LineChart, Menu, Plus, Users, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function FinanceiroPage() {
  const pathname = usePathname();
  const [valorConsultaPadrao, setValorConsultaPadrao] = useState<number>(250);
  const [consultas, setConsultas] = useState<any[]>([]);
  const [novaConsultaModalAberto, setNovaConsultaModalAberto] = useState(false);
  const [dataConsulta, setDataConsulta] = useState("");
  const [horario, setHorario] = useState("");
  const [duracao, setDuracao] = useState("30");
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [idNutricionista, setIdNutricionista] = useState<string | null>(null);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");

  useEffect(() => {
    async function fetchData() {
      const userEmail = "villasboasliam@gmail.com"; // <-- Seu email correto aqui.
  
      const nutricionistaSnap = await getDocs(collection(db, "nutricionistas"));
      const nutricionista = nutricionistaSnap.docs.find(doc => doc.data().email === userEmail);
  
      if (nutricionista) {
        const id = nutricionista.id;
        setIdNutricionista(id);
        
        // Primeiro carrega pacientes
        await carregarPacientes(id);
  
        // Depois carrega consultas
        await carregarConsultas(id);
      }
    }
    fetchData();
  }, []);
  

  
  async function carregarPacientes(idNutricionista: string) {
    const pacientesRef = collection(db, "nutricionistas", idNutricionista, "pacientes");
    const snapshot = await getDocs(pacientesRef);
    const listaPacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPacientes(listaPacientes);
  }
  

  async function carregarConsultas(idNutricionista: string) {
    const consultasRef = collection(db, "nutricionistas", idNutricionista, "consultas");
    const snapshot = await getDocs(consultasRef);
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setConsultas(list);
  }
  
  
  
  async function criarConsulta() {
    if (!pacienteSelecionado || !dataConsulta || !horario || !idNutricionista) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
  
    await addDoc(collection(db, "nutricionistas", idNutricionista, "consultas"), {
      paciente: pacienteSelecionado,
      data: dataConsulta,
      horario,
      duracao,
      valor: valorConsultaPadrao,
      status: "Agendada",
    });
  
    setPacienteSelecionado("");
    setDataConsulta("");
    setHorario("");
    setDuracao("30");
    setNovaConsultaModalAberto(false);
    await carregarConsultas(idNutricionista);
  }
  
  
  async function excluirConsulta(id: string) {
    await deleteDoc(doc(db, "consultas", id));
    await carregarConsultas(idNutricionista);
  }
  function calcularReceita(consultasFiltradas: any[]) {
    const total = consultasFiltradas.reduce((acc, consulta) => acc + (consulta.valor || 0), 0);
    return `R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  }

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const anos = [2023, 2024, 2025];

  function diasNoMes(mes: number, ano: number) {
    return new Date(ano, mes + 1, 0).getDate();
  }

  function primeiroDiaDoMes(mes: number, ano: number) {
    return new Date(ano, mes, 1).getDay();
  }

  function consultasDoMesSelecionado() {
    return consultas.filter((consulta) => {
      const data = new Date(consulta.data);
      return (
        data.getMonth() === mesSelecionado &&
        data.getFullYear() === anoSelecionado
      );
    });
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col bg-card border-r border-border lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
            <LineChart className="h-5 w-5" />
            <span>NutriDash</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          <SidebarItem href="/" icon={<Home className="h-4 w-4" />} label="Dashboard" pathname={pathname} />
          <SidebarItem href="/pacientes" icon={<Users className="h-4 w-4" />} label="Pacientes" pathname={pathname} />
          <SidebarItem href="/materiais" icon={<FileText className="h-4 w-4" />} label="Materiais" pathname={pathname} />
          <SidebarItem href="/videos" icon={<Video className="h-4 w-4" />} label="Vídeos" pathname={pathname} />
          <SidebarItem href="/financeiro" icon={<LineChart className="h-4 w-4" />} label="Financeiro" pathname={pathname} />
          <SidebarItem href="/perfil" icon={<Users className="h-4 w-4" />} label="Perfil" pathname={pathname} />
        </nav>
      </aside>

      {/* Conteúdo Principal */}
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
            <h2 className="text-lg font-medium">Financeiro</h2>
          </div>

          <ThemeToggle />
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">Controle Financeiro</h1>
              <Button onClick={() => setNovaConsultaModalAberto(true)} className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Nova Consulta
              </Button>
            </div>

            {/* Cards de Receita e Consultas */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
                  <DollarIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{calcularReceita(consultasDoMesSelecionado())}</div>
                  <p className="text-xs text-muted-foreground">
                    {consultasDoMesSelecionado().length} consultas registradas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Valor Consulta Padrão</CardTitle>
                  <DollarIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {valorConsultaPadrao}</div>
                  <p className="text-xs text-muted-foreground">Valor aplicado aos novos agendamentos</p>
                </CardContent>
              </Card>
            </div>

            {/* Filtros de Mês e Ano */}
            <div className="flex items-center gap-4 mt-4">
              <Select value={mesSelecionado.toString()} onValueChange={(mes) => setMesSelecionado(Number(mes))}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map((mes, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {mes}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={anoSelecionado.toString()} onValueChange={(ano) => setAnoSelecionado(Number(ano))}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {anos.map((ano) => (
                    <SelectItem key={ano} value={ano.toString()}>
                      {ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Calendário de Consultas */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Agenda de Consultas</CardTitle>
                <CardDescription>Visualize suas consultas no calendário mensal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2">
                  {diasDaSemana.map((dia, index) => (
                    <div key={index}>{dia}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: primeiroDiaSemana(mesSelecionado, anoSelecionado) }, (_, i) => (
                    <div key={`empty-${i}`} className="border rounded-md h-28 p-1 bg-muted"></div>
                  ))}

                  {Array.from({ length: diasNoMes(mesSelecionado, anoSelecionado) }, (_, index) => {
                    const dia = index + 1;
                    const consultasDoDia = consultas.filter((consulta) => {
                      const data = new Date(consulta.data);
                      return (
                        data.getDate() === dia &&
                        data.getMonth() === mesSelecionado &&
                        data.getFullYear() === anoSelecionado
                      );
                    });

                    return (
                      <div key={dia} className="border rounded-md h-28 p-1 flex flex-col overflow-y-auto">
                        <div className="text-xs font-semibold">{dia}</div>
                        {consultasDoDia.map((consulta) => (
                          <div
                            key={consulta.id}
                            className="mt-1 text-xs bg-indigo-100 dark:bg-indigo-900 rounded p-1 text-indigo-600 dark:text-indigo-300 truncate"
                          >
                            {consulta.horario} - {consulta.paciente}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Lista de Consultas */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Consultas Agendadas</CardTitle>
                <CardDescription>Lista completa das suas consultas</CardDescription>
              </CardHeader>
              <CardContent>
                {consultas.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2">Paciente</th>
                          <th className="px-4 py-2">Data</th>
                          <th className="px-4 py-2">Horário</th>
                          <th className="px-4 py-2">Duração</th>
                          <th className="px-4 py-2">Valor (R$)</th>
                          <th className="px-4 py-2 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consultas.map((consulta) => (
                          <tr key={consulta.id} className="border-b hover:bg-muted/50">
                            <td className="px-4 py-2">{consulta.paciente}</td>
                            <td className="px-4 py-2">{consulta.data}</td>
                            <td className="px-4 py-2">{consulta.horario}</td>
                            <td className="px-4 py-2">{consulta.duracao} min</td>
                            <td className="px-4 py-2">R$ {consulta.valor}</td>
                            <td className="px-4 py-2 text-right">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => excluirConsulta(consulta.id)}
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
                  <p className="text-center text-muted-foreground py-10">Nenhuma consulta cadastrada ainda.</p>
                )}
              </CardContent>
            </Card>
            <ModalNovaConsulta
  open={novaConsultaModalAberto}
  onOpenChange={setNovaConsultaModalAberto}
  pacientes={pacientes}
  pacienteSelecionado={pacienteSelecionado}
  setPacienteSelecionado={setPacienteSelecionado}
  dataConsulta={dataConsulta}
  setDataConsulta={setDataConsulta}
  horario={horario}
  setHorario={setHorario}
  duracao={duracao}
  setDuracao={setDuracao}
  criarConsulta={criarConsulta}
/>


            </div>
        </main>
      </div>
    </div>
  );
}

// Funções auxiliares
function diasNoMes(mes: number, ano: number) {
  return new Date(ano, mes + 1, 0).getDate();
}

function primeiroDiaSemana(mes: number, ano: number) {
  return new Date(ano, mes, 1).getDay(); // 0=Domingo, 1=Segunda...
}

// Ícone de Dinheiro
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
      className="h-4 w-4 text-muted-foreground"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  );
}

// SidebarItem - botão de navegação lateral
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

// Modal de Nova Consulta
function ModalNovaConsulta({
  open,
  onOpenChange,
  pacientes,
  pacienteSelecionado,
  setPacienteSelecionado,
  dataConsulta,
  setDataConsulta,
  horario,
  setHorario,
  duracao,
  setDuracao,
  criarConsulta,
}: any) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Consulta</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-2">
            <Label>Paciente</Label>
            <Select value={pacienteSelecionado} onValueChange={setPacienteSelecionado}>
  <SelectTrigger>
    <SelectValue placeholder="Selecione o paciente" />
  </SelectTrigger>
  <SelectContent>
  {pacientes.length > 0 ? (
    pacientes.map((p: any) => (
      <SelectItem key={p.id} value={p.nome}>
        {p.nome}
      </SelectItem>
    ))
  ) : (
    <SelectItem value="nenhum" disabled>
      Nenhum paciente encontrado
    </SelectItem>
  )}
</SelectContent>

</Select>

          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label>Data</Label>
            <Input
              type="date"
              value={dataConsulta}
              onChange={(e) => setDataConsulta(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label>Horário</Label>
            <Input
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label>Duração (min)</Label>
            <Input
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
              placeholder="Ex: 30"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            onClick={criarConsulta}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
          >
            Salvar Consulta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Constantes para os meses e dias da semana
const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const anos = [2023, 2024, 2025, 2026, 2027];

const diasDaSemana = [
  "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
];
