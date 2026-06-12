import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { audio } from "../lib/audio";
import { useApp } from "../context/AppContext";

const PADS = [
  { freq: 261.63, color: "#ff5d5d" },
  { freq: 329.63, color: "#ffd23c" },
  { freq: 392.0, color: "#19c3b3" },
  { freq: 523.25, color: "#7c5cff" },
];

export function CopyTheTune({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, ageMode } = useApp();
  const target = ageMode === "younger" ? 4 : 6;
  const [seq, setSeq] = useState<number[]>([]);
  const [phase, setPhase] = useState<"intro" | "show" | "input" | "win">("intro");
  const [lit, setLit] = useState<number | null>(null);
  const inputIdx = useRef(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const flash = (pad: number, dur = 420) => {
    setLit(pad);
    audio.playNote(PADS[pad].freq, 0.5);
    const t = window.setTimeout(() => setLit((c) => (c === pad ? null : c)), dur);
    timers.current.push(t);
  };

  const showSequence = (s: number[]) => {
    setPhase("show");
    clearTimers();
    s.forEach((pad, i) => {
      const t = window.setTimeout(() => {
        flash(pad);
        if (i === s.length - 1) {
          const t2 = window.setTimeout(() => {
            inputIdx.current = 0;
            setPhase("input");
            speak("Your turn!");
          }, 600);
          timers.current.push(t2);
        }
      }, 700 + i * 650);
      timers.current.push(t);
    });
  };

  const begin = () => {
    tap();
    const first = [Math.floor(Math.random() * PADS.length)];
    setSeq(first);
    speak("Listen, then copy the tune!");
    const t = window.setTimeout(() => showSequence(first), 900);
    timers.current.push(t);
  };

  const press = (pad: number) => {
    if (phase !== "input") return;
    flash(pad, 220);
    tap();
    if (pad === seq[inputIdx.current]) {
      inputIdx.current += 1;
      if (inputIdx.current === seq.length) {
        // round complete
        if (seq.length >= target) {
          setPhase("win");
          return;
        }
        const next = [...seq, Math.floor(Math.random() * PADS.length)];
        setSeq(next);
        cheer("Nice! Listen again.");
        const t = window.setTimeout(() => showSequence(next), 1300);
        timers.current.push(t);
      }
    } else {
      oops("Oops! Listen again.");
      const t = window.setTimeout(() => showSequence(seq), 1300);
      timers.current.push(t);
    }
  };

  if (phase === "win") {
    return (
      <WinScreen
        activityId="copy-the-tune"
        stars={4}
        onBack={onBack}
        onReplay={() => {
          setSeq([]);
          setPhase("intro");
        }}
      />
    );
  }

  return (
    <ActivityShell
      onBack={() => {
        clearTimers();
        onBack();
      }}
      prompt={phase === "intro" ? <>Copy the Tune! 🎶</> : phase === "show" ? <>Listen… 👂</> : <>Your turn! 🎵</>}
      caption={`Repeat the tune (${seq.length || 1} so far)`}
    >
      {phase === "intro" ? (
        <button className="btn btn-teal" style={{ fontSize: 26, padding: "18px 32px" }} onClick={begin}>
          ▶️ Start!
        </button>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
            width: "min(380px, 86vw)",
            margin: "0 auto",
          }}
        >
          {PADS.map((p, i) => (
            <button
              key={i}
              aria-label={`pad ${i + 1}`}
              disabled={phase !== "input"}
              onClick={() => press(i)}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 24,
                border: "none",
                background: p.color,
                opacity: lit === i ? 1 : phase === "input" ? 0.85 : 0.6,
                transform: lit === i ? "scale(0.95)" : "none",
                boxShadow: lit === i ? "0 0 0 6px rgba(255,255,255,0.85) inset" : "var(--shadow)",
                transition: "all 0.12s ease",
                cursor: phase === "input" ? "pointer" : "default",
              }}
            />
          ))}
        </div>
      )}
    </ActivityShell>
  );
}
