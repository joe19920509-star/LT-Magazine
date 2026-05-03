/** Start of calendar day in Asia/Shanghai, for analytics (matches site audience). */
export function startOfTodayShanghaiISO(): string {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now)
  const y = parts.find((p) => p.type === 'year')?.value
  const mo = parts.find((p) => p.type === 'month')?.value
  const d = parts.find((p) => p.type === 'day')?.value
  if (!y || !mo || !d) {
    const t = new Date(now)
    t.setUTCHours(0, 0, 0, 0)
    return t.toISOString()
  }
  return `${y}-${mo}-${d}T00:00:00+08:00`
}
