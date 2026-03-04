"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, MoreHorizontal, Users, TrendingUp, UserCheck, UserMinus } from "lucide-react"

const customerStats = [
  { label: "Total Customers", value: "2,481", change: "+124 this month", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Active", value: "2,214", change: "89.2% of total", icon: UserCheck, color: "text-chart-2", bg: "bg-chart-2/10" },
  { label: "New This Month", value: "312", change: "+18.4% MoM", icon: TrendingUp, color: "text-chart-3", bg: "bg-chart-3/10" },
  { label: "Churned", value: "47", change: "-8.2% MoM", icon: UserMinus, color: "text-chart-4", bg: "bg-chart-4/10" },
]

const customers = [
  { id: "CUS-001", name: "Acme Corp", email: "billing@acme.com", plan: "Enterprise", mrr: "$2,400", status: "Active", since: "Mar 2022", country: "US" },
  { id: "CUS-002", name: "Globex Inc", email: "finance@globex.com", plan: "Pro", mrr: "$299", status: "Active", since: "Jul 2022", country: "UK" },
  { id: "CUS-003", name: "Umbrella Co", email: "accounts@umbrella.com", plan: "Enterprise", mrr: "$4,800", status: "Active", since: "Jan 2022", country: "US" },
  { id: "CUS-004", name: "Initech LLC", email: "pay@initech.com", plan: "Starter", mrr: "$49", status: "Active", since: "Nov 2023", country: "CA" },
  { id: "CUS-005", name: "Hooli", email: "billing@hooli.com", plan: "Pro", mrr: "$299", status: "Past Due", since: "Aug 2023", country: "US" },
  { id: "CUS-006", name: "Stark Industries", email: "tony@stark.com", plan: "Enterprise", mrr: "$1,200", status: "Active", since: "Apr 2022", country: "US" },
  { id: "CUS-007", name: "Wayne Enterprises", email: "bruce@wayne.com", plan: "Starter", mrr: "$0", status: "Cancelled", since: "Feb 2024", country: "US" },
  { id: "CUS-008", name: "Pied Piper", email: "richard@pp.com", plan: "Trial", mrr: "$0", status: "Trial", since: "Jan 2026", country: "US" },
  { id: "CUS-009", name: "Bluth Company", email: "gob@bluth.com", plan: "Pro", mrr: "$598", status: "Active", since: "Sep 2023", country: "US" },
  { id: "CUS-010", name: "Dunder Mifflin", email: "michael@dm.com", plan: "Starter", mrr: "$149", status: "Active", since: "Dec 2023", country: "US" },
]

const planColors: Record<string, string> = {
  Enterprise: "bg-primary/10 text-primary",
  Pro: "bg-chart-2/10 text-chart-2",
  Starter: "bg-chart-3/10 text-chart-3",
  Trial: "bg-muted text-muted-foreground",
}

const statusColors: Record<string, string> = {
  Active: "bg-chart-2/10 text-chart-2",
  "Past Due": "bg-chart-3/10 text-chart-3",
  Cancelled: "bg-chart-4/10 text-chart-4",
  Trial: "bg-primary/10 text-primary",
}

const avatarColors = [
  "bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-sky-500",
  "bg-violet-500", "bg-orange-500", "bg-teal-500", "bg-pink-500", "bg-cyan-500",
]

export function CustomersPage() {
  const [search, setSearch] = useState("")

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Customers</h1>
          <p className="text-xs text-muted-foreground mt-0.5">View and manage your customer accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </Button>
          <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {customerStats.map((s) => (
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
              <p className="text-xs text-muted-foreground mt-2">{s.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-sm font-semibold text-foreground">All Customers</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs w-52 bg-muted border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Customer", "Plan", "MRR", "Status", "Country", "Since", ""].map((h) => (
                  <th key={h} className={`py-3 px-6 text-xs font-medium text-muted-foreground ${h === "" || h === "Status" || h === "Plan" ? "text-center" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{c.name}</p>
                        <p className="text-[10px] text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${planColors[c.plan]}`}>
                      {c.plan}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs font-semibold text-foreground">{c.mrr}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-muted-foreground">{c.country}</td>
                  <td className="px-6 py-3 text-xs text-muted-foreground">{c.since}</td>
                  <td className="px-6 py-3">
                    <button className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-6 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Showing {filtered.length} of {customers.length} customers</span>
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
