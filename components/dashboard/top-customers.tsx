import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const customers = [
  { name: "Acme Corp", plan: "Enterprise", mrr: "$4,200", growth: "+8.2%", up: true, initials: "AC", color: "bg-chart-1/20 text-chart-1" },
  { name: "TechStart Inc", plan: "Pro", mrr: "$890", growth: "+2.1%", up: true, initials: "TI", color: "bg-chart-2/20 text-chart-2" },
  { name: "Nexus Digital", plan: "Enterprise", mrr: "$4,200", growth: "+15.3%", up: true, initials: "ND", color: "bg-chart-5/20 text-chart-5" },
  { name: "CloudBase AI", plan: "Pro", mrr: "$890", growth: "-1.2%", up: false, initials: "CA", color: "bg-chart-3/20 text-chart-3" },
  { name: "Orbit Systems", plan: "Enterprise", mrr: "$4,200", growth: "+6.8%", up: true, initials: "OS", color: "bg-chart-4/20 text-chart-4" },
]

export function TopCustomers() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Top Customers</CardTitle>
        <p className="text-xs text-muted-foreground">By monthly recurring revenue</p>
      </CardHeader>
      <CardContent className="space-y-1">
        {customers.map((c, i) => (
          <div
            key={c.name}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
          >
            <span className="text-xs text-muted-foreground w-4 flex-shrink-0">{i + 1}</span>
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0", c.color)}>
              {c.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">{c.plan}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-foreground">{c.mrr}</p>
              <p className={cn("text-[11px] font-medium", c.up ? "text-chart-2" : "text-destructive")}>
                {c.growth}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
