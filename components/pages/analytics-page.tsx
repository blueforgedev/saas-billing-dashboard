"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Area, AreaChart, Bar, BarChart, Line, LineChart,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Users, MousePointerClick, Eye, Clock } from "lucide-react"

const sessionData = [
  { month: "Jul", sessions: 18400, pageviews: 52000, conversions: 820 },
  { month: "Aug", sessions: 21200, pageviews: 61000, conversions: 940 },
  { month: "Sep", sessions: 19800, pageviews: 57000, conversions: 870 },
  { month: "Oct", sessions: 24600, pageviews: 71000, conversions: 1100 },
  { month: "Nov", sessions: 23100, pageviews: 68000, conversions: 1050 },
  { month: "Dec", sessions: 27800, pageviews: 82000, conversions: 1320 },
  { month: "Jan", sessions: 26400, pageviews: 78000, conversions: 1210 },
]

const channelData = [
  { channel: "Organic", users: 12400, revenue: 48200 },
  { channel: "Paid", users: 8200, revenue: 36100 },
  { channel: "Referral", users: 5600, revenue: 22800 },
  { channel: "Email", users: 4100, revenue: 18400 },
  { channel: "Social", users: 2900, revenue: 11200 },
  { channel: "Direct", users: 3700, revenue: 15600 },
]

const retentionData = [
  { week: "Wk 1", d1: 100, d7: 62, d30: 38 },
  { week: "Wk 2", d1: 100, d7: 59, d30: 35 },
  { week: "Wk 3", d1: 100, d7: 64, d30: 41 },
  { week: "Wk 4", d1: 100, d7: 61, d30: 39 },
  { week: "Wk 5", d1: 100, d7: 67, d30: 44 },
  { week: "Wk 6", d1: 100, d7: 63, d30: 40 },
]

const metricCards = [
  { label: "Total Sessions", value: "27,843", change: "+12.4%", up: true, icon: Users },
  { label: "Avg. Session Duration", value: "4m 32s", change: "+8.1%", up: true, icon: Clock },
  { label: "Bounce Rate", value: "34.2%", change: "-3.6%", up: true, icon: MousePointerClick },
  { label: "Page Views", value: "82,190", change: "+18.7%", up: true, icon: Eye },
]

const ranges = ["7D", "30D", "90D", "1Y"]

const indigo = "#6366f1"
const emerald = "#34d399"
const amber = "#fbbf24"
const rose = "#f87171"

export function AnalyticsPage() {
  const [range, setRange] = useState("30D")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Analytics</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Traffic, engagement, and conversion insights</p>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                range === r
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((m) => (
          <Card key={m.label} className="bg-card border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{m.value}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <m.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {m.up ? (
                  <TrendingUp className="w-3 h-3 text-chart-2" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-chart-4" />
                )}
                <span className={`text-xs font-medium ${m.up ? "text-chart-2" : "text-chart-4"}`}>
                  {m.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sessions & Conversions Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground">Sessions & Conversions</CardTitle>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: indigo }} />Sessions</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: emerald }} />Conversions</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={sessionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={indigo} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={indigo} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={emerald} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={emerald} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1c1c2e", border: "1px solid #2d2d44", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#e5e7eb" }}
              />
              <Area type="monotone" dataKey="sessions" stroke={indigo} strokeWidth={2} fill="url(#gradSessions)" />
              <Area type="monotone" dataKey="conversions" stroke={emerald} strokeWidth={2} fill="url(#gradConversions)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Acquisition channels */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Acquisition Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 4, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="channel" type="category" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} width={50} />
                <Tooltip
                  contentStyle={{ background: "#1c1c2e", border: "1px solid #2d2d44", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Bar dataKey="users" fill={indigo} radius={[0, 4, 4, 0]} name="Users" />
                <Bar dataKey="revenue" fill={amber} radius={[0, 4, 4, 0]} name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Retention */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-foreground">User Retention</CardTitle>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: indigo }} />Day 1</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: emerald }} />Day 7</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: rose }} />Day 30</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={retentionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ background: "#1c1c2e", border: "1px solid #2d2d44", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#e5e7eb" }}
                  formatter={(v) => [`${v}%`]}
                />
                <Line type="monotone" dataKey="d1" stroke={indigo} strokeWidth={2} dot={false} name="Day 1" />
                <Line type="monotone" dataKey="d7" stroke={emerald} strokeWidth={2} dot={false} name="Day 7" />
                <Line type="monotone" dataKey="d30" stroke={rose} strokeWidth={2} dot={false} name="Day 30" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">Top Pages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">Page</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground">Views</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground">Unique</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground">Bounce</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { page: "/dashboard", views: "14,820", unique: "9,241", bounce: "21%", time: "5m 12s" },
                { page: "/pricing", views: "9,340", unique: "7,820", bounce: "42%", time: "2m 48s" },
                { page: "/features", views: "7,190", unique: "5,600", bounce: "36%", time: "3m 22s" },
                { page: "/signup", views: "5,820", unique: "5,200", bounce: "18%", time: "1m 55s" },
                { page: "/blog/saas-tips", views: "4,410", unique: "3,980", bounce: "55%", time: "4m 07s" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-primary">{row.page}</td>
                  <td className="px-6 py-3 text-right text-xs text-foreground">{row.views}</td>
                  <td className="px-6 py-3 text-right text-xs text-muted-foreground">{row.unique}</td>
                  <td className="px-6 py-3 text-right text-xs text-muted-foreground">{row.bounce}</td>
                  <td className="px-6 py-3 text-right text-xs text-foreground">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
