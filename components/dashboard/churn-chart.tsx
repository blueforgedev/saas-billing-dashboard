"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { month: "Jul", new: 312, churned: 48 },
  { month: "Aug", new: 289, churned: 52 },
  { month: "Sep", new: 341, churned: 39 },
  { month: "Oct", new: 378, churned: 61 },
  { month: "Nov", new: 402, churned: 44 },
  { month: "Dec", new: 425, churned: 37 },
]

const NEW_COLOR = "#4ade80"
const CHURN_COLOR = "#f87171"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-xl text-xs">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.fill }} />
            <span className="text-muted-foreground capitalize">{entry.name}:</span>
            <span className="font-semibold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function ChurnChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Growth vs Churn</CardTitle>
        <p className="text-xs text-muted-foreground">New subscribers vs churned (last 6 months)</p>
      </CardHeader>
      <CardContent>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={14} barGap={4} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
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
                width={32}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="new" name="New" fill={NEW_COLOR} radius={[4, 4, 0, 0]} />
              <Bar dataKey="churned" name="Churned" fill={CHURN_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: NEW_COLOR }} />
            <span className="text-xs text-muted-foreground">New subscribers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: CHURN_COLOR }} />
            <span className="text-xs text-muted-foreground">Churned</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
