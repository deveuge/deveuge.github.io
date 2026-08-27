import { useMemo, useState, type CSSProperties } from "react"
import { RADAR_QUADRANTS, RADAR_RINGS, techRadar, type RadarEntry, type RadarQuadrant, type RadarRing } from "@/lib/techRadar"

type RingFilter = "all" | RadarRing

// Clockwise from top-left in SVG space (y grows downward): 0deg = right,
// 90deg = down, 180deg = left, 270deg = up.
const QUADRANT_ANGLES: Record<RadarQuadrant, [number, number]> = {
  "languages-data": [180, 270],
  "frameworks-libraries": [270, 360],
  "architecture-platforms": [0, 90],
  "delivery-tooling": [90, 180],
}

const QUADRANT_COLOR_VAR: Record<RadarQuadrant, string> = {
  "languages-data": "var(--color-primary)",
  "frameworks-libraries": "var(--color-accent)",
  "delivery-tooling": "var(--color-status-live)",
  "architecture-platforms": "var(--color-radar-4)",
}

const RING_ORDER: RadarRing[] = ["adopt", "trial", "assess", "hold"]

const SIZE = 600
const CENTER = SIZE / 2
const MAX_R = 250
const RING_WIDTH = MAX_R / RING_ORDER.length

/** Deterministic pseudo-random fraction in [0, 1) so dot placement stays stable across renders. */
function hash(str: string, seed: number): number {
  let h = seed
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 2654435761)
    h ^= h >>> 15
  }
  return ((h >>> 0) % 10000) / 10000
}

function polarToPoint(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) }
}

function dotPosition(entry: RadarEntry) {
  const [start, end] = QUADRANT_ANGLES[entry.quadrant]
  const anglePad = (end - start) * 0.12
  const angle = start + anglePad + hash(entry.name, 17) * (end - start - anglePad * 2)

  const ringIndex = RING_ORDER.indexOf(entry.ring)
  const ringInner = ringIndex * RING_WIDTH
  const ringPad = RING_WIDTH * 0.2
  const r = ringInner + ringPad + hash(entry.name, 41) * (RING_WIDTH - ringPad * 2)

  return polarToPoint(angle, r)
}

interface Props {
  /** Shown at the top of the detail panel before anything is selected. */
  intro?: string
}

export default function TechRadar({ intro }: Props) {
  const [ringFilter, setRingFilter] = useState<RingFilter>("all")
  const [selected, setSelected] = useState<RadarEntry | null>(null)

  const positioned = useMemo(() => techRadar.map(entry => ({ entry, pos: dotPosition(entry) })), [])

  return (
    <div className="tech-radar">
      <div id="radar-filters">
        <button type="button" className={ringFilter === "all" ? "is-checked" : ""} onClick={() => setRingFilter("all")}>
          All
        </button>
        {RADAR_RINGS.map(ring => (
          <button
            key={ring.key}
            type="button"
            className={ringFilter === ring.key ? "is-checked" : ""}
            onClick={() => setRingFilter(ring.key)}
          >
            {ring.label}
          </button>
        ))}
      </div>

      <div className="radar-layout">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label="Tech radar: my current stance on tools and technologies, from adopt to hold"
        >
          {RING_ORDER.map((ring, i) => (
            <circle key={ring} cx={CENTER} cy={CENTER} r={(i + 1) * RING_WIDTH} className="ring-circle" />
          ))}
          <line x1={CENTER} y1={CENTER - MAX_R} x2={CENTER} y2={CENTER + MAX_R} className="axis-line" />
          <line x1={CENTER - MAX_R} y1={CENTER} x2={CENTER + MAX_R} y2={CENTER} className="axis-line" />

          {RADAR_QUADRANTS.map(q => {
            const [start, end] = QUADRANT_ANGLES[q.key]
            const pos = polarToPoint((start + end) / 2, MAX_R + 28)
            return (
              <text key={q.key} x={pos.x} y={pos.y} className="quadrant-label" textAnchor="middle" dominantBaseline="middle">
                {q.label}
              </text>
            )
          })}

          {positioned.map(({ entry, pos }) => {
            const dimmed = ringFilter !== "all" && entry.ring !== ringFilter
            const isSelected = selected?.name === entry.name
            return (
              <g
                key={entry.name}
                className={`dot${dimmed ? " dimmed" : ""}${isSelected ? " is-selected" : ""}`}
                style={{ "--dot-color": QUADRANT_COLOR_VAR[entry.quadrant] } as CSSProperties}
                tabIndex={0}
                role="button"
                aria-label={`${entry.name}: ${entry.ring}. ${entry.blurb}`}
                onClick={() => setSelected(entry)}
                onMouseEnter={() => setSelected(entry)}
                onFocus={() => setSelected(entry)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setSelected(entry)
                  }
                }}
              >
                <circle cx={pos.x} cy={pos.y} r="16" className="hit-area" />
                <circle cx={pos.x} cy={pos.y} r="7" className="dot-fill" />
              </g>
            )
          })}
        </svg>

        <div className="radar-detail" aria-live="polite">
          {selected ? (
            <>
              <div className="detail-head">
                <span className={`icon ${selected.icon}`} aria-hidden="true"></span>
                <span className="detail-name">{selected.name}</span>
                <span className={`ring-badge ring-${selected.ring}`}>
                  {RADAR_RINGS.find(r => r.key === selected.ring)?.label}
                </span>
              </div>
              <p className="detail-blurb">{selected.blurb}</p>
            </>
          ) : (
            <>
              {intro && <p className="detail-intro">{intro}</p>}
              <p className="detail-hint">Hover, focus, or tap a dot to see the reasoning behind where it sits.</p>
            </>
          )}
        </div>
      </div>

      <div className="radar-legend">
        {RADAR_QUADRANTS.map(q => (
          <span key={q.key} className="legend-item">
            <span className="swatch" style={{ background: QUADRANT_COLOR_VAR[q.key] } as CSSProperties}></span>
            {q.label}
          </span>
        ))}
      </div>
    </div>
  )
}
