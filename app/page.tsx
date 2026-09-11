'use client'

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { AdminPortal } from '@/components/portals/admin-portal'
import { CandidatePortal } from '@/components/portals/candidate-portal'
import { ProviderPortal } from '@/components/portals/provider-portal'
import { EmployerPortal } from '@/components/portals/employer-portal'
import type { Role } from '@/lib/data'

export default function Page() {
  const [role, setRole] = useState<Role>('admin')

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role={role} onRoleChange={setRole} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {role === 'admin' && <AdminPortal />}
        {role === 'candidate' && <CandidatePortal />}
        {role === 'provider' && <ProviderPortal />}
        {role === 'employer' && <EmployerPortal />}
      </main>
      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-[11px] text-muted-foreground sm:px-6">
          Prototype for SIH26135 · AI-Driven Skilling Outcome Tracker & Longitudinal Verification
          Engine · Simulated data for demonstration.
        </div>
      </footer>
    </div>
  )
}
