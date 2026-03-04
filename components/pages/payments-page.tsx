"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts"
import { Search, Download, Filter, MoreHorizontal, CreditCard, CheckCircle, XCircle, RefreshCw, TrendingUp } from "lucide-react"

const indigo = "#6366f1"
const emerald = "#34d399"
const rose = "#f87171"

const paymentStats = [
  { label: "Total Volume", value: "$81,200", change: "+12.4%", icon: CreditCard, color: "text-primary", bg: "bg-primary/10" },
  { label: "Successful", value: "1,248", change: "+9.1%", icon: CheckCircle, color: "text-chart-2", bg: "bg-chart-2/10" },
  { label: "Failed", value: "23", change: "-14.8%", icon: XCircle, color: "text-chart-4", bg: "bg-chart-4/10" },
  { label: "Refunded", value: "$1,840", change: "-2.3%", icon: RefreshCw, color: "text-chart-3", bg: "bg-chart-3/10" },
]

const volumeData = [
  { day: "Mon", success: 12400, failed: 420, refund: 180 },
  { day: "Tue", success: 14200, failed: 310, refund: 240 },
  { day: "Wed", success: 11800, failed: 520, refund: 160 },
  { day: "Thu", success: 15600, failed: 280, refund: 320 },
  { day: "Fri", success: 18200, failed: 190, refund: 210 },
  { day: "Sat", success: 9400, failed: 140, refund: 90 },
  { day: "Sun", success: 7200, failed: 110, refund: 70 },
]

const methodData = [
  { method: "Visa", count: 621, pct: 49 },
  { method: "Mastercard", count: 318, pct: 25 },
  { method: "Amex", count: 178, pct: 14 },
  { method: "ACH", count: 89, pct: 7 },
  { method: "Other", count: 42, pct: 5 },
]

const payments = [
  { id: "pay_8xZk", customer: "Acme Corp", method: "Visa ••••4242", amount: "$2,400.00", date: "Jan 28, 2026 14:32", status: "Succeeded", fee: "$69.60" },
  { id: "pay_8xZj", customer: "Globex Inc", method: "Mastercard ••••8821", amount: "$299.00", date: "Jan 28, 2026 11:14", status: "Succeeded", fee: "$8.96" },
  { id: "pay_8xZi", customer: "Hooli", method: "Visa ••••3311", amount: "$299.00", date: "Jan 28, 2026 09:44", status: "Failed", fee: "$0.00" },
  { id: "pay_8xZh", customer: "Stark Ind.", method: "Amex ••••0007", amount: "$1,200.00", date: "Jan 27, 2026 17:22", status: "Succeeded", fee: "$36.60" },
  { id: "pay_8xZg", customer: "Initech LLC", method: "ACH Transfer", amount: "$49.00", date: "Jan 27, 2026 14:10", status: "Succeeded", fee: "$0.25" },
  { id: "pay_8xZf", customer: "Wayne Ent.", method: "Visa ••••7788", amount: "$49.00", date: "Jan 27, 2026 10:05", status: "Refunded", fee: "$0.00" },
  { id: "pay_8xZe", customer: "Bluth Co", method: "Mastercard ••••5523", amount: "$598.00", date: "Jan 26, 2026 16:48", status: "Succeeded", fee: "$17.66" },
  { id: "pay_8xZd", customer: "Dunder Mifflin", method: "Visa ••••1234", amount: "$149.00", date: "Jan 26, 2026 13:29", status: "Succeeded", fee: "$4.62" },
]

const statusConfig: Record<string, { className: string }> = {
  Succeeded: { className: "bg-chart-2/10 text-chart-2" },
  Failed: { className: "bg-chart-4/10 text-chart-4" },
  Refunded: { className: "bg-chart-3/10 text-chart-3" },
  Pending: { className: "bg-muted text-muted-foreground" },
}

export function PaymentsPage() {
  const [search, setSearch] = useState("")

  const filtered = payments.filter(
    (p) =>
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Payments</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Monitor transactions, failures, and refunds</p>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border">
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {paymentStats.map((s) => (
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
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-chart-2" />
                <span className="text-xs font-medium text-chart-2">{s.change}</span>
                <span className="text-xs text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Volume chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-foreground">Daily Payment Volume</CardTitle>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: indigo }} />Succeeded</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: rose }} />Failed</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: emerald }} />Refund</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={volumeData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#1c1c2e", border: "1px solid #2d2d44", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#e5e7eb" }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`]}
                />
                <Bar dataKey="success" fill={indigo} name="Succeeded" radius={[2, 2, 0, 0]} />
                <Bar dataKey="failed" fill={rose} name="Failed" radius={[2, 2, 0, 0]} />
                <Bar dataKey="refund" fill={emerald} name="Refund" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment methods */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {methodData.map((m) => (
              <div key={m.method}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground">{m.method}</span>
                  <span className="text-xs text-muted-foreground">{m.count} ({m.pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Transactions table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-sm font-semibold text-foreground">Recent Transactions</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
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
                {["Payment ID", "Customer", "Method", "Amount", "Fee", "Date", "Status", ""].map((h) => (
                  <th key={h} className={`py-3 px-6 text-xs font-medium text-muted-foreground ${h === "" || h === "Status" ? "text-center" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const s = statusConfig[p.status]
                return (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 text-xs font-mono text-primary">{p.id}</td>
                    <td className="px-6 py-3 text-xs font-medium text-foreground">{p.customer}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{p.method}</td>
                    <td className="px-6 py-3 text-xs font-semibold text-foreground">{p.amount}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{p.fee}</td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{p.date}</td>
                    <td className="px-6 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${s.className}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
