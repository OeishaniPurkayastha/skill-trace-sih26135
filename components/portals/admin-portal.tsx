'use client'

import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Lock,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { KpiCard } from '@/components/kpi-card'
import {
  flaggedProviders,
  providerIndex,
  retentionTimeline,
  verificationSources,
} from '@/lib/data'
import { cn } from '@/lib/utils'

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-2 text-muted-foreground">
          <span className="size-2 rounded-full" style={{ background: p.color || p.fill }} />
          {p.name}: <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function AdminPortal() {
  const [audited, setAudited] = useState<string[]>([])
  const [frozen, setFrozen] = useState<string[]>([])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          National Outcome Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time longitudinal tracking of skilling outcomes across certified candidates and providers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Certified Candidates"
          value="1,42,850"
          delta="+4.2%"
          hint="Across 312 empanelled providers"
          icon={Users}
        />
        <KpiCard
          label="12-Month Job Retention (EPFO verified)"
          value="68.4%"
          delta="+2.1%"
          hint="Verified via passive EPFO registry match"
          icon={BadgeCheck}
          iconTone="success"
        />
        <KpiCard
          label="Average Wage Growth"
          value="+22.5%"
          delta="+3.8%"
          hint="Month 0 to Month 24 median wage"
          icon={TrendingUp}
          iconTone="success"
        />
        <KpiCard
          label="Fraud / Anomaly Alerts"
          value="3"
          delta="+1"
          deltaTone="down"
          hint="Suspicious providers flagged this cycle"
          icon={AlertTriangle}
          iconTone="danger"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>24-Month Longitudinal Career & Wage Progression</CardTitle>
            <CardDescription>
              Retention rate (%) vs. indexed median wage across the tracked cohort.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionTimeline} margin={{ left: -16, right: 8, top: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    name="Retention %"
                    stroke="var(--chart-1)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'var(--chart-1)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wage"
                    name="Wage Index"
                    stroke="var(--chart-2)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'var(--chart-2)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-chart-1" /> Retention %
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-chart-2" /> Wage Index
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Provider Pay-for-Success Index</CardTitle>
            <CardDescription>30% completion · 40% verified placement · 30% retention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={providerIndex} layout="vertical" margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={78} tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--muted)' }} />
                  <Bar dataKey="score" name="Composite score" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-destructive" />
              Fraud & Anomaly Detection
            </CardTitle>
            <CardDescription>Providers flagged by the longitudinal anomaly engine.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {flaggedProviders.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{p.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{p.id}</span>
                    <Badge variant={p.level === 'High' ? 'danger' : 'warning'}>
                      {p.risk}% risk · {p.level}
                    </Badge>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{p.reason}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={audited.includes(p.id) ? 'secondary' : 'outline'}
                    onClick={() =>
                      setAudited((a) => (a.includes(p.id) ? a : [...a, p.id]))
                    }
                  >
                    <Search /> {audited.includes(p.id) ? 'Audit Initiated' : 'Audit Provider'}
                  </Button>
                  <Button
                    size="sm"
                    variant={frozen.includes(p.id) ? 'secondary' : 'destructive'}
                    onClick={() =>
                      setFrozen((f) => (f.includes(p.id) ? f.filter((x) => x !== p.id) : [...f, p.id]))
                    }
                  >
                    {frozen.includes(p.id) ? <Lock /> : <Banknote />}
                    {frozen.includes(p.id) ? 'Funds Frozen' : 'Freeze Funds'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Passive Registry Verification Tracker</CardTitle>
            <CardDescription>How outcomes are being verified this cycle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationSources.map((s) => (
              <div key={s.source}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{s.source}</span>
                  <span className="font-mono text-muted-foreground">{s.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      s.variant === 'success' && 'bg-success',
                      s.variant === 'info' && 'bg-info',
                      s.variant === 'default' && 'bg-primary',
                      s.variant === 'outline' && 'bg-muted-foreground/40',
                    )}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-muted/60 p-3 text-[11px] text-muted-foreground">
              82% of outcomes now verified through zero-effort passive registries, reducing manual survey load.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
