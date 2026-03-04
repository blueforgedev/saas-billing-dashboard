"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Search, Plus, Filter, MoreHorizontal, Package, TrendingUp, UserMinus, RefreshCw } from "lucide-react"

const indigo = "#6366f1"
const emerald = "#34d399"
const rose = "#f87171"
const amber = "#fbbf24"

const subStats = [
  { label: "Active Subscriptions", value: "2,481", change: "+124", up: true, icon: Package },
  { label: "New This Month", value: "312", change: "+18.4%", up: true, icon: TrendingUp },
  { label: "Churned", value: "47", change: "-8.2%", up: true, icon: UserMinus },
  { label: "Renewal Rate", value: "94.2%", change: "+1.4%", up: true, icon: RefreshCw },
]

const planGrowthData = [
  { month: "Aug", enterprise: 180, pro: 620, starter: 980, trial: 240 },
  { month: "Sep", enterprise: 195, pro: 650, starter: 1010, trial: 220 },
  { month: "Oct", enterprise: 210, pro: 690, starter: 1080, trial: 260 },
  { month: "Nov", enterprise: 228, pro: 720, starter: 1120, trial: 250 },
  { month: "Dec", enterprise: 241, pro: 758, starter: 1190, trial: 292 },
  { month: "Jan", enterprise: 258, pro: 784, starter: 1230, trial: 209 },
]

const subscriptions = [
  { id: "SUB-8841", customer: "Acme Corp", plan: "Enterprise", amount: "$2,400/mo", status: "Active", nextBilling: "Feb 15, 2026", seats: 120 },
  { id: "SUB-8840", customer: "Globex Inc", plan: "Pro", amount: "$299/mo", status: "Active", nextBilling: "Feb 18, 2026", seats: 24 },
  { id: "SUB-8839", customer: "Initech LLC", plan: "Starter", amount: "$49/mo", status: "Active", nextBilling: "Feb 20, 2026", seats: 5 },
  { id: "SUB-8838", customer: "Umbrella Co", plan: "Enterprise", amount: "$4,800/mo", status: "Active", nextBilling: "Feb 22, 2026", seats: 250 },
  { id: "SUB-8837", customer: "Hooli", plan: "Pro", amount: "$299/mo", status: "Past Due", nextBilling: "Jan 30, 2026", seats: 18 },
  { id: "SUB-8836", customer: "Stark Ind.", plan: "Enterprise", amount: "$1,200/mo", status: "Active", nextBilling: "Feb 28, 2026", seats: 60 },
  { id: "SUB-8835", customer: "Wayne Ent.", plan: "Starter", amount: "$49/mo", status: "Cancelled", nextBilling: "—", seats: 3 },
  { id: "SUB-8834", customer: "Pied Piper", plan: "Trial", amount: "$0/mo", status: "Trial", nextBilling: "Mar 5, 2026", seats: 10 },
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

export function SubscriptionsPage() {
  const [search, setSearch] = useState("")

  const filtered = subscriptions.filter(
    (s) =>
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Subscriptions</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage and track all active subscription plans</p>
        </div>
        <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary text-primary-foreground">
          <Plus className="w-3.5 h-3.5" />
          New Subscription
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {subStats.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-chart-2" />
                <span className="text-xs font-medium text-chart-2">{s.change}</span>
                <span className="text-xs text-muted-foreground">this month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan growth chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground">Subscriptions by Plan</CardTitle>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: indigo }} />Enterprise</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: emerald }} />Pro</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: amber }} />Starter</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: rose }} />Trial</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={planGrowthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1c1c2e", border: "1px solid #2d2d44", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#e5e7eb" }}
              />
              <Bar dataKey="enterprise" fill={indigo} name="Enterprise" stackId="a" />
              <Bar dataKey="pro" fill={emerald} name="Pro" stackId="a" />
              <Bar dataKey="starter" fill={amber} name="Starter" stackId="a" />
              <Bar dataKey="trial" fill={rose} name="Trial" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Subscriptions table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-sm font-semibold text-foreground">All Subscriptions</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search..."
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
                {["ID", "Customer", "Plan", "Amount", "Seats", "Status", "Next Billing", ""].map((h) => (
                  <th key={h} className={`py-3 px-6 text-xs font-medium text-muted-foreground ${h === "" || h === "Plan" || h === "Status" ? "text-center" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 text-xs font-mono text-muted-foreground">{sub.id}</td>
                  <td className="px-6 py-3 text-xs font-medium text-foreground">{sub.customer}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${planColors[sub.plan]}`}>
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs font-medium text-foreground">{sub.amount}</td>
                  <td className="px-6 py-3 text-xs text-muted-foreground">{sub.seats}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[sub.status]}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-muted-foreground">{sub.nextBilling}</td>
                  <td className="px-6 py-3">
                    <button className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
