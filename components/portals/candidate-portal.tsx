'use client'

import { useState } from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import {
  BadgeCheck,
  Check,
  Fingerprint,
  MessageCircle,
  ShieldOff,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleSwitch } from '@/components/ui/toggle-switch'
import { WhatsAppDrawer } from '@/components/portals/whatsapp-drawer'
import {
  candidate,
  candidateMilestones,
  recommendedSkills,
  skillRadar,
} from '@/lib/data'
import { cn } from '@/lib/utils'

const initialConsents = {
  epfo: true,
  whatsapp: true,
  salary: false,
}

export function CandidatePortal() {
  const [chatOpen, setChatOpen] = useState(false)
  const [consents, setConsents] = useState(initialConsents)
  const [enrolled, setEnrolled] = useState<string[]>([])

  const allRevoked = !consents.epfo && !consents.whatsapp && !consents.salary

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Unified Skill Passport
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            One portable, verifiable record of your skilling journey and career outcomes.
          </p>
        </div>
        <Button onClick={() => setChatOpen(true)}>
          <MessageCircle /> Open WhatsApp Check-in
        </Button>
      </div>

      {/* Profile card */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border bg-primary/5 p-5 sm:flex-row sm:items-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
            {candidate.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">{candidate.name}</h2>
              <Badge variant="success">
                <BadgeCheck /> {candidate.status}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{candidate.course}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
          <div className="p-4">
            <p className="text-[11px] text-muted-foreground">Candidate Master ID</p>
            <p className="mt-0.5 font-mono text-sm font-medium text-foreground">{candidate.id}</p>
          </div>
          <div className="p-4">
            <p className="text-[11px] text-muted-foreground">Aadhaar</p>
            <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-success">
              <Fingerprint className="size-3.5" /> {candidate.aadhaar}
            </p>
          </div>
          <div className="p-4">
            <p className="text-[11px] text-muted-foreground">Training Provider</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{candidate.provider}</p>
          </div>
          <div className="p-4">
            <p className="text-[11px] text-muted-foreground">Verification</p>
            <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-foreground">
              <Badge variant="success">EPFO Verified</Badge>
            </p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Longitudinal Outcome Timeline</CardTitle>
          <CardDescription>Milestones tracked from certification through 24-month retention.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            {candidateMilestones.map((m, i) => (
              <div key={m.month} className="relative">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'flex size-7 items-center justify-center rounded-full text-xs font-semibold',
                      m.state === 'done'
                        ? 'bg-success text-success-foreground'
                        : 'border-2 border-dashed border-warning bg-warning/10 text-warning-foreground',
                    )}
                  >
                    {m.state === 'done' ? <Check className="size-4" /> : i + 1}
                  </span>
                  {i < candidateMilestones.length - 1 && (
                    <span className="hidden h-0.5 flex-1 bg-border sm:block" />
                  )}
                </div>
                <p className="mt-3 text-[11px] font-medium text-muted-foreground">{m.month}</p>
                <p className="text-sm font-semibold text-foreground">{m.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* DPDP consent */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Consent Center</CardTitle>
            <CardDescription>DPDP Act 2023 compliant — you control every data flow.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {[
              { key: 'epfo' as const, label: 'Share employment status with EPFO registry', desc: 'Enables passive retention verification' },
              { key: 'whatsapp' as const, label: 'Allow WhatsApp bot follow-ups', desc: 'Periodic outcome check-in messages' },
              { key: 'salary' as const, label: 'Share salary data with third parties', desc: 'Used for anonymised wage analytics' },
            ].map((c) => (
              <div
                key={c.key}
                className="flex items-center justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-muted/50"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </div>
                <ToggleSwitch
                  label={c.label}
                  checked={consents[c.key]}
                  onChange={(v) => setConsents((s) => ({ ...s, [c.key]: v }))}
                />
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 pt-3">
              <p className="text-[11px] text-muted-foreground">
                {allRevoked ? 'All permissions revoked — passive tracking paused.' : 'Consent log is auditable & timestamped.'}
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setConsents({ epfo: false, whatsapp: false, salary: false })}
              >
                <ShieldOff /> Revoke All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skill gap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" /> AI Skill-Gap Analysis
            </CardTitle>
            <CardDescription>Your skills vs. real-time market demand.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar} outerRadius="72%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Radar name="Your skills" dataKey="you" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.4} />
                  <Radar name="Market demand" dataKey="market" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {recommendedSkills.map((s) => (
                <div
                  key={s.skill}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.skill}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {s.gap}% gap · Demand: {s.demand}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={enrolled.includes(s.skill) ? 'secondary' : 'default'}
                    onClick={() => setEnrolled((e) => (e.includes(s.skill) ? e : [...e, s.skill]))}
                  >
                    {enrolled.includes(s.skill) ? <><Check /> Enrolled</> : '1-Click Upskill'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <WhatsAppDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
