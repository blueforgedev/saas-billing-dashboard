import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, CreditCard, AlertTriangle, RefreshCw, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const events = [
  {
    icon: UserPlus,
    title: "New subscription",
    desc: "Acme Corp upgraded to Enterprise",
    time: "2 min ago",
    type: "success",
  },
  {
    icon: CreditCard,
    title: "Payment received",
    desc: "$890.00 from TechStart Inc",
    time: "18 min ago",
    type: "success",
  },
  {
    icon: AlertTriangle,
    title: "Payment failed",
    desc: "Bright Labs — card declined",
    time: "1 hr ago",
    type: "warning",
  },
  {
    icon: RefreshCw,
    title: "Plan renewed",
    desc: "CloudBase AI — Pro plan",
    time: "3 hr ago",
    type: "info",
  },
  {
    icon: XCircle,
    title: "Subscription cancelled",
    desc: "DevOps Hub — Starter plan",
    time: "5 hr ago",
    type: "danger",
  },
  {
    icon: CreditCard,
    title: "Payment received",
    desc: "$4,200.00 from Orbit Systems",
    time: "8 hr ago",
    type: "success",
  },
]

const typeStyles = {
  success: { icon: "text-chart-2", dot: "bg-chart-2", wrap: "bg-chart-2/10" },
  warning: { icon: "text-chart-3", dot: "bg-chart-3", wrap: "bg-chart-3/10" },
  info: { icon: "text-chart-1", dot: "bg-chart-1", wrap: "bg-chart-1/10" },
  danger: { icon: "text-destructive", dot: "bg-destructive", wrap: "bg-destructive/10" },
}

export function ActivityFeed() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Recent Activity</CardTitle>
        <p className="text-xs text-muted-foreground">Live billing events</p>
      </CardHeader>
      <CardContent className="space-y-1">
        {events.map((event, i) => {
          const styles = typeStyles[event.type as keyof typeof typeStyles]
          return (
            <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", styles.wrap)}>
                <event.icon className={cn("w-4 h-4", styles.icon)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="text-[11px] text-muted-foreground truncate">{event.desc}</p>
              </div>
              <span className="text-[10px] text-muted-foreground flex-shrink-0 pt-0.5">{event.time}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
