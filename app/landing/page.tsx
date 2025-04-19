"use client"

import { useState } from "react"
import { ArrowRight, Check, ChevronDown, FileText, LineChart, Menu, Users, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"

export default function LandingPage() {
  const { t } = useLanguage()
  const [openFeature, setOpenFeature] = useState<string | null>(null)

  const toggleFeature = (feature: string) => {
    if (openFeature === feature) {
      setOpenFeature(null)
    } else {
      setOpenFeature(feature)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
            <LineChart className="h-5 w-5" />
            <span className="text-xl">NutriDash</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-indigo-600">
              Funcionalidades
            </Link>
            <Link href="#plans" className="text-sm font-medium hover:text-indigo-600">
              Planos
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-indigo-600">
              Depoimentos
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
              <Link href="/cadastro">Cadastre-se</Link>
            </Button>
          </div>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="#features" className="text-sm font-medium hover:text-indigo-600">
                  Funcionalidades
                </Link>
                <Link href="#plans" className="text-sm font-medium hover:text-indigo-600">
                  Planos
                </Link>
                <Link href="#testimonials" className="text-sm font-medium hover:text-indigo-600">
                  Depoimentos
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full" asChild>
                    <Link href="/cadastro">Cadastre-se</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Gerencie seus pacientes com eficiência e precisão
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  NutriDash é a plataforma completa para nutricionistas que desejam otimizar seu tempo e melhorar os
                  resultados de seus pacientes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" size="lg" asChild>
                  <Link href="/cadastro">
                    Comece agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#plans">Ver planos</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl border shadow-xl">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Dashboard NutriDash"
                  width={800}
                  height={500}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Funcionalidades completas para nutricionistas
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tudo o que você precisa para gerenciar seus pacientes, criar dietas personalizadas e acompanhar a
                evolução física.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Gestão de Pacientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cadastre e gerencie todos os seus pacientes em um só lugar, com acesso rápido a histórico e métricas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Dietas Personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Crie dietas personalizadas para cada paciente e compartilhe facilmente em formato PDF.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-indigo-600" />
                  Evolução Física
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Acompanhe a evolução física dos pacientes com gráficos detalhados e comparativos visuais.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-indigo-600" />
                  Biblioteca de Vídeos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Compartilhe vídeos educativos e de exercícios com seus pacientes para complementar o tratamento.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-indigo-600" />
                  Dashboard Intuitivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualize métricas importantes e acompanhe o progresso de todos os seus pacientes em um painel
                  intuitivo.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Aplicativo para Pacientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Seus pacientes podem acessar dietas, vídeos e registrar seu progresso através do aplicativo móvel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Perguntas Frequentes</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tire suas dúvidas sobre o NutriDash
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-12 space-y-4">
            <div className="rounded-lg border bg-card">
              <button
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() => toggleFeature("faq1")}
              >
                <span className="font-medium">Como funciona o período de teste?</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openFeature === "faq1" ? "rotate-180" : ""}`} />
              </button>
              {openFeature === "faq1" && (
                <div className="p-4 pt-0 text-sm text-muted-foreground">
                  <p>
                    Oferecemos um período de teste gratuito de 14 dias para que você possa experimentar todas as
                    funcionalidades do NutriDash. Não é necessário cartão de crédito para iniciar o teste.
                  </p>
                </div>
              )}
            </div>
            <div className="rounded-lg border bg-card">
              <button
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() => toggleFeature("faq2")}
              >
                <span className="font-medium">Posso cancelar minha assinatura a qualquer momento?</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openFeature === "faq2" ? "rotate-180" : ""}`} />
              </button>
              {openFeature === "faq2" && (
                <div className="p-4 pt-0 text-sm text-muted-foreground">
                  <p>
                    Sim, você pode cancelar sua assinatura a qualquer momento. Não há contratos de longo prazo ou taxas
                    de cancelamento. Você terá acesso ao sistema até o final do período pago.
                  </p>
                </div>
              )}
            </div>
            <div className="rounded-lg border bg-card">
              <button
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() => toggleFeature("faq3")}
              >
                <span className="font-medium">Como meus pacientes acessam o sistema?</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openFeature === "faq3" ? "rotate-180" : ""}`} />
              </button>
              {openFeature === "faq3" && (
                <div className="p-4 pt-0 text-sm text-muted-foreground">
                  <p>
                    Seus pacientes recebem um convite por e-mail para acessar o aplicativo móvel. Lá, eles podem
                    visualizar suas dietas, vídeos recomendados e registrar seu progresso diário.
                  </p>
                </div>
              )}
            </div>
            <div className="rounded-lg border bg-card">
              <button
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() => toggleFeature("faq4")}
              >
                <span className="font-medium">Quais formas de pagamento são aceitas?</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openFeature === "faq4" ? "rotate-180" : ""}`} />
              </button>
              {openFeature === "faq4" && (
                <div className="p-4 pt-0 text-sm text-muted-foreground">
                  <p>
                    Aceitamos cartões de crédito, boleto bancário e PIX. Em breve, teremos integração com outros métodos
                    de pagamento como Mercado Pago.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Planos e Preços</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Escolha o plano ideal para o seu consultório
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Básico</CardTitle>
                <CardDescription>Para nutricionistas iniciantes</CardDescription>
                <div className="mt-4 text-4xl font-bold">
                  R$ 49,90<span className="text-sm font-normal text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Até 30 pacientes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Gestão de pacientes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Dietas básicas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Evolução física</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                  <Link href="/planos?plano=basico">Escolher plano</Link>
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col border-indigo-600 shadow-lg">
              <CardHeader>
                <div className="py-1 px-3 text-xs bg-indigo-600 text-white rounded-full w-fit mx-auto mb-2">
                  Mais popular
                </div>
                <CardTitle>Profissional</CardTitle>
                <CardDescription>Para consultórios em crescimento</CardDescription>
                <div className="mt-4 text-4xl font-bold">
                  R$ 99,90<span className="text-sm font-normal text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Até 100 pacientes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Gestão de pacientes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Dietas avançadas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Evolução física</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Biblioteca de vídeos</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Aplicativo para pacientes</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                  <Link href="/planos?plano=profissional">Escolher plano</Link>
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Empresarial</CardTitle>
                <CardDescription>Para clínicas e equipes</CardDescription>
                <div className="mt-4 text-4xl font-bold">
                  R$ 199,90<span className="text-sm font-normal text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Pacientes ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Múltiplos nutricionistas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Todas as funcionalidades</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Relatórios avançados</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>API para integração</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                  <Link href="/planos?plano=empresarial">Escolher plano</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                O que nossos clientes dizem
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nutricionistas que transformaram seus consultórios com o NutriDash
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-muted h-10 w-10 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dra. Ana Silva</h4>
                    <p className="text-sm text-muted-foreground">Nutricionista Clínica</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "O NutriDash revolucionou meu consultório. Consigo acompanhar meus pacientes de forma muito mais
                  eficiente e os resultados melhoraram significativamente."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-muted h-10 w-10 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dr. Carlos Mendes</h4>
                    <p className="text-sm text-muted-foreground">Nutricionista Esportivo</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Meus atletas adoram o aplicativo e a possibilidade de acompanhar sua evolução. A biblioteca de vídeos
                  é um diferencial incrível para complementar as dietas."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-muted h-10 w-10 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dra. Juliana Costa</h4>
                    <p className="text-sm text-muted-foreground">Clínica de Nutrição</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Com o plano empresarial, conseguimos integrar toda a equipe da clínica. A gestão ficou muito mais
                  simples e os pacientes estão mais engajados."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pronto para transformar seu consultório?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comece hoje mesmo com 14 dias de teste gratuito. Sem compromisso.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100" size="lg" asChild>
                <Link href="/cadastro">
                  Criar conta gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-indigo-700" size="lg" asChild>
                <Link href="/login">Já tenho uma conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
                <LineChart className="h-5 w-5" />
                <span>NutriDash</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                A plataforma completa para nutricionistas que desejam otimizar seu tempo e melhorar os resultados de
                seus pacientes.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="#plans" className="text-muted-foreground hover:text-foreground">
                    Planos
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-muted-foreground hover:text-foreground">
                    Depoimentos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Termos de Serviço
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NutriDash. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
