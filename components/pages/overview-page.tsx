import { StatCards } from "@/components/dashboard/stat-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { SubscriptionChart } from "@/components/dashboard/subscription-chart"
import { ChurnChart } from "@/components/dashboard/churn-chart"
import { InvoicesTable } from "@/components/dashboard/invoices-table"
import { TopCustomers } from "@/components/dashboard/top-customers"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { UsageMetrics } from "@/components/dashboard/usage-metrics"

export function OverviewPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Billing Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Welcome back, John. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-chart-2 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-chart-2 animate-pulse" />
          Live data
        </span>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2"><RevenueChart /></div>
        <div><SubscriptionChart /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2"><ChurnChart /></div>
        <div><UsageMetrics /></div>
      </div>

      <div className="mt-4"><InvoicesTable /></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <TopCustomers />
        <ActivityFeed />
      </div>
    </div>
  )
}
