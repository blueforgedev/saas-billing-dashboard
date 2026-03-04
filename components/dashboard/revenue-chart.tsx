"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const monthlyData = [
  { month: "Jan", mrr: 58000, arr: 62000, newRevenue: 8200 },
  { month: "Feb", mrr: 61500, arr: 65000, newRevenue: 9100 },
  { month: "Mar", mrr: 64000, arr: 67500, newRevenue: 7800 },
  { month: "Apr", mrr: 67200, arr: 71000, newRevenue: 10400 },
  { month: "May", mrr: 70100, arr: 74200, newRevenue: 9600 },
  { month: "Jun", mrr: 72400, arr: 76800, newRevenue: 8900 },
  { month: "Jul", mrr: 75300, arr: 79500, newRevenue: 11200 },
  { month: "Aug", mrr: 77900, arr: 82100, newRevenue: 10800 },
  { month: "Sep", mrr: 79500, arr: 84000, newRevenue: 9300 },
  { month: "Oct", mrr: 81200, arr: 85900, newRevenue: 10100 },
  { month: "Nov", mrr: 83100, arr: 87600, newRevenue: 11500 },
  { month: "Dec", mrr: 84320, arr: 89100, newRevenue: 12400 },
]

const ranges = ["3M", "6M", "1Y"] as const
type Range = typeof ranges[number]

const rangeSlice: Record<Range, number> = {
  "3M": 3,
  "6M": 6,
  "1Y": 12,
}

const COLORS = {
  mrr: "#7c6ff1",
  arr: "#4ade80",
  newRevenue: "#fb923c",
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-xl text-xs">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name.toUpperCase()}:</span>
            <span className="font-semibold text-foreground">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function RevenueChart() {
  const [range, setRange] = useState<Range>("1Y")
  const data = monthlyData.slice(-rangeSlice[range])

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold text-foreground">Revenue Overview</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">MRR, ARR & New Revenue trends</p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                range === r
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.mrr} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.mrr} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.arr} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.arr} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="newRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.newRevenue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.newRevenue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.015 240)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "oklch(0.55 0.01 240)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "oklch(0.55 0.01 240)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                width={42}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="mrr"
                name="MRR"
                stroke={COLORS.mrr}
                strokeWidth={2}
                fill="url(#mrrGrad)"
              />
              <Area
                type="monotone"
                dataKey="arr"
                name="ARR"
                stroke={COLORS.arr}
                strokeWidth={2}
                fill="url(#arrGrad)"
              />
              <Area
                type="monotone"
                dataKey="newRevenue"
                name="New Revenue"
                stroke={COLORS.newRevenue}
                strokeWidth={2}
                fill="url(#newRevGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-3">
          {[
            { label: "MRR", color: COLORS.mrr, value: "$84.3k" },
            { label: "ARR", color: COLORS.arr, value: "$89.1k" },
            { label: "New Revenue", color: COLORS.newRevenue, value: "$12.4k" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-xs font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
