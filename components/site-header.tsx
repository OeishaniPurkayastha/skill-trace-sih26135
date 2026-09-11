'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, ShieldCheck } from 'lucide-react'
import { ROLES, type Role } from '@/lib/data'
import { cn } from '@/lib/utils'

const roleAccent: Record<Role, string> = {
  admin: 'bg-primary',
  candidate: 'bg-success',
  provider: 'bg-warning',
  employer: 'bg-info',
}

export function SiteHeader({
  role,
  onRoleChange,
}: {
  role: Role
  onRoleChange: (r: Role) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = ROLES.find((r) => r.id === role)!

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="size-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">Skilling Outcome Tracker</p>
            <p className="text-[11px] text-muted-foreground">
              SIH26135 · Longitudinal Verification Engine
            </p>
          </div>
        </div>

        <div ref={ref} className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span className={cn('size-2 rounded-full', roleAccent[role])} />
            <span className="hidden sm:inline">{current.label}</span>
            <span className="sm:hidden">{current.short}</span>
            <ChevronDown
              className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')}
            />
          </button>

          {open && (
            <ul
              role="listbox"
              className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
            >
              {ROLES.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={r.id === role}
                    onClick={() => {
                      onRoleChange(r.id)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                      r.id === role && 'bg-muted',
                    )}
                  >
                    <span className={cn('size-2 rounded-full', roleAccent[r.id])} />
                    <span className="flex-1 font-medium text-foreground">{r.label}</span>
                    {r.id === role && <Check className="size-4 text-primary" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}
