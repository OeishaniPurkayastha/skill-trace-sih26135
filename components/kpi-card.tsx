import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function KpiCard({
  label,
  value,
  delta,
  deltaTone = 'up',
  hint,
  icon: Icon,
  iconTone = 'primary',
}: {
  label: string
  value: string
  delta?: string
  deltaTone?: 'up' | 'down'
  hint?: string
  icon: LucideIcon
  iconTone?: 'primary' | 'success' | 'warning' | 'danger'
}) {
  const iconClasses: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/12 text-success',
    warning: 'bg-warning/18 text-warning-foreground',
    danger: 'bg-destructive/12 text-destructive',
  }

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className={cn('flex size-10 items-center justify-center rounded-lg', iconClasses[iconTone])}>
          <Icon className="size-5" />
        </div>
        {delta && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-medium',
              deltaTone === 'up' ? 'text-success' : 'text-destructive',
            )}
          >
            {deltaTone === 'up' ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
      {hint && <p className="mt-2 text-[11px] text-muted-foreground/80">{hint}</p>}
    </Card>
  )
}
