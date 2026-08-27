import { useEffect, useRef, useState } from "react"
import { skills } from "@/lib/skills"
import { SITE } from "@/lib/site"

interface ProjectRef {
  id: string
  title: string
}

interface Props {
  projects: ProjectRef[]
}

interface Line {
  kind: "input" | "output" | "error"
  text: string
}

const PROMPT = "deveuge@portfolio:~$"

const HELP_LINES = [
  "Available commands:",
  "  whoami            who's behind this site",
  "  skills            core stack, at a glance",
  "  projects / ls      list every project",
  "  open <project>     jump to a project page",
  "  cd about|work|~     navigate the site",
  "  contact            github / linkedin",
  "  clear              clear the screen",
]

function coreSkills(): string[] {
  return skills
    .filter(skill => !skill.unused && (skill.category === "language" || skill.category === "framework"))
    .map(skill => skill.name)
}

export default function Terminal({ projects }: Props) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "output", text: "Welcome. This is a real (tiny) shell — type 'help' to see what it can do." },
  ])
  const [value, setValue] = useState("")
  const historyRef = useRef<string[]>([])
  const historyIndexRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  const print = (text: string, kind: Line["kind"] = "output") => setLines(prev => [...prev, { kind, text }])

  const run = (raw: string) => {
    const trimmed = raw.trim()
    setLines(prev => [...prev, { kind: "input", text: raw }])
    if (!trimmed) return

    historyRef.current.push(raw)
    historyIndexRef.current = historyRef.current.length

    const [cmd, ...rest] = trimmed.split(/\s+/)
    const arg = rest.join(" ").toLowerCase()

    switch (cmd.toLowerCase()) {
      case "help":
        HELP_LINES.forEach(line => print(line))
        return
      case "whoami":
        print("Senior Java/Spring backend engineer.")
        print("Eight years rebuilding legacy systems that outgrew their first design.")
        print("Currently building enterprise workflow software for the healthcare sector.")
        return
      case "skills":
        print(coreSkills().join(", "))
        print("Full breakdown: /about#skills")
        return
      case "projects":
      case "ls":
        projects.forEach(project => print(`  ${project.id.padEnd(20)} ${project.title}`))
        print("Type 'open <project>' to view one.")
        return
      case "open": {
        const match = projects.find(project => project.id === arg)
        if (!match) {
          print(`open: no such project: '${arg || ""}'. Type 'projects' to list them.`, "error")
          return
        }
        print(`Opening ${match.title}...`)
        window.location.href = `/${match.id}/`
        return
      }
      case "cd": {
        const dest = arg.replace(/^\/+|\/+$/g, "")
        if (dest === "projects" || dest === "work") {
          print("Navigating to /projects/...")
          window.location.href = "/projects/"
        } else if (dest === "about") {
          print("Navigating to /about/...")
          window.location.href = "/about/"
        } else if (dest === "" || dest === "~" || dest === "home") {
          print("Navigating to /...")
          window.location.href = "/"
        } else {
          print(`cd: no such directory: '${arg}'`, "error")
        }
        return
      }
      case "contact":
        print(`github   → https://github.com/${SITE.social.github}`)
        print(`linkedin → https://www.linkedin.com/in/${SITE.social.linkedin}`)
        return
      case "sudo":
        print("Permission denied: you're not root here. Nice try though.", "error")
        return
      case "clear":
        setLines([])
        return
      default:
        print(`command not found: ${cmd}. Type 'help' for a list of commands.`, "error")
    }
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-titlebar">
        <span className="terminal-dot" aria-hidden="true"></span>
        <span className="terminal-dot" aria-hidden="true"></span>
        <span className="terminal-dot" aria-hidden="true"></span>
        <span className="terminal-title">deveuge — zsh</span>
      </div>
      <div className="terminal-body" ref={bodyRef} role="log" aria-live="polite">
        {lines.map((line, i) => (
          <p key={i} className={`terminal-line terminal-${line.kind}`}>
            {line.kind === "input" ? (
              <>
                <span className="terminal-prompt">{PROMPT}</span> {line.text}
              </>
            ) : (
              line.text
            )}
          </p>
        ))}
        <form
          className="terminal-form"
          onSubmit={e => {
            e.preventDefault()
            run(value)
            setValue("")
          }}
        >
          <span className="terminal-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            className="terminal-input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === "ArrowUp") {
                e.preventDefault()
                historyIndexRef.current = Math.max(0, historyIndexRef.current - 1)
                setValue(historyRef.current[historyIndexRef.current] ?? "")
              } else if (e.key === "ArrowDown") {
                e.preventDefault()
                historyIndexRef.current = Math.min(historyRef.current.length, historyIndexRef.current + 1)
                setValue(historyRef.current[historyIndexRef.current] ?? "")
              }
            }}
            aria-label="Terminal command input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  )
}
