import type { Skill } from "@/lib/skills"

function yearsUsed(skill: Skill): number | null {
  if (!skill.year) return null
  return (skill.endYear ?? new Date().getFullYear()) - skill.year
}

export function skillTime(skill: Skill): string {
  const years = yearsUsed(skill)
  if (years === null) return skill.time ?? ""
  if (years <= 0) return "< 1 year"
  if (years === 1) return "1 year"
  return `+ ${years} years`
}

// Proficiency bar width, derived from `year`/`endYear` (years used) or, when
// absent, the leading number in `time` (halved for a "< N years" style entry).
const MAX_YEARS = 8

export function proficiencyWidth(skill: Skill): number {
  const yearsFromDate = yearsUsed(skill)
  let years: number
  if (yearsFromDate !== null) {
    years = yearsFromDate
  } else {
    const time = skill.time ?? ""
    const match = time.match(/\d+(\.\d+)?/)
    years = match ? Number(match[0]) * (time.startsWith("<") ? 0.5 : 1) : 0.5
  }
  return Math.max(6, Math.min(100, Math.round((years / MAX_YEARS) * 100)))
}
