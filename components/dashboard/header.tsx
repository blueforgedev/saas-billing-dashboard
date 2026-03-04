"use client"

import { Bell, Search, Calendar, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex-1 max-w-sm relative hidden sm:block">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <Input
          placeholder="Search customers, invoices..."
          className="pl-8 h-8 text-xs bg-muted border-border focus-visible:ring-primary"
        />
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border hidden md:flex">
          <Calendar className="w-3.5 h-3.5" />
          Dec 2024
        </Button>
        <button
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <button className="relative w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-chart-4" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground cursor-pointer">
          JD
        </div>
      </div>
    </header>
  )
}
