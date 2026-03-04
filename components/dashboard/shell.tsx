"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"

// Pages
import { OverviewPage } from "@/components/pages/overview-page"
import { AnalyticsPage } from "@/components/pages/analytics-page"
import { RevenuePage } from "@/components/pages/revenue-page"
import { SubscriptionsPage } from "@/components/pages/subscriptions-page"
import { InvoicesPage } from "@/components/pages/invoices-page"
import { PaymentsPage } from "@/components/pages/payments-page"
import { CustomersPage } from "@/components/pages/customers-page"
import { NotificationsPage } from "@/components/pages/notifications-page"
import { SettingsPage } from "@/components/pages/settings-page"
import { HelpPage } from "@/components/pages/help-page"

export type PageId =
  | "dashboard"
  | "analytics"
  | "revenue"
  | "subscriptions"
  | "invoices"
  | "payments"
  | "customers"
  | "notifications"
  | "settings"
  | "help"

const pages: Record<PageId, React.ReactNode> = {
  dashboard: <OverviewPage />,
  analytics: <AnalyticsPage />,
  revenue: <RevenuePage />,
  subscriptions: <SubscriptionsPage />,
  invoices: <InvoicesPage />,
  payments: <PaymentsPage />,
  customers: <CustomersPage />,
  notifications: <NotificationsPage />,
  settings: <SettingsPage />,
  help: <HelpPage />,
}

export function DashboardShell() {
  const [currentPage, setCurrentPage] = useState<PageId>("dashboard")
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDark])

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />
        <main className="flex-1 overflow-y-auto">
          {pages[currentPage]}
        </main>
      </div>
    </div>
  )
}
