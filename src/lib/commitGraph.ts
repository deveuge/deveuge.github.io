import { experience } from "@/lib/timeline"

export type CommitGraphHue = "primary" | "accent"

export interface CommitGraphDay {
  date: string
  /** 0 when empty; otherwise a continuous shade strength in (0, 1], for a
   *  smoother gradient of tone than a handful of fixed steps would give. */
  intensity: number
  hue: CommitGraphHue | null
}

export interface CommitGraphJob {
  title: string
  company: string
  period: string
  hue: CommitGraphHue
  /** Inclusive week-column range (indices into `weeks`) the role's dots occupy, for placing its label under the matching segment of the graph. */
  startWeekIndex: number
  endWeekIndex: number
}

export interface CommitGraphData {
  weeks: CommitGraphDay[][]
  monthLabels: { weekIndex: number; label: string }[]
  jobs: CommitGraphJob[]
  rangeLabel: string
}

const MS_PER_DAY = 24 * 60 * 60 * 1000
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

interface JobRange {
  title: string
  company: string
  period: string
  hue: CommitGraphHue
  start: Date
  end: Date
}

function parsePeriod(period: string): { start: Date; end: Date } {
  const [rawStart, rawEnd] = period.split("–").map(part => part.trim())
  const parseMonthYear = (value: string, endOfMonth: boolean) => {
    const [monthName, yearStr] = value.split(" ")
    const monthIndex = MONTHS.indexOf(monthName)
    const year = Number(yearStr)
    return endOfMonth ? new Date(Date.UTC(year, monthIndex + 1, 0)) : new Date(Date.UTC(year, monthIndex, 1))
  }

  const start = parseMonthYear(rawStart, false)
  const today = new Date()
  const end = rawEnd === "PRESENT" ? new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())) : parseMonthYear(rawEnd, true)

  return { start, end }
}

function buildJobRanges(): JobRange[] {
  // experience.ts lists roles newest-first; the graph reads left-to-right
  // chronologically, so reverse it and alternate hues front-to-back so
  // consecutive roles are never the same color.
  return [...experience]
    .reverse()
    .map((item, i) => {
      const { start, end } = parsePeriod(item.period)
      return { title: item.title, company: item.company, period: item.period, hue: (i % 2 === 0 ? "primary" : "accent") as CommitGraphHue, start, end }
    })
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/**
 * Deterministic pseudo-random density, purely decorative — this graph maps
 * real tenure per role, not real commit counts. Seeded per-day (hash of the
 * ISO date) rather than as a sequential stream, so the same date always
 * produces the same value regardless of the range being rendered — the
 * build-time render and a later client-side re-render (see the script in
 * CommitGraph.astro, which extends the graph to "today" without a rebuild)
 * agree on every day they both cover.
 */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashSeed(value: string): number {
  let h = 0
  for (let i = 0; i < value.length; i++) h = (Math.imul(31, h) + value.charCodeAt(i)) | 0
  return h
}

function monthLabelsFor(weeks: CommitGraphDay[][]): { weekIndex: number; label: string }[] {
  const labels: { weekIndex: number; label: string }[] = []
  let lastMonth = -1
  weeks.forEach((week, weekIndex) => {
    const d = new Date(week[0].date)
    const month = d.getUTCMonth()
    if (month !== lastMonth) {
      labels.push({ weekIndex, label: `${MONTHS[month]}${String(d.getUTCFullYear()).slice(2)}` })
      lastMonth = month
    }
  })
  return labels
}

export function getCommitGraphData(): CommitGraphData {
  const jobs = buildJobRanges()
  const rangeStart = jobs[0].start
  const rangeEndRaw = jobs[jobs.length - 1].end

  // The open-ended current role's dots stop at today, which can leave its
  // label too narrow a span to sit comfortably — pad the graph (empty,
  // dot-less columns only) a couple of months into the future so that
  // label has room, without fabricating activity that hasn't happened yet.
  const FUTURE_PADDING_DAYS = 92
  const isOpenEnded = jobs[jobs.length - 1].period.endsWith("PRESENT")
  const graphEnd = isOpenEnded ? new Date(rangeEndRaw.getTime() + FUTURE_PADDING_DAYS * MS_PER_DAY) : rangeEndRaw

  const alignedStart = new Date(rangeStart)
  alignedStart.setUTCDate(alignedStart.getUTCDate() - alignedStart.getUTCDay())
  const alignedEnd = new Date(graphEnd)
  alignedEnd.setUTCDate(alignedEnd.getUTCDate() + (6 - alignedEnd.getUTCDay()))

  const totalDays = Math.round((alignedEnd.getTime() - alignedStart.getTime()) / MS_PER_DAY) + 1

  const days: CommitGraphDay[] = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(alignedStart.getTime() + i * MS_PER_DAY)
    const iso = toISODate(date)
    const job = jobs.find(j => date >= j.start && date <= j.end) ?? null

    const random = mulberry32(hashSeed(iso))
    const activeRoll = random()
    const intensityRoll = random()
    const isActive = Boolean(job) && activeRoll > 0.15

    return { date: iso, intensity: isActive ? 0.25 + intensityRoll * 0.75 : 0, hue: isActive ? (job as JobRange).hue : null }
  })

  const weeks: CommitGraphDay[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

  const dayIndexOf = (date: Date) => Math.round((date.getTime() - alignedStart.getTime()) / MS_PER_DAY)
  const weekIndexOf = (date: Date) => Math.floor(dayIndexOf(date) / 7)

  const format = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })

  // Adjacent roles can share their transition week (one ends and the next
  // starts within the same 7-day column), which would overlap their label
  // spans and force the grid to stack them onto separate lines — so trim
  // each span to start right after the previous role's ends.
  const jobLabels = jobs.map(({ title, company, period, hue, start, end }) => ({
    title,
    company,
    period,
    hue,
    startWeekIndex: weekIndexOf(start),
    endWeekIndex: weekIndexOf(end),
  }))
  for (let i = 1; i < jobLabels.length; i++) {
    if (jobLabels[i].startWeekIndex <= jobLabels[i - 1].endWeekIndex) {
      jobLabels[i].startWeekIndex = jobLabels[i - 1].endWeekIndex + 1
    }
  }
  if (isOpenEnded) jobLabels[jobLabels.length - 1].endWeekIndex = weekIndexOf(graphEnd)

  return {
    weeks,
    monthLabels: monthLabelsFor(weeks),
    jobs: jobLabels.slice().reverse(),
    rangeLabel: `${format(rangeStart)} – present`,
  }
}
