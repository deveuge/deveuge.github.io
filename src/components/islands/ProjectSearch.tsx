import { useEffect, useRef } from "react"

const DEBOUNCE_MS = 300

/**
 * Filters the project cards already rendered by projects.astro (matched via
 * `[data-project-card]`/`data-search`) instead of re-rendering them here, so
 * ProjectCard.astro stays the single source of markup for a project card.
 */
export default function ProjectSearch() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim().toLowerCase()

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      const cards = document.querySelectorAll<HTMLElement>("[data-project-card]")
      cards.forEach(card => {
        const matches = !query || (card.dataset.search ?? "").includes(query)
        card.classList.toggle("hidden", !matches)
      })
    }, DEBOUNCE_MS)
  }

  return (
    <div id="input-search">
      <input type="text" aria-label="Search" placeholder="Type to filter projects..." onChange={handleChange} />
    </div>
  )
}
