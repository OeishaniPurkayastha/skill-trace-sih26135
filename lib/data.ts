export type Role = 'admin' | 'candidate' | 'provider' | 'employer'

export const ROLES: { id: Role; label: string; short: string }[] = [
  { id: 'admin', label: 'Government Admin Portal', short: 'Gov Admin' },
  { id: 'candidate', label: 'Candidate Portal', short: 'Candidate' },
  { id: 'provider', label: 'Training Provider Portal', short: 'Provider' },
  { id: 'employer', label: 'Employer Verification Portal', short: 'Employer' },
]

// ---------- Admin: longitudinal retention & wage ----------
export const retentionTimeline = [
  { month: 'M0', retention: 100, wage: 100 },
  { month: 'M6', retention: 88, wage: 106 },
  { month: 'M12', retention: 68, wage: 114 },
  { month: 'M18', retention: 61, wage: 119 },
  { month: 'M24', retention: 57, wage: 122 },
]

// ---------- Admin: provider pay-for-success index ----------
export const providerIndex = [
  { name: 'SkillBridge', completion: 91, placement: 84, retention: 72, score: 82 },
  { name: 'NextGen Tech', completion: 88, placement: 80, retention: 70, score: 79 },
  { name: 'BharatSkills', completion: 84, placement: 74, retention: 66, score: 74 },
  { name: 'UdyogVidya', completion: 79, placement: 66, retention: 58, score: 67 },
  { name: 'SkillForge', completion: 72, placement: 55, retention: 44, score: 56 },
  { name: 'ProAcad X', completion: 61, placement: 38, retention: 29, score: 42 },
]

// ---------- Admin: fraud / anomaly ----------
export const flaggedProviders = [
  {
    id: 'PRV-2291',
    name: 'ProAcad X',
    risk: 92,
    reason: '92% candidates linked to unverified GSTIN, high post-placement contact loss',
    level: 'High' as const,
  },
  {
    id: 'PRV-1174',
    name: 'QuickCert Institute',
    risk: 77,
    reason: 'Placement letters share duplicate employer IP, no EPFO trace at Month 6',
    level: 'High' as const,
  },
  {
    id: 'PRV-3320',
    name: 'EduSprint',
    risk: 58,
    reason: 'Wage figures 3x above sector median without EPFO confirmation',
    level: 'Medium' as const,
  },
]

// ---------- Admin: passive registry verification sources ----------
export const verificationSources = [
  { source: 'EPFO Registry', pct: 54, variant: 'success' as const },
  { source: 'WhatsApp AI Bot', pct: 28, variant: 'info' as const },
  { source: 'e-Shram', pct: 12, variant: 'default' as const },
  { source: 'Manual Survey', pct: 6, variant: 'outline' as const },
]

// ---------- Candidate ----------
export const candidate = {
  name: 'Rahul Deshmukh',
  id: 'MHA-2026-89412',
  aadhaar: 'Verified',
  status: 'Employed at Tech Corp',
  course: 'Full-Stack Web Development (NSQF L5)',
  provider: 'SkillBridge',
}

export const candidateMilestones = [
  { month: 'Month 0', title: 'Certified', detail: 'NSQF Level 5 credential issued', state: 'done' as const },
  { month: 'Month 6', title: 'Placed', detail: 'Hired at Tech Corp — EPFO verified', state: 'done' as const },
  { month: 'Month 12', title: 'Promoted', detail: 'Junior Dev → Associate Engineer', state: 'done' as const },
  { month: 'Month 24', title: 'Retention Check', detail: 'WhatsApp follow-up pending', state: 'pending' as const },
]

export const skillRadar = [
  { skill: 'React', you: 85, market: 90 },
  { skill: 'TypeScript', you: 60, market: 88 },
  { skill: 'Cloud/DevOps', you: 35, market: 82 },
  { skill: 'SQL', you: 70, market: 75 },
  { skill: 'System Design', you: 40, market: 78 },
  { skill: 'Testing', you: 55, market: 70 },
]

export const recommendedSkills = [
  { skill: 'Cloud & DevOps (AWS)', gap: 47, demand: 'Very High' },
  { skill: 'System Design', gap: 38, demand: 'High' },
  { skill: 'TypeScript (Advanced)', gap: 28, demand: 'High' },
]

// ---------- Provider ----------
export const providerScore = {
  grade: 'A+',
  placement: 84,
  retention: 72,
  completion: 91,
  payout: '₹1.82 Cr',
}

export const batches = [
  { id: 'BATCH-24A', course: 'Full-Stack Web Dev', students: 60, completion: 95, placement: 88, status: 'Active' as const },
  { id: 'BATCH-24B', course: 'Data Analytics', students: 45, completion: 89, placement: 80, status: 'Active' as const },
  { id: 'BATCH-23D', course: 'Cloud Foundations', students: 52, completion: 92, placement: 76, status: 'Placed' as const },
  { id: 'BATCH-23C', course: 'Digital Marketing', students: 38, completion: 84, placement: 61, status: 'At Risk' as const },
]

export const syllabusScan = [
  { module: 'jQuery & AJAX fundamentals', verdict: 'outdated' as const, note: 'Low market demand — superseded by modern frameworks' },
  { module: 'PHP monolith deployment', verdict: 'outdated' as const, note: 'Declining hiring signal in NCR/MH clusters' },
  { module: 'Responsive HTML & CSS', verdict: 'keep' as const, note: 'Still core — retain' },
  { module: 'Cloud deployment (AWS/Azure)', verdict: 'add' as const, note: 'High demand — add to close 47% skill gap' },
  { module: 'CI/CD & containerization', verdict: 'add' as const, note: 'Strong employer signal — recommended' },
]

// ---------- Employer ----------
export const employerCandidates = [
  { id: 'MHA-2026-89412', name: 'Rahul Deshmukh', role: 'Associate Engineer', hire: '2025-03-14', status: 'Active' as const },
  { id: 'MHA-2026-77201', name: 'Sneha Patil', role: 'Data Analyst', hire: '2025-01-09', status: 'Active' as const },
  { id: 'MHA-2025-64180', name: 'Imran Shaikh', role: 'Cloud Support', hire: '2024-11-22', status: 'Resigned' as const },
  { id: 'MHA-2026-90551', name: 'Anjali Rao', role: 'QA Engineer', hire: '2025-05-02', status: 'Active' as const },
  { id: 'MHA-2025-51992', name: 'Vikram Nair', role: 'Frontend Dev', hire: '2024-09-18', status: 'Active' as const },
]
