"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Download, Filter, MoreHorizontal, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const invoiceSummary = [
  { label: "Total Outstanding", value: "$24,820", icon: FileText, color: "text-primary", bg: "bg-primary/10" },
  { label: "Overdue", value: "$6,140", icon: AlertTriangle, color: "text-chart-4", bg: "bg-chart-4/10" },
  { label: "Paid This Month", value: "$81,200", icon: CheckCircle, color: "text-chart-2", bg: "bg-chart-2/10" },
  { label: "Avg. Payment Time", value: "4.2 days", icon: Clock, color: "text-chart-3", bg: "bg-chart-3/10" },
]

const invoices = [
  { id: "INV-2025-0124", customer: "Acme Corp", amount: "$2,400.00", due: "Feb 15, 2026", issued: "Jan 16, 2026", status: "Pending", items: 3 },
  { id: "INV-2025-0123", customer: "Globex Inc", amount: "$299.00", due: "Feb 18, 2026", issued: "Jan 18, 2026", status: "Paid", items: 1 },
  { id: "INV-2025-0122", customer: "Umbrella Co", amount: "$4,800.00", due: "Jan 30, 2026", issued: "Jan 1, 2026", status: "Overdue", items: 5 },
  { id: "INV-2025-0121", customer: "Initech LLC", amount: "$49.00", due: "Feb 20, 2026", issued: "Jan 20, 2026", status: "Paid", items: 1 },
  { id: "INV-2025-0120", customer: "Hooli", amount: "$299.00", due: "Feb 1, 2026", issued: "Jan 2, 2026", status: "Overdue", items: 1 },
  { id: "INV-2025-0119", customer: "Stark Ind.", amount: "$1,200.00", due: "Feb 28, 2026", issued: "Jan 28, 2026", status: "Pending", items: 2 },
  { id: "INV-2025-0118", customer: "Wayne Ent.", amount: "$49.00", due: "Jan 25, 2026", issued: "Dec 25, 2025", status: "Paid", items: 1 },
  { id: "INV-2025-0117", customer: "Pied Piper", amount: "$0.00", due: "—", issued: "Jan 5, 2026", status: "Draft", items: 0 },
  { id: "INV-2025-0116", customer: "Bluth Co", amount: "$598.00", due: "Feb 10, 2026", issued: "Jan 10, 2026", status: "Paid", items: 2 },
  { id: "INV-2025-0115", customer: "Dunder Mifflin", amount: "$149.00", due: "Feb 12, 2026", issued: "Jan 12, 2026", status: "Pending", items: 1 },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  Paid: { label: "Paid", className: "bg-chart-2/10 text-chart-2" },
  Pending: { label: "Pending", className: "bg-chart-3/10 text-chart-3" },
  Overdue: { label: "Overdue", className: "bg-chart-4/10 text-chart-4" },
  Draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
}

const tabs = ["All", "Paid", "Pending", "Overdue", "Draft"]

export function InvoicesPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("All")

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      inv.customer.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase())
    const matchTab = activeTab === "All" || inv.status === activeTab
    return matchSearch && matchTab
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Invoices</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Track, manage, and send invoices to customers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {invoiceSummary.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {tab !== "All" && (
                    <span className="ml-1.5 text-[10px] text-muted-foreground">
                      ({invoices.filter((i) => i.status === tab).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs w-48 bg-muted border-border"
                />
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Invoice", "Customer", "Amount", "Issued", "Due Date", "Items", "Status", ""].map((h) => (
                  <th key={h} className={`py-3 px-6 text-xs font-medium text-muted-foreground ${h === "" || h === "Status" || h === "Items" ? "text-center" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => {
                const s = statusConfig[inv.status]
                return (
                  <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-3 text-xs font-mono text-primary">{inv.id}</td>
                    <td className="px-6 py-3 text-xs font-medium text-foreground">{inv.customer}</td>
                    <td className="px-6 py-3 text-xs font-semibold text-foreground">{inv.amount}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{inv.issued}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{inv.due}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground text-center">{inv.items}</td>
                    <td className="px-6 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${s.className}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center transition-colors">
                          <Download className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-6 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Showing {filtered.length} of {invoices.length} invoices</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs border-border" disabled>Prev</Button>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs border-border">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
