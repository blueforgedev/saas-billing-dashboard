"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Search, BookOpen, MessageCircle, Video, ChevronDown, ChevronRight,
  ExternalLink, Zap, LifeBuoy, FileText, ArrowRight,
} from "lucide-react"

const faqs = [
  {
    question: "How do I add a new customer and subscription?",
    answer: "Navigate to Customers and click 'Add Customer'. Fill in their details and assign a subscription plan. You can also create a subscription directly from the Subscriptions page.",
  },
  {
    question: "How do I generate and send an invoice?",
    answer: "Go to Invoices > New Invoice. Select the customer, add line items, set the due date, and click 'Send'. Customers receive an email with a payment link.",
  },
  {
    question: "What payment methods are supported?",
    answer: "BillFlow supports Visa, Mastercard, Amex, Discover, ACH bank transfers, and SEPA direct debit. Payment methods are processed via Stripe.",
  },
  {
    question: "How does MRR get calculated?",
    answer: "Monthly Recurring Revenue (MRR) is calculated as the sum of all active subscription values normalized to a monthly period. Annual plans are divided by 12.",
  },
  {
    question: "Can I set up automatic retries for failed payments?",
    answer: "Yes. Under Settings > Billing, you can configure a dunning schedule — BillFlow will automatically retry failed charges at intervals you define (1, 3, 7, and 14 days by default).",
  },
  {
    question: "How do I export billing data?",
    answer: "Every table on the Invoices and Payments pages has an 'Export CSV' button. You can also generate full reports from the Revenue page.",
  },
]

const guides = [
  { title: "Getting Started Guide", desc: "Set up your account and first subscription in minutes", icon: Zap, badge: "New" },
  { title: "Invoice Automation", desc: "Automate recurring invoices and payment reminders", icon: FileText, badge: null },
  { title: "Webhook Integration", desc: "Connect BillFlow to your stack with real-time webhooks", icon: LifeBuoy, badge: null },
  { title: "Revenue Recognition", desc: "Set up compliant revenue recognition for your plans", icon: BookOpen, badge: "Popular" },
]

const tickets = [
  { id: "#5521", subject: "Can't update payment method for Acme Corp", status: "Open", updated: "2 hr ago", priority: "High" },
  { id: "#5498", subject: "Invoice not sent after creation", status: "Resolved", updated: "2 days ago", priority: "Medium" },
  { id: "#5471", subject: "Webhook events not firing on plan upgrade", status: "In Progress", updated: "4 days ago", priority: "High" },
]

export function HelpPage() {
  const [search, setSearch] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Help & Support</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Find answers, guides, and contact our support team</p>
      </div>

      {/* Search hero */}
      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
        <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4">
          <h2 className="text-lg font-bold text-foreground text-center text-balance">How can we help you?</h2>
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search docs, guides, FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 text-sm bg-card border-border w-full"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap justify-center">
            {["Getting started", "Invoices", "Payments", "Webhooks", "API"].map((tag) => (
              <button key={tag} onClick={() => setSearch(tag)} className="hover:text-primary transition-colors">{tag}</button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Contact options */}
        {[
          { icon: MessageCircle, label: "Live Chat", desc: "Chat with our team. Usually replies in under 5 minutes.", action: "Start Chat", color: "text-chart-2", bg: "bg-chart-2/10" },
          { icon: BookOpen, label: "Documentation", desc: "Browse comprehensive guides and API references.", action: "Open Docs", color: "text-primary", bg: "bg-primary/10" },
          { icon: Video, label: "Video Tutorials", desc: "Step-by-step video guides for common workflows.", action: "Watch Now", color: "text-chart-3", bg: "bg-chart-3/10" },
        ].map((c) => (
          <Card key={c.label} className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer group">
            <CardContent className="pt-5 pb-5">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", c.bg)}>
                <c.icon className={cn("w-5 h-5", c.color)} />
              </div>
              <p className="text-sm font-semibold text-foreground">{c.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
              <button className={cn("flex items-center gap-1 text-xs font-medium mt-3 transition-colors", c.color)}>
                {c.action}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {filteredFaqs.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-8 text-center text-xs text-muted-foreground">No results for "{search}"</CardContent>
              </Card>
            ) : (
              filteredFaqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-xs font-medium text-foreground pr-4">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 border-t border-border">
                      <p className="text-xs text-muted-foreground leading-relaxed pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Popular guides */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Popular Guides</h2>
            <div className="space-y-2">
              {guides.map((g, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <g.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-foreground">{g.title}</p>
                      {g.badge && (
                        <Badge className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary">{g.badge}</Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{g.desc}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Support tickets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Recent Support Tickets</h2>
              <Button size="sm" className="h-7 text-xs bg-primary text-primary-foreground">New Ticket</Button>
            </div>
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                {tickets.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">{t.id}</span>
                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                          t.priority === "High" ? "bg-chart-4/10 text-chart-4" : "bg-chart-3/10 text-chart-3"
                        )}>{t.priority}</span>
                      </div>
                      <p className="text-xs font-medium text-foreground mt-0.5 truncate max-w-[260px]">{t.subject}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Updated {t.updated}</p>
                    </div>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0",
                      t.status === "Open" ? "bg-primary/10 text-primary" :
                      t.status === "In Progress" ? "bg-chart-3/10 text-chart-3" :
                      "bg-chart-2/10 text-chart-2"
                    )}>{t.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
