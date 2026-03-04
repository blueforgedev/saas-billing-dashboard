"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertTriangle, Info, XCircle, Check, Trash2, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

type NotifType = "success" | "warning" | "error" | "info"

interface Notification {
  id: number
  type: NotifType
  title: string
  description: string
  time: string
  read: boolean
  category: string
}

const notifications: Notification[] = [
  { id: 1, type: "success", title: "Payment received", description: "Acme Corp paid invoice INV-2025-0124 for $2,400.00", time: "2 min ago", read: false, category: "Billing" },
  { id: 2, type: "warning", title: "Payment past due", description: "Hooli's payment for INV-2025-0120 is 4 days overdue", time: "18 min ago", read: false, category: "Billing" },
  { id: 3, type: "error", title: "Payment failed", description: "Charge to Pied Piper failed — card declined", time: "1 hr ago", read: false, category: "Billing" },
  { id: 4, type: "info", title: "New subscription", description: "Bluth Company upgraded from Starter to Pro plan", time: "2 hr ago", read: false, category: "Subscriptions" },
  { id: 5, type: "success", title: "Subscription renewed", description: "Wayne Enterprises renewed their Starter plan for another month", time: "3 hr ago", read: true, category: "Subscriptions" },
  { id: 6, type: "warning", title: "Trial expiring soon", description: "Dunder Mifflin trial ends in 3 days — no payment method added", time: "5 hr ago", read: true, category: "Subscriptions" },
  { id: 7, type: "info", title: "New customer", description: "Cyberdyne Systems signed up for an Enterprise trial", time: "8 hr ago", read: true, category: "Customers" },
  { id: 8, type: "error", title: "Webhook failed", description: "POST to https://api.acme.com/webhooks returned 500", time: "12 hr ago", read: true, category: "System" },
  { id: 9, type: "success", title: "MRR milestone", description: "Monthly recurring revenue crossed $80,000 for the first time", time: "1 day ago", read: true, category: "Revenue" },
  { id: 10, type: "info", title: "Report ready", description: "Your December 2025 billing report has been generated", time: "2 days ago", read: true, category: "System" },
]

const typeConfig: Record<NotifType, { icon: React.ElementType; iconClass: string; dotClass: string }> = {
  success: { icon: CheckCircle, iconClass: "text-chart-2", dotClass: "bg-chart-2" },
  warning: { icon: AlertTriangle, iconClass: "text-chart-3", dotClass: "bg-chart-3" },
  error: { icon: XCircle, iconClass: "text-chart-4", dotClass: "bg-chart-4" },
  info: { icon: Info, iconClass: "text-primary", dotClass: "bg-primary" },
}

const categories = ["All", "Billing", "Subscriptions", "Customers", "Revenue", "System"]

export function NotificationsPage() {
  const [items, setItems] = useState(notifications)
  const [activeCategory, setActiveCategory] = useState("All")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const unreadCount = items.filter((n) => !n.read).length

  const filtered = items.filter((n) => {
    const matchCat = activeCategory === "All" || n.category === activeCategory
    const matchUnread = !showUnreadOnly || !n.read
    return matchCat && matchUnread
  })

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  const markRead = (id: number) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  const dismiss = (id: number) => setItems((prev) => prev.filter((n) => n.id !== id))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Notifications</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Stay on top of billing events and system alerts</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-chart-4 text-white text-xs">{unreadCount} unread</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5 border-border"
            onClick={markAllRead}
          >
            <Check className="w-3.5 h-3.5" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border">
            <Settings className="w-3.5 h-3.5" />
            Preferences
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ul className="space-y-0.5">
                {categories.map((cat) => {
                  const count = cat === "All" ? items.length : items.filter((n) => n.category === cat).length
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors",
                          activeCategory === cat
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span>{cat}</span>
                        <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full">{count}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-4 pb-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-medium text-foreground">Unread only</span>
                <button
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                  className={cn(
                    "w-9 h-5 rounded-full transition-colors relative",
                    showUnreadOnly ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                      showUnreadOnly ? "left-4" : "left-0.5"
                    )}
                  />
                </button>
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Notifications list */}
        <div className="lg:col-span-3 space-y-2">
          {filtered.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
                <Bell className="w-10 h-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">No notifications found</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((notif) => {
              const cfg = typeConfig[notif.type]
              return (
                <div
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg border transition-colors group",
                    notif.read
                      ? "bg-card border-border"
                      : "bg-card border-border border-l-2 border-l-primary"
                  )}
                >
                  <div className={cn("mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center", `bg-${notif.type === "success" ? "chart-2" : notif.type === "warning" ? "chart-3" : notif.type === "error" ? "chart-4" : "primary"}/10`)}>
                    <cfg.icon className={cn("w-4 h-4", cfg.iconClass)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={cn("text-sm font-medium", notif.read ? "text-foreground" : "text-foreground")}>{notif.title}</p>
                          {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                          <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">{notif.category}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        {!notif.read && (
                          <button
                            onClick={() => markRead(notif.id)}
                            className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        )}
                        <button
                          onClick={() => dismiss(notif.id)}
                          className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
                          title="Dismiss"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">{notif.time}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
