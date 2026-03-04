"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight } from "lucide-react"

const indigo = "#6366f1"
const emerald = "#34d399"
const amber = "#fbbf24"
const rose = "#f87171"
const sky = "#38bdf8"

const mrrData = [
  { month: "Jul", mrr: 58200, arr: 698400, newBiz: 8400, expansion: 3200, churn: -2100 },
  { month: "Aug", mrr: 63100, arr: 757200, newBiz: 9100, expansion: 3800, churn: -2400 },
  { month: "Sep", mrr: 61400, arr: 736800, newBiz: 7200, expansion: 2900, churn: -3100 },
  { month: "Oct", mrr: 68900, arr: 826800, newBiz: 10200, expansion: 4100, churn: -1800 },
  { month: "Nov", mrr: 72400, arr: 868800, newBiz: 8900, expansion: 4600, churn: -2200 },
  { month: "Dec", mrr: 81200, arr: 974400, newBiz: 12400, expansion: 5800, churn: -1900 },
  { month: "Jan", mrr: 78600, arr: 943200, newBiz: 9800, expansion: 4200, churn: -2800 },
]

const revenueByPlan = [
  { name: "Enterprise", value: 38400, color: indigo },
  { name: "Pro", value: 22100, color: emerald },
  { name: "Starter", value: 12800, color: amber },
  { name: "Trial", value: 5300, color: rose },
]

const waterfallData = [
  { label: "Beginning MRR", value: 72400, type: "start" },
  { label: "New Business", value: 9800, type: "positive" },
  { label: "Expansion", value: 4200, type: "positive" },
  { label: "Contraction", value: -2100, type: "negative" },
  { label: "Churn", value: -5700, type: "negative" },
  { label: "Ending MRR", value: 78600, type: "end" },
]

const revenueKpis = [
  { label: "MRR", value: "$78,600", change: "+8.5%", up: true },
  { label: "ARR", value: "$943,200", change: "+8.5%", up: true },
  { label: "ARPU", value: "$312", change: "+3.2%", up: true },
  { label: "LTV", value: "$4,680", change: "+6.8%", up: true },
  { label: "CAC", value: "$890", change: "-4.1%", up: true },
  { label: "LTV:CAC", value: "5.3x", change: "+11.4%", up: true },
]

export function RevenuePage() {
  const [metric, setMetric] = useState<"mrr" | "arr">("mrr")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Revenue</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly recurring revenue breakdown and growth metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-chart-2 border-chart-2/30 text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            +8.5% MoM
          </Badge>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {revenueKpis.map((kpi) => (
          <Card key={kpi.label} className="bg-card border-border">
            <CardContent className="pt-3 pb-3 px-4">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-lg font-bold text-foreground mt-0.5">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {kpi.up ? (
                  <TrendingUp className="w-3 h-3 text-chart-2" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-chart-4" />
                )}
                <span className={`text-[11px] font-medium ${kpi.up ? "text-chart-2" : "text-chart-4"}`}>
                  {kpi.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MRR Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground">MRR Growth</CardTitle>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {(["mrr", "arr"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-3 py-1 rounded-md text-xs font-medium uppercase transition-colors ${
                    metric === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mrrData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={indigo} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={indigo} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => metric === "mrr" ? `$${(v / 1000).toFixed(0)}k` : `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ background: "#1c1c2e", border: "1px solid #2d2d44", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#e5e7eb" }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, metric.toUpperCase()]}
              />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={indigo}
                strokeWidth={2.5}
                fill="url(#revGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* MRR Movement */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">MRR Movement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mrrData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#1c1c2e", border: "1px solid #2d2d44", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#e5e7eb" }}
                  formatter={(v: number) => [`$${Math.abs(v).toLocaleString()}`]}
                />
                <Bar dataKey="newBiz" fill={indigo} name="New Business" radius={[2, 2, 0, 0]} stackId="a" />
                <Bar dataKey="expansion" fill={emerald} name="Expansion" radius={[2, 2, 0, 0]} stackId="a" />
                <Bar dataKey="churn" fill={rose} name="Churn" radius={[0, 0, 2, 2]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: indigo }} />New Business</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: emerald }} />Expansion</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: rose }} />Churn</span>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Plan */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Revenue by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={revenueByPlan} cx="50%" cy="50%" innerRadius={42} outerRadius={64} dataKey="value" strokeWidth={0}>
                  {revenueByPlan.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#1c1c2e", border: "1px solid #2d2d44", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {revenueByPlan.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    <span className="text-muted-foreground">{p.name}</span>
                  </span>
                  <span className="font-medium text-foreground">${p.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue breakdown table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">Monthly Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Month", "MRR", "New Biz", "Expansion", "Churn", "Net Change"].map((h) => (
                  <th key={h} className={`py-3 px-6 text-xs font-medium text-muted-foreground ${h === "Month" ? "text-left" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mrrData.map((row, i) => {
                const net = row.newBiz + row.expansion + row.churn
                return (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 text-xs font-medium text-foreground">{row.month}</td>
                    <td className="px-6 py-3 text-xs text-right text-foreground font-medium">${row.mrr.toLocaleString()}</td>
                    <td className="px-6 py-3 text-xs text-right text-chart-2">+${row.newBiz.toLocaleString()}</td>
                    <td className="px-6 py-3 text-xs text-right text-chart-2">+${row.expansion.toLocaleString()}</td>
                    <td className="px-6 py-3 text-xs text-right text-chart-4">${row.churn.toLocaleString()}</td>
                    <td className="px-6 py-3 text-xs text-right">
                      <span className={net >= 0 ? "text-chart-2" : "text-chart-4"}>
                        {net >= 0 ? "+" : ""}${net.toLocaleString()}
                      </span>
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
