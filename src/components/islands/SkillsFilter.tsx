import { useMemo, useState } from "react"
import type { Skill, SkillCategory } from "@/lib/skills"

type FilterKey = "all" | SkillCategory | "unused"

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "language", label: "Languages" },
  { key: "database", label: "Databases" },
  { key: "library", label: "Libraries" },
  { key: "server", label: "Server" },
  { key: "unused", label: "Unused" },
]

interface Props {
  skills: Skill[]
}

function skillTime(skill: Skill) {
  if (!skill.year) return skill.time
  return skill.time.replace(/X/g, String(new Date().getFullYear() - skill.year))
}

function matchesFilter(skill: Skill, filter: FilterKey) {
  if (filter === "all") return true
  if (filter === "unused") return skill.unused === true
  return skill.category === filter && !skill.unused
}

export default function SkillsFilter({ skills }: Props) {
  const [filter, setFilter] = useState<FilterKey>("all")

  const visibleSkills = useMemo(() => skills.filter(skill => matchesFilter(skill, filter)), [skills, filter])

  return (
    <div>
      <div id="filters">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={filter === key ? "is-checked" : ""}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {visibleSkills.map(skill => (
          <div
            key={skill.name}
            className={`element-item ${skill.category}${skill.unused ? " unused" : ""}`}
          >
            <span className={skill.icon}></span>
            <h3 className="name">{skill.name}</h3>
            <em>{skillTime(skill)}</em>
          </div>
        ))}
      </div>
    </div>
  )
}
