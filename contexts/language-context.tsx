"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "pt" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  pt: {
    // Navegação
    dashboard: "Dashboard",
    patients: "Pacientes",
    videos: "Vídeos",
    profile: "Perfil",

    // Dashboard
    "total.patients": "Total de Pacientes",
    "active.patients": "Pacientes Ativos na Semana",
    "sent.diets": "Dietas Enviadas",
    "app.access.rate": "Taxa de Acesso ao App",
    "app.access": "Acessos ao App",
    "daily.access": "Número de acessos diários na última semana",
    "add.patient": "Adicionar Paciente",
    "view.all.patients": "Ver Todos os Pacientes",

    // Pacientes
    "patient.list": "Lista de Pacientes",
    all: "Todos",
    active: "Ativos",
    inactive: "Inativos",
    "last.visit": "Última visita",
    "back.to.dashboard": "Voltar ao Dashboard",

    // Perfil
    "my.profile": "Meu Perfil",
    "personal.info": "Informações Pessoais",
    security: "Segurança",
    "account.settings": "Configurações da Conta",
    notifications: "Notificações",
    preferences: "Preferências",
    "dark.theme": "Tema escuro",
    language: "Idioma",
    "save.changes": "Salvar Alterações",
    "update.password": "Atualizar Senha",
    "my.plan": "Meu Plano",
    "current.plan": "Plano Atual",
    "plan.features": "Recursos do Plano",
    "upgrade.plan": "Fazer Upgrade",
    "billing.info": "Informações de Cobrança",
    "next.billing": "Próxima cobrança",

    // Vídeos
    "video.library": "Biblioteca de Vídeos",
    "new.video": "Novo Vídeo",
    watch: "Assistir",
  },
  en: {
    // Navigation
    dashboard: "Dashboard",
    patients: "Patients",
    videos: "Videos",
    profile: "Profile",

    // Dashboard
    "total.patients": "Total Patients",
    "active.patients": "Active Patients This Week",
    "sent.diets": "Diets Sent",
    "app.access.rate": "App Access Rate",
    "app.access": "App Access",
    "daily.access": "Daily access count for the last week",
    "add.patient": "Add Patient",
    "view.all.patients": "View All Patients",

    // Patients
    "patient.list": "Patient List",
    all: "All",
    active: "Active",
    inactive: "Inactive",
    "last.visit": "Last visit",
    "back.to.dashboard": "Back to Dashboard",

    // Profile
    "my.profile": "My Profile",
    "personal.info": "Personal Information",
    security: "Security",
    "account.settings": "Account Settings",
    notifications: "Notifications",
    preferences: "Preferences",
    "dark.theme": "Dark theme",
    language: "Language",
    "save.changes": "Save Changes",
    "update.password": "Update Password",
    "my.plan": "My Plan",
    "current.plan": "Current Plan",
    "plan.features": "Plan Features",
    "upgrade.plan": "Upgrade Plan",
    "billing.info": "Billing Information",
    "next.billing": "Next billing",

    // Videos
    "video.library": "Video Library",
    "new.video": "New Video",
    watch: "Watch",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
