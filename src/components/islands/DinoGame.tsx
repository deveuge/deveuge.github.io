import { useEffect, useRef, useState } from "react"

const WIDTH = 600
const HEIGHT = 160
const GROUND_Y = HEIGHT - 24
const GRAVITY = 0.6
const JUMP_VELOCITY = -10.5
const PLAYER_SIZE = 22
const PLAYER_X = 40
const HIGH_SCORE_KEY = "dino-game-high-score"

interface Obstacle {
  x: number
  width: number
  height: number
}

type GameState = "idle" | "playing" | "over"

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<GameState>("idle")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const runRef = useRef({
    playerY: GROUND_Y - PLAYER_SIZE,
    velocity: 0,
    obstacles: [] as Obstacle[],
    speed: 5,
    frame: 0,
    nextSpawn: 60,
    score: 0,
  })

  useEffect(() => {
    try {
      setHighScore(Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0)
    } catch {
      // localStorage unavailable (private mode, etc.) — high score just won't persist
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const styles = getComputedStyle(document.documentElement)
    const colorLine = styles.getPropertyValue("--color-line").trim() || "#d3d8de"
    const colorPlayer = styles.getPropertyValue("--color-primary").trim() || "#24406b"
    const colorObstacle = styles.getPropertyValue("--color-text").trim() || "#161a22"

    let raf = 0

    const draw = () => {
      const run = runRef.current
      ctx.clearRect(0, 0, WIDTH, HEIGHT)

      // ground
      ctx.strokeStyle = colorLine
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, GROUND_Y)
      ctx.lineTo(WIDTH, GROUND_Y)
      ctx.stroke()

      // player
      ctx.fillStyle = colorPlayer
      ctx.fillRect(PLAYER_X, run.playerY, PLAYER_SIZE, PLAYER_SIZE)

      // obstacles
      ctx.fillStyle = colorObstacle
      for (const obstacle of run.obstacles) {
        ctx.fillRect(obstacle.x, GROUND_Y - obstacle.height, obstacle.width, obstacle.height)
      }
    }

    const step = () => {
      const run = runRef.current

      if (state === "playing") {
        run.frame += 1

        run.velocity += GRAVITY
        run.playerY += run.velocity
        if (run.playerY > GROUND_Y - PLAYER_SIZE) {
          run.playerY = GROUND_Y - PLAYER_SIZE
          run.velocity = 0
        }

        run.obstacles.forEach(o => (o.x -= run.speed))
        run.obstacles = run.obstacles.filter(o => o.x + o.width > 0)

        if (run.frame >= run.nextSpawn) {
          const height = 20 + Math.random() * 20
          run.obstacles.push({ x: WIDTH, width: 12 + Math.random() * 10, height })
          run.nextSpawn = run.frame + 50 + Math.random() * 50
        }

        run.speed = 5 + Math.floor(run.frame / 300) * 0.5
        run.score += 1
        setScore(Math.floor(run.score / 10))

        for (const obstacle of run.obstacles) {
          const collides =
            PLAYER_X < obstacle.x + obstacle.width &&
            PLAYER_X + PLAYER_SIZE > obstacle.x &&
            run.playerY + PLAYER_SIZE > GROUND_Y - obstacle.height
          if (collides) {
            const finalScore = Math.floor(run.score / 10)
            setState("over")
            setHighScore(prev => {
              const next = Math.max(prev, finalScore)
              try {
                localStorage.setItem(HIGH_SCORE_KEY, String(next))
              } catch {
                // ignore persistence failures
              }
              return next
            })
          }
        }
      }

      draw()
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [state])

  const resetRun = () => {
    runRef.current = {
      playerY: GROUND_Y - PLAYER_SIZE,
      velocity: 0,
      obstacles: [],
      speed: 5,
      frame: 0,
      nextSpawn: 60,
      score: 0,
    }
    setScore(0)
  }

  const jump = () => {
    const run = runRef.current
    if (state === "idle" || state === "over") {
      resetRun()
      setState("playing")
      return
    }
    if (run.playerY >= GROUND_Y - PLAYER_SIZE) {
      run.velocity = JUMP_VELOCITY
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
      event.preventDefault()
      jump()
    }
  }

  return (
    <div
      id="dino-game"
      ref={containerRef}
      tabIndex={0}
      role="button"
      aria-label="Easter egg runner game. Press space to jump."
      onKeyDown={handleKeyDown}
      onPointerDown={jump}
    >
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />

      <div className="hud">
        <span>Score: {score.toString().padStart(5, "0")}</span>
        <span>Best: {highScore.toString().padStart(5, "0")}</span>
      </div>

      {state !== "playing" && (
        <div className="overlay">
          {state === "idle" ? "Press space or tap to run" : `Game over — score ${score}. Press space to retry`}
        </div>
      )}
    </div>
  )
}
