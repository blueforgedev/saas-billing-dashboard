import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Monthly Recurring Revenue",
    value: "$84,320",
    change: "+12.5%",
    trend: "up",
    sub: "vs last month",
    icon: DollarSign,
    color: "text-chart-1",
    bg: "bg-chart-1/10",
  },
  {
    label: "Active Subscriptions",
    value: "2,847",
    change: "+4.2%",
    trend: "up",
    sub: "vs last month",
    icon: Users,
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    label: "Avg Revenue Per User",
    value: "$29.62",
    change: "+7.8%",
    trend: "up",
    sub: "vs last month",
    icon: CreditCard,
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    label: "Churn Rate",
    value: "2.14%",
    change: "+0.3%",
    trend: "down",
    sub: "vs last month",
    icon: AlertCircle,
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 truncate">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className={cn("w-3.5 h-3.5", stat.label === "Churn Rate" ? "text-destructive" : "text-chart-2")} />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      stat.label === "Churn Rate"
                        ? "text-destructive"
                        : stat.trend === "up"
                        ? "text-chart-2"
                        : "text-destructive"
                    )}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.sub}</span>
                </div>
              </div>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-3", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
