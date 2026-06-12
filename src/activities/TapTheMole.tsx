import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { audio } from "../lib/audio";
import { useApp } from "../context/AppContext";

const HOLES = 9;
const GAME_SECONDS = 30;
const CRITTERS = ["🐹", "🐰", "🦔", "🐭", "🐸"];

export function TapTheMole({ onBack }: { onBack: () => void }) {
  const { speak, cheer, tap, ageMode } = useApp();
  const [up, setUp] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(GAME_SECONDS);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const spawn = useRef<number | null>(null);
  const tick = useRef<number | null>(null);
  const hideTimers = useRef<number[]>([]);
  const upRef = useRef(up);
  upRef.current = up;

  const clearAll = () => {
    if (spawn.current) clearInterval(spawn.current);
    if (tick.current) clearInterval(tick.current);
    hideTimers.current.forEach(clearTimeout);
    hideTimers.current = [];
  };
  useEffect(() => () => clearAll(), []);

  const start = () => {
    tap();
    setScore(0);
    setTime(GAME_SECONDS);
    setUp({});
    setPhase("playing");
    speak("Tap the animals! Go!", { expressive: true });

    const popMs = ageMode === "younger" ? 1100 : 800; // younger gets more time
    spawn.current = window.setInterval(() => {
      const free = Array.from({ length: HOLES }, (_, i) => i).filter((i) => !upRef.current[i]);
      if (free.length === 0) return;
      const hole = free[Math.floor(Math.random() * free.length)];
      const critter = CRITTERS[Math.floor(Math.random() * CRITTERS.length)];
      setUp((u) => ({ ...u, [hole]: critter }));
      const t = window.setTimeout(() => {
        setUp((u) => {
          const n = { ...u };
          delete n[hole];
          return n;
        });
      }, popMs);
      hideTimers.current.push(t);
    }, popMs * 0.8);

    tick.current = window.setInterval(() => {
      setTime((s) => {
        if (s <= 1) {
          clearAll();
          setUp({});
          setPhase("done");
          setTimeout(() => cheer("Great whacking!"), 300);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const whack = (i: number) => {
    if (!up[i]) return;
    audio.chimeTap();
    setScore((s) => s + 1);
    setUp((u) => {
      const n = { ...u };
      delete n[i];
      return n;
    });
  };

  if (phase === "done") {
    return (
      <WinScreen
        activityId="tap-the-mole"
        stars={Math.max(2, Math.min(5, Math.round(score / 4)))}
        onBack={onBack}
        onReplay={() => setPhase("ready")}
      />
    );
  }

  return (
    <ActivityShell
      onBack={() => {
        clearAll();
        onBack();
      }}
      prompt={phase === "ready" ? <>Tap the Animals! 🐹</> : <>Score: {score} ⭐ &nbsp; ⏱️ {time}s</>}
      caption={phase === "ready" ? "Tap each animal before it hides!" : "Tap fast!"}
    >
      {phase === "ready" ? (
        <button className="btn btn-teal" style={{ fontSize: 26, padding: "18px 32px" }} onClick={start}>
          ▶️ Start!
        </button>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            width: "min(420px, 90vw)",
            margin: "0 auto",
          }}
        >
          {Array.from({ length: HOLES }, (_, i) => (
            <button
              key={i}
              aria-label={up[i] ? "animal" : "hole"}
              onClick={() => whack(i)}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                border: "none",
                background: "radial-gradient(circle at 50% 35%, #d8c3a5, #b08d57)",
                boxShadow: "inset 0 -10px 16px rgba(0,0,0,0.25)",
                display: "grid",
                placeItems: "center",
                fontSize: "clamp(34px,9vw,56px)",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  transform: up[i] ? "translateY(0) scale(1)" : "translateY(60%) scale(0.4)",
                  opacity: up[i] ? 1 : 0,
                  transition: "transform 0.12s ease, opacity 0.12s ease",
                }}
              >
                {up[i] ?? ""}
              </span>
            </button>
          ))}
        </div>
      )}
    </ActivityShell>
  );
}
