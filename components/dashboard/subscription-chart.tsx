"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Enterprise", value: 842, color: "#7c6ff1" },
  { name: "Pro", value: 1203, color: "#4ade80" },
  { name: "Starter", value: 628, color: "#fb923c" },
  { name: "Free Trial", value: 174, color: "#60a5fa" },
]

const total = data.reduce((sum, d) => sum + d.value, 0)

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0]
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-xl text-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: item.payload.color }} />
          <span className="font-semibold text-foreground">{item.name}</span>
        </div>
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span> subscribers
        </p>
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{((item.value / total) * 100).toFixed(1)}%</span> of total
        </p>
      </div>
    )
  }
  return null
}

export function SubscriptionChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Subscription Mix</CardTitle>
        <p className="text-xs text-muted-foreground">By plan tier</p>
      </CardHeader>
      <CardContent>
        <div className="relative h-52 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold text-foreground">{total.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
        <div className="space-y-2 mt-1">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span className="text-xs text-muted-foreground flex-1">{item.name}</span>
              <span className="text-xs font-semibold text-foreground">{item.value.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground w-10 text-right">
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
