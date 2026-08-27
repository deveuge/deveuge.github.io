import { useMemo, useState } from "react"
import type { Skill, SkillCategory } from "@/lib/skills"
import { proficiencyWidth, skillTime } from "@/lib/skillsDisplay"

type FilterKey = "all" | SkillCategory | "unused"

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "language", label: "Languages" },
  { key: "database", label: "Databases" },
  { key: "framework", label: "Frameworks" },
  { key: "tooling", label: "Tooling" },
  { key: "integration", label: "Integration" },
  { key: "server", label: "Server" },
  { key: "unused", label: "Unused" },
]

interface Props {
  skills: Skill[]
}

function matchesFilter(skill: Skill, filter: FilterKey) {
  if (filter === "all") return true
  if (filter === "unused") return skill.unused === true
  return skill.category === filter && !skill.unused
}

export default function SkillsFilter({ skills }: Props) {
  const [filter, setFilter] = useState<FilterKey>("language")

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

      <div className="skills-matrix">
        {visibleSkills.map(skill => (
          <div key={skill.name} className={`skill-row${skill.unused ? " unused" : ""}`}>
            <span className={`icon ${skill.icon}`} aria-hidden="true"></span>
            <span className="name">{skill.name}</span>
            <span className="category">{skill.category}</span>
            <span className="bar-track">
              <span className="bar-fill" style={{ width: `${proficiencyWidth(skill)}%` }}></span>
            </span>
            <span className="time">{skillTime(skill)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
