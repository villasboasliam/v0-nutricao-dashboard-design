import Link from "next/link"
import { LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 max-w-md">
        <LineChart className="h-12 w-12 text-indigo-600 mx-auto" />
        <h1 className="text-3xl font-bold">Página não encontrada</h1>
        <p className="text-muted-foreground">A página que você está procurando não existe ou foi movida.</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-6">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
            <Link href="/">Voltar para o Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/landing">Conhecer a plataforma</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
