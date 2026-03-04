"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MoreHorizontal,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const invoices = [
  { id: "INV-2024-0891", customer: "Acme Corp", email: "billing@acme.com", amount: "$4,200.00", plan: "Enterprise", status: "Paid", date: "Dec 28, 2024" },
  { id: "INV-2024-0890", customer: "TechStart Inc", email: "finance@techstart.io", amount: "$890.00", plan: "Pro", status: "Paid", date: "Dec 27, 2024" },
  { id: "INV-2024-0889", customer: "Bright Labs", email: "accounts@brightlabs.com", amount: "$290.00", plan: "Starter", status: "Overdue", date: "Dec 26, 2024" },
  { id: "INV-2024-0888", customer: "Nexus Digital", email: "pay@nexus.co", amount: "$4,200.00", plan: "Enterprise", status: "Pending", date: "Dec 25, 2024" },
  { id: "INV-2024-0887", customer: "CloudBase AI", email: "billing@cloudbase.ai", amount: "$890.00", plan: "Pro", status: "Paid", date: "Dec 24, 2024" },
  { id: "INV-2024-0886", customer: "Spark Analytics", email: "accounts@spark.io", amount: "$290.00", plan: "Starter", status: "Paid", date: "Dec 23, 2024" },
  { id: "INV-2024-0885", customer: "Orbit Systems", email: "finance@orbit.dev", amount: "$4,200.00", plan: "Enterprise", status: "Overdue", date: "Dec 22, 2024" },
  { id: "INV-2024-0884", customer: "Pulse Media", email: "billing@pulsemedia.com", amount: "$890.00", plan: "Pro", status: "Pending", date: "Dec 21, 2024" },
]

const statusStyles: Record<string, string> = {
  Paid: "bg-chart-2/15 text-chart-2 border-chart-2/20",
  Pending: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  Overdue: "bg-destructive/15 text-destructive border-destructive/20",
}

export function InvoicesTable() {
  const [search, setSearch] = useState("")
  const filtered = invoices.filter(
    (inv) =>
      inv.customer.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 flex-wrap">
        <div>
          <CardTitle className="text-base font-semibold text-foreground">Recent Invoices</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">{invoices.length} invoices this month</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices..."
              className="pl-8 h-8 text-xs w-48 bg-muted border-border"
            />
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-muted-foreground font-medium tracking-wide uppercase text-[10px]">Invoice</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium tracking-wide uppercase text-[10px]">Customer</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium tracking-wide uppercase text-[10px] hidden md:table-cell">Plan</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium tracking-wide uppercase text-[10px]">Amount</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium tracking-wide uppercase text-[10px]">Status</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium tracking-wide uppercase text-[10px] hidden lg:table-cell">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr
                  key={inv.id}
                  className={cn(
                    "border-b border-border/50 hover:bg-muted/30 transition-colors",
                    i === filtered.length - 1 && "border-0"
                  )}
                >
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-foreground font-medium">{inv.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-foreground">{inv.customer}</p>
                    <p className="text-muted-foreground text-[11px]">{inv.email}</p>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell text-muted-foreground">{inv.plan}</td>
                  <td className="px-4 py-3.5 font-semibold text-foreground">{inv.amount}</td>
                  <td className="px-4 py-3.5">
                    <span className={cn("px-2 py-0.5 rounded-full border text-[11px] font-medium", statusStyles[inv.status])}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3.5">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {invoices.length} invoices</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground">
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
