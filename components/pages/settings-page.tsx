"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  User, Building2, CreditCard, Bell, Shield, Key, Webhook, Globe, Palette,
} from "lucide-react"

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn("w-9 h-5 rounded-full transition-colors relative flex-shrink-0", checked ? "bg-primary" : "bg-muted")}
    >
      <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform", checked ? "left-4" : "left-0.5")} />
    </button>
  )
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex-1 pr-8">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const [notifToggles, setNotifToggles] = useState({
    paymentReceived: true,
    paymentFailed: true,
    newSubscription: true,
    churn: true,
    mrrMilestone: false,
    weeklyReport: true,
    monthlyReport: true,
    securityAlerts: true,
  })

  const toggle = (key: keyof typeof notifToggles) =>
    setNotifToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  const apiKeys = [
    { name: "Production Key", key: "bf_live_••••••••••••••••xZ8q", created: "Jan 12, 2026", lastUsed: "2 min ago" },
    { name: "Test Key", key: "bf_test_••••••••••••••••mK3p", created: "Nov 4, 2025", lastUsed: "3 days ago" },
  ]

  const webhooks = [
    { url: "https://api.acme.com/webhooks/billing", events: ["payment.succeeded", "payment.failed"], status: "Active", lastDelivery: "2 min ago" },
    { url: "https://hooks.slack.com/services/T00/B00/xxx", events: ["subscription.created", "subscription.cancelled"], status: "Active", lastDelivery: "1 hr ago" },
    { url: "https://crm.globex.com/api/hooks", events: ["customer.created"], status: "Failing", lastDelivery: "2 days ago" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Manage your account, billing, and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-0.5">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Profile */}
          {activeTab === "profile" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-foreground">Profile Information</CardTitle>
                <CardDescription className="text-xs">Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground">JD</div>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-border">Change Photo</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">First Name</label>
                    <Input defaultValue="John" className="h-8 text-xs bg-muted border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Last Name</label>
                    <Input defaultValue="Doe" className="h-8 text-xs bg-muted border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Email</label>
                    <Input defaultValue="john@billflow.io" className="h-8 text-xs bg-muted border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Role</label>
                    <Input defaultValue="Admin" disabled className="h-8 text-xs bg-muted border-border opacity-60" />
                  </div>
                </div>
                <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* Organization */}
          {activeTab === "organization" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-foreground">Organization Settings</CardTitle>
                <CardDescription className="text-xs">Manage your company details and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Company Name</label>
                    <Input defaultValue="BillFlow Inc." className="h-8 text-xs bg-muted border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Website</label>
                    <Input defaultValue="https://billflow.io" className="h-8 text-xs bg-muted border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Industry</label>
                    <Input defaultValue="SaaS / Software" className="h-8 text-xs bg-muted border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Timezone</label>
                    <Input defaultValue="America/New_York (EST)" className="h-8 text-xs bg-muted border-border" />
                  </div>
                </div>
                <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* Billing */}
          {activeTab === "billing" && (
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-foreground">Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Growth Plan</p>
                      <p className="text-xs text-muted-foreground mt-0.5">$199/month — up to 5,000 customers</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs border-border">Upgrade</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-foreground">Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <SettingRow label="Visa ending in 4242" description="Expires 12/2027">
                    <Button variant="outline" size="sm" className="h-8 text-xs border-border">Update</Button>
                  </SettingRow>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-foreground">Notification Preferences</CardTitle>
                <CardDescription className="text-xs">Choose which events trigger email and in-app notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-2">Billing</p>
                <SettingRow label="Payment received" description="When a customer successfully pays an invoice">
                  <Toggle checked={notifToggles.paymentReceived} onChange={() => toggle("paymentReceived")} />
                </SettingRow>
                <SettingRow label="Payment failed" description="When a charge fails or a card is declined">
                  <Toggle checked={notifToggles.paymentFailed} onChange={() => toggle("paymentFailed")} />
                </SettingRow>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-4 mb-2">Subscriptions</p>
                <SettingRow label="New subscription" description="When a customer subscribes or upgrades">
                  <Toggle checked={notifToggles.newSubscription} onChange={() => toggle("newSubscription")} />
                </SettingRow>
                <SettingRow label="Churn / cancellation" description="When a customer cancels or downgrades">
                  <Toggle checked={notifToggles.churn} onChange={() => toggle("churn")} />
                </SettingRow>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-4 mb-2">Reports</p>
                <SettingRow label="Weekly summary" description="Receive a weekly digest of billing activity">
                  <Toggle checked={notifToggles.weeklyReport} onChange={() => toggle("weeklyReport")} />
                </SettingRow>
                <SettingRow label="Monthly report" description="Receive a detailed monthly billing report">
                  <Toggle checked={notifToggles.monthlyReport} onChange={() => toggle("monthlyReport")} />
                </SettingRow>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-4 mb-2">Security</p>
                <SettingRow label="Security alerts" description="Login from a new device or location">
                  <Toggle checked={notifToggles.securityAlerts} onChange={() => toggle("securityAlerts")} />
                </SettingRow>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-foreground">Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Current Password</label>
                    <Input type="password" placeholder="••••••••" className="h-8 text-xs bg-muted border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">New Password</label>
                    <Input type="password" placeholder="••••••••" className="h-8 text-xs bg-muted border-border" />
                  </div>
                  <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">Update Password</Button>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-foreground">Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <SettingRow label="Authenticator App" description="Use an authenticator app for 2FA">
                    <Badge className="bg-chart-2/10 text-chart-2 text-xs">Enabled</Badge>
                  </SettingRow>
                  <SettingRow label="SMS Backup" description="+1 (555) 000-0000">
                    <Button variant="outline" size="sm" className="h-7 text-xs border-border">Configure</Button>
                  </SettingRow>
                </CardContent>
              </Card>
            </div>
          )}

          {/* API Keys */}
          {activeTab === "api" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold text-foreground">API Keys</CardTitle>
                    <CardDescription className="text-xs mt-0.5">Manage keys for programmatic access to BillFlow</CardDescription>
                  </div>
                  <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">Generate Key</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Name", "Key", "Created", "Last Used", ""].map((h) => (
                        <th key={h} className="py-3 px-6 text-left text-xs font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((k) => (
                      <tr key={k.name} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-6 py-3 text-xs font-medium text-foreground">{k.name}</td>
                        <td className="px-6 py-3 text-xs font-mono text-muted-foreground">{k.key}</td>
                        <td className="px-6 py-3 text-xs text-muted-foreground">{k.created}</td>
                        <td className="px-6 py-3 text-xs text-muted-foreground">{k.lastUsed}</td>
                        <td className="px-6 py-3">
                          <Button variant="outline" size="sm" className="h-7 text-xs border-border text-chart-4 border-chart-4/20 hover:bg-chart-4/5">Revoke</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Webhooks */}
          {activeTab === "webhooks" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold text-foreground">Webhooks</CardTitle>
                    <CardDescription className="text-xs mt-0.5">Send real-time event notifications to external endpoints</CardDescription>
                  </div>
                  <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">Add Endpoint</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {webhooks.map((w, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-primary truncate">{w.url}</p>
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {w.events.map((e) => (
                            <span key={e} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">{e}</span>
                          ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2">Last delivery: {w.lastDelivery}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", w.status === "Active" ? "bg-chart-2/10 text-chart-2" : "bg-chart-4/10 text-chart-4")}>{w.status}</span>
                        <Button variant="outline" size="sm" className="h-7 text-xs border-border">Edit</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
