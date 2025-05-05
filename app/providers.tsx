'use client'

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { FirebaseAppProvider } from 'reactfire';
import { firebaseApp } from '@/lib/firebase'; // Importe a instância do app

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}> {/* Use firebaseApp em vez de firebaseConfig */}
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </SessionProvider>
    </FirebaseAppProvider>
  )
}