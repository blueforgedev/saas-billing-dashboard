"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Users,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  ChevronLeft,
  Zap,
  TrendingUp,
  Package,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { PageId } from "@/components/dashboard/shell"
import { useState } from "react"

const navItems: {
  section: string
  items: { label: string; icon: React.ElementType; id: PageId; badge?: string }[]
}[] = [
  {
    section: "OVERVIEW",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { label: "Analytics", icon: TrendingUp, id: "analytics" },
      { label: "Revenue", icon: BarChart3, id: "revenue" },
    ],
  },
  {
    section: "BILLING",
    items: [
      { label: "Subscriptions", icon: Package, id: "subscriptions", badge: "12" },
      { label: "Invoices", icon: FileText, id: "invoices", badge: "3" },
      { label: "Payments", icon: CreditCard, id: "payments" },
      { label: "Customers", icon: Users, id: "customers" },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      { label: "Notifications", icon: Bell, id: "notifications", badge: "5" },
      { label: "Settings", icon: Settings, id: "settings" },
      { label: "Help & Support", icon: HelpCircle, id: "help" },
    ],
  },
]

interface SidebarProps {
  currentPage: PageId
  onNavigate: (page: PageId) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "relative flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary shadow-lg shadow-primary/40 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span className="font-bold text-sidebar-foreground text-sm tracking-wide">
            BillFlow
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navItems.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[9px] font-bold tracking-[0.14em] text-sidebar-foreground/35 uppercase">
                {section.section}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = currentPage === item.id
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "opacity-100" : "opacity-70")} />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className={cn(
                              "inline-flex items-center justify-center h-4 min-w-4 px-1.5 rounded-full text-[10px] font-semibold",
                              isActive
                                ? "bg-white/25 text-white"
                                : "bg-sidebar-border text-sidebar-foreground/60"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary shadow shadow-primary/40 flex items-center justify-center text-[11px] font-bold text-primary-foreground flex-shrink-0">
              JD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">John Doe</p>
              <p className="text-[10px] text-sidebar-foreground/45 truncate">admin@billflow.io</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center hover:bg-sidebar-accent transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={cn("w-3 h-3 text-sidebar-foreground/60 transition-transform", collapsed && "rotate-180")}
        />
      </button>
    </aside>
  )
}
