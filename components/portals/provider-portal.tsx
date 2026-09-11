'use client'

import { useState } from 'react'
import { ArrowRight, Award, FileScan, Loader2, Minus, Plus, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { batches, providerScore, syllabusScan } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusVariant: Record<string, 'success' | 'info' | 'warning'> = {
  Active: 'info',
  Placed: 'success',
  'At Risk': 'warning',
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-background/60 p-3">
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}

export function ProviderPortal() {
  const [scanState, setScanState] = useState<'idle' | 'running' | 'done'>('idle')

  function runScan() {
    setScanState('running')
    setTimeout(() => setScanState('done'), 1600)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Provider Performance Console
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          SkillBridge · Empanelment ID PRV-0042 · Pay-for-Success funding model
        </p>
      </div>

      {/* Scorecard */}
      <Card className="overflow-hidden">
        <div className="grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex items-center gap-4 rounded-xl bg-success/10 p-5">
            <div className="flex size-16 items-center justify-center rounded-full bg-success text-2xl font-bold text-success-foreground">
              {providerScore.grade}
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-success">
                <Award className="size-4" /> Pay-for-Success Grade
              </p>
              <p className="text-xs text-muted-foreground">Top 5% of empanelled providers</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Completion" value={`${providerScore.completion}%`} />
            <Metric label="Placement" value={`${providerScore.placement}%`} />
            <Metric label="12-Mo Retention" value={`${providerScore.retention}%`} />
            <Metric label="Verified Payout" value={providerScore.payout} />
          </div>
        </div>
      </Card>

      {/* Batch management */}
      <Card>
        <CardHeader>
          <CardTitle>Batch Management</CardTitle>
          <CardDescription>Cohort completion and verified placement tracking.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">Batch</th>
                  <th className="pb-2 font-medium">Course</th>
                  <th className="pb-2 font-medium">Students</th>
                  <th className="pb-2 font-medium">Completion</th>
                  <th className="pb-2 font-medium">6-Mo Placement</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((b) => (
                  <tr key={b.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-mono text-xs text-foreground">{b.id}</td>
                    <td className="py-3 text-foreground">{b.course}</td>
                    <td className="py-3 text-muted-foreground">{b.students}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${b.completion}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{b.completion}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-success" style={{ width: `${b.placement}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{b.placement}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Syllabus scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileScan className="size-4 text-primary" /> Course Syllabus AI Skill-Gap Scanner
          </CardTitle>
          <CardDescription>NLP analysis matches your syllabus against live market demand.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-xs font-medium text-muted-foreground">Syllabus input</p>
            <p className="mt-1 font-mono text-xs leading-relaxed text-foreground/80">
              Module 1: Responsive HTML & CSS · Module 2: jQuery & AJAX fundamentals · Module 3: PHP
              monolith deployment · Module 4: SQL basics · Module 5: Project delivery
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button onClick={runScan} disabled={scanState === 'running'}>
              {scanState === 'running' ? (
                <><Loader2 className="animate-spin" /> Analysing…</>
              ) : (
                <><Sparkles /> Run AI Market Match</>
              )}
            </Button>
            {scanState === 'done' && (
              <Badge variant="success">Analysis complete · 2 outdated, 2 recommended</Badge>
            )}
          </div>

          {scanState === 'done' && (
            <div className="mt-4 space-y-2">
              {syllabusScan.map((s) => (
                <div
                  key={s.module}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-3',
                    s.verdict === 'outdated' && 'border-destructive/30 bg-destructive/5',
                    s.verdict === 'add' && 'border-success/30 bg-success/5',
                    s.verdict === 'keep' && 'border-border bg-background',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex size-5 items-center justify-center rounded-full',
                      s.verdict === 'outdated' && 'bg-destructive/15 text-destructive',
                      s.verdict === 'add' && 'bg-success/15 text-success',
                      s.verdict === 'keep' && 'bg-muted text-muted-foreground',
                    )}
                  >
                    {s.verdict === 'outdated' ? (
                      <Minus className="size-3" />
                    ) : s.verdict === 'add' ? (
                      <Plus className="size-3" />
                    ) : (
                      <ArrowRight className="size-3" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        s.verdict === 'outdated' && 'text-destructive',
                        s.verdict === 'add' && 'text-success',
                        s.verdict === 'keep' && 'text-foreground',
                      )}
                    >
                      {s.module}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.note}</p>
                  </div>
                  <Badge
                    variant={
                      s.verdict === 'outdated' ? 'danger' : s.verdict === 'add' ? 'success' : 'outline'
                    }
                  >
                    {s.verdict === 'outdated' ? 'Outdated' : s.verdict === 'add' ? 'Add' : 'Keep'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
