"use client"

import type React from "react"

import { useState } from "react"
import { LineChart, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const planos = {
  basico: {
    nome: "Básico",
    preco: 49.9,
    descricao: "Para nutricionistas iniciantes",
  },
  profissional: {
    nome: "Profissional",
    preco: 99.9,
    descricao: "Para consultórios em crescimento",
  },
  empresarial: {
    nome: "Empresarial",
    preco: 199.9,
    descricao: "Para clínicas e equipes",
  },
}

export default function PagamentoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planoParam = searchParams.get("plano") || "profissional"
  const plano = planos[planoParam as keyof typeof planos]

  const [paymentMethod, setPaymentMethod] = useState("cartao")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsLoading(false)
      // Redireciona para o dashboard após o pagamento
      router.push("/")
    }, 2000)
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
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Finalizar assinatura</h1>
            <p className="text-muted-foreground mt-2">Você está assinando o plano {plano.nome}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Método de pagamento</CardTitle>
                  <CardDescription>Escolha como deseja pagar sua assinatura</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cartao" onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="cartao">Cartão de crédito</TabsTrigger>
                      <TabsTrigger value="boleto">Boleto</TabsTrigger>
                      <TabsTrigger value="pix">PIX</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cartao" className="mt-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Número do cartão</Label>
                          <Input id="card-number" placeholder="0000 0000 0000 0000" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Data de validade</Label>
                            <Input id="expiry" placeholder="MM/AA" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Nome no cartão</Label>
                          <Input id="card-name" placeholder="Nome completo" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Parcelamento</Label>
                          <RadioGroup defaultValue="1">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="r1" />
                              <Label htmlFor="r1">1x de R$ {plano.preco.toFixed(2)}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3" id="r2" />
                              <Label htmlFor="r2">3x de R$ {(plano.preco / 3).toFixed(2)}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="6" id="r3" />
                              <Label htmlFor="r3">6x de R$ {(plano.preco / 6).toFixed(2)}</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Processando..." : "Finalizar pagamento"}
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="boleto" className="mt-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF</Label>
                          <Input id="cpf" placeholder="000.000.000-00" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome completo</Label>
                          <Input id="name" placeholder="Seu nome" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Endereço</Label>
                          <Input id="address" placeholder="Rua, número, bairro" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">Cidade</Label>
                            <Input id="city" placeholder="Sua cidade" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Estado</Label>
                            <Select>
                              <SelectTrigger id="state">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sp">São Paulo</SelectItem>
                                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                                <SelectItem value="mg">Minas Gerais</SelectItem>
                                {/* Outros estados */}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Gerando boleto..." : "Gerar boleto"}
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="pix" className="mt-4">
                      <div className="text-center space-y-4">
                        <div className="mx-auto w-48 h-48 bg-muted flex items-center justify-center border rounded-md">
                          <p className="text-sm text-muted-foreground">QR Code PIX</p>
                        </div>
                        <p className="text-sm">
                          Escaneie o QR Code acima com o aplicativo do seu banco ou copie o código abaixo:
                        </p>
                        <div className="flex">
                          <Input
                            value="00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b028-f142082d7b230217NutriDash Plano"
                            readOnly
                          />
                          <Button variant="outline" className="ml-2">
                            Copiar
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          O pagamento será confirmado automaticamente em até 5 minutos.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumo da compra</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{plano.nome}</h3>
                      <p className="text-sm text-muted-foreground">{plano.descricao}</p>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {plano.preco.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground text-sm mt-1">
                        <span>Período</span>
                        <span>Mensal</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg mt-4">
                        <span>Total</span>
                        <span>R$ {plano.preco.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="flex items-center">
                        <Lock className="h-3 w-3 mr-1" />
                        Pagamento seguro
                      </p>
                      <p className="mt-2">
                        Você não será cobrado durante o período de teste de 14 dias. Cancele a qualquer momento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} NutriDash. Todos os direitos reservados.
      </footer>
    </div>
  )
}
