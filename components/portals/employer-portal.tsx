'use client'

import { useState } from 'react'
import { BadgeCheck, CheckCircle2, IndianRupee, Loader2, Upload } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { KpiCard } from '@/components/kpi-card'
import { employerCandidates } from '@/lib/data'

type VState = 'idle' | 'verifying' | 'verified'

export function EmployerPortal() {
  const [states, setStates] = useState<Record<string, VState>>({})
  const [bulk, setBulk] = useState<'idle' | 'running' | 'done'>('idle')

  function verify(id: string) {
    setStates((s) => ({ ...s, [id]: 'verifying' }))
    setTimeout(() => setStates((s) => ({ ...s, [id]: 'verified' })), 900)
  }

  function bulkVerify() {
    setBulk('running')
    setTimeout(() => {
      const next: Record<string, VState> = {}
      employerCandidates.forEach((c) => (next[c.id] = 'verified'))
      setStates(next)
      setBulk('done')
    }, 1500)
  }

  const verifiedCount = Object.values(states).filter((v) => v === 'verified').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Employer Verification Console
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tech Corp HR · Instantly verify skilling credentials and claim skilling incentives.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Candidates on Record" value={String(employerCandidates.length)} icon={BadgeCheck} />
        <KpiCard
          label="Verified This Session"
          value={String(verifiedCount)}
          icon={CheckCircle2}
          iconTone="success"
        />
        <KpiCard
          label="Skilling Tax Incentive Earned"
          value="₹45,000"
          delta="+₹9,000"
          icon={IndianRupee}
          iconTone="success"
          hint="Claimable against verified retained hires"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>1-Click Candidate Verification</CardTitle>
              <CardDescription>Cross-checked against the national skilling registry.</CardDescription>
            </div>
            <Button variant="outline" onClick={bulkVerify} disabled={bulk === 'running'}>
              {bulk === 'running' ? <><Loader2 className="animate-spin" /> Processing CSV…</> : <><Upload /> Bulk Verify via CSV</>}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">Candidate ID</th>
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium">Hire Date</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 text-right font-medium">Verification</th>
                </tr>
              </thead>
              <tbody>
                {employerCandidates.map((c) => {
                  const st = states[c.id] ?? 'idle'
                  return (
                    <tr key={c.id} className="border-b border-border/60 last:border-0">
                      <td className="py-3 font-mono text-xs text-foreground">{c.id}</td>
                      <td className="py-3 font-medium text-foreground">{c.name}</td>
                      <td className="py-3 text-muted-foreground">{c.role}</td>
                      <td className="py-3 font-mono text-xs text-muted-foreground">{c.hire}</td>
                      <td className="py-3">
                        <Badge variant={c.status === 'Active' ? 'success' : 'outline'}>{c.status}</Badge>
                      </td>
                      <td className="py-3 text-right">
                        {st === 'verified' ? (
                          <Badge variant="success">
                            <BadgeCheck /> Verified
                          </Badge>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => verify(c.id)} disabled={st === 'verifying'}>
                            {st === 'verifying' ? <><Loader2 className="animate-spin" /> Verifying</> : 'Verify'}
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-lg border border-dashed border-border p-6 text-center">
            <Upload className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-foreground">Bulk Verify via CSV</p>
            <p className="text-xs text-muted-foreground">
              Drag & drop a candidate roster, or use the button above to run a simulated batch verification.
            </p>
            {bulk === 'done' && (
              <Badge variant="success" className="mt-3">
                <CheckCircle2 /> {employerCandidates.length} candidates verified from CSV
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
