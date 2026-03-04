"use client"

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  { name: "API Calls", used: 8_420_000, limit: 10_000_000, unit: "M", color: "#7c6ff1" },
  { name: "Storage", used: 342, limit: 500, unit: "GB", color: "#4ade80" },
  { name: "Active Users", used: 2847, limit: 5000, unit: "", color: "#fb923c" },
]

function formatNum(n: number, unit: string) {
  if (unit === "M") return `${(n / 1_000_000).toFixed(1)}M`
  return `${n.toLocaleString()}${unit ? " " + unit : ""}`
}

export function UsageMetrics() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Usage Overview</CardTitle>
        <p className="text-xs text-muted-foreground">Current billing period</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((m) => {
          const pct = Math.round((m.used / m.limit) * 100)
          const radialData = [{ value: pct, fill: m.color }]
          return (
            <div key={m.name} className="flex items-center gap-4">
              <div className="w-14 h-14 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="65%"
                    outerRadius="100%"
                    barSize={6}
                    data={radialData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={4}
                      background={{ fill: "oklch(0.22 0.015 240)" }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <span className="text-xs font-bold" style={{ color: m.color }}>{pct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: m.color }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {formatNum(m.used, m.unit)} of {formatNum(m.limit, m.unit)}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
