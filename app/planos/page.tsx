"use client"

import { Check, LineChart } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function PlanosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    // Pega o plano da URL se existir
    const planoParam = searchParams.get("plano")
    if (planoParam) {
      setSelectedPlan(planoParam)
    }
  }, [searchParams])

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan)
  }

  const handleContinue = () => {
    if (selectedPlan) {
      router.push(`/pagamento?plano=${selectedPlan}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="flex h-14 items-center px-4 lg:px-6 border-b bg-background">
        <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600">
          <LineChart className="h-5 w-5" />
          <span>NutriDash</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Escolha seu plano</h1>
            <p className="text-muted-foreground mt-2">
              Todos os planos incluem 14 dias de teste gratuito. Sem compromisso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
              className={`flex flex-col cursor-pointer transition-all ${
                selectedPlan === "basico" ? "border-indigo-600 shadow-lg" : ""
              }`}
              onClick={() => handleSelectPlan("basico")}
            >
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
            </Card>
            <Card
              className={`flex flex-col cursor-pointer transition-all ${
                selectedPlan === "profissional" ? "border-indigo-600 shadow-lg" : ""
              }`}
              onClick={() => handleSelectPlan("profissional")}
            >
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
            </Card>
            <Card
              className={`flex flex-col cursor-pointer transition-all ${
                selectedPlan === "empresarial" ? "border-indigo-600 shadow-lg" : ""
              }`}
              onClick={() => handleSelectPlan("empresarial")}
            >
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
            </Card>
          </div>

          <div className="text-center">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
              size="lg"
              disabled={!selectedPlan}
              onClick={handleContinue}
            >
              Continuar
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Você não será cobrado durante o período de teste. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} NutriDash. Todos os direitos reservados.
      </footer>
    </div>
  )
}
