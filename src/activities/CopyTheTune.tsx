import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { audio } from "../lib/audio";
import { useApp } from "../context/AppContext";

// A little rainbow scale: C D E F G A C(high). Tunes are sequences of these pad indexes.
const PADS = [
  { name: "C", freq: 261.63, color: "#ff5d5d" },
  { name: "D", freq: 293.66, color: "#ff9f43" },
  { name: "E", freq: 329.63, color: "#ffd23c" },
  { name: "F", freq: 349.23, color: "#2bd576" },
  { name: "G", freq: 392.0, color: "#19c3b3" },
  { name: "A", freq: 440.0, color: "#4d8bff" },
  { name: "C²", freq: 523.25, color: "#7c5cff" },
];

interface Tune {
  id: string;
  label: string;
  emoji: string;
  notes: number[];
}

const TUNES: Tune[] = [
  { id: "twinkle", label: "Twinkle Twinkle", emoji: "⭐", notes: [0, 0, 4, 4, 5, 5, 4] },
  { id: "mary", label: "Mary's Lamb", emoji: "🐑", notes: [2, 1, 0, 1, 2, 2, 2] },
  { id: "hotcross", label: "Hot Cross Buns", emoji: "🍞", notes: [2, 1, 0, 2, 1, 0] },
  { id: "macdonald", label: "Old MacDonald", emoji: "🚜", notes: [0, 0, 0, 4, 5, 5, 4] },
  { id: "london", label: "London Bridge", emoji: "🌉", notes: [4, 5, 4, 3, 2, 3, 4] },
  { id: "baabaa", label: "Baa Baa Sheep", emoji: "🐏", notes: [0, 0, 4, 4, 5, 5, 5, 4] },
];

export function CopyTheTune({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, ageMode } = useApp();
  const surpriseTarget = ageMode === "younger" ? 4 : 6;
  const [seq, setSeq] = useState<number[]>([]);
  const [phase, setPhase] = useState<"intro" | "show" | "input" | "win">("intro");
  const [lit, setLit] = useState<number | null>(null);
  const [title, setTitle] = useState("Copy the Tune!");
  const tuneRef = useRef<number[] | null>(null); // null = surprise (random) mode
  const inputIdx = useRef(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const rand = () => Math.floor(Math.random() * PADS.length);

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
      }, 700 + i * 600);
      timers.current.push(t);
    });
  };

  const startGame = (tune: Tune | null) => {
    tap();
    clearTimers();
    tuneRef.current = tune ? tune.notes : null;
    setTitle(tune ? tune.label : "Surprise Tune");
    const first = tune ? tune.notes.slice(0, Math.min(2, tune.notes.length)) : [rand()];
    setSeq(first);
    speak(tune ? `Listen, then copy ${tune.label}!` : "Listen, then copy the tune!");
    const t = window.setTimeout(() => showSequence(first), 950);
    timers.current.push(t);
  };

  const press = (pad: number) => {
    if (phase !== "input") return;
    flash(pad, 220);
    tap();
    if (pad === seq[inputIdx.current]) {
      inputIdx.current += 1;
      if (inputIdx.current === seq.length) {
        const tune = tuneRef.current;
        const reachedEnd = tune ? seq.length >= tune.length : seq.length >= surpriseTarget;
        if (reachedEnd) {
          setPhase("win");
          return;
        }
        const next = tune ? tune.slice(0, seq.length + 1) : [...seq, rand()];
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

  const goal = tuneRef.current ? tuneRef.current.length : surpriseTarget;

  return (
    <ActivityShell
      onBack={() => {
        clearTimers();
        onBack();
      }}
      prompt={
        phase === "intro" ? (
          <>Pick a Tune! 🎶</>
        ) : phase === "show" ? (
          <>Listen… 👂 {title}</>
        ) : (
          <>Your turn! 🎵</>
        )
      }
      caption={phase === "intro" ? "Choose a song to copy — or a surprise!" : `${title} · note ${seq.length} of ${goal}`}
    >
      {phase === "intro" ? (
        <div className="choice-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", maxWidth: 460, gap: 12 }}>
          {TUNES.map((t) => (
            <button
              key={t.id}
              className="btn btn-ghost"
              style={{ padding: "16px 10px", fontSize: 17, display: "flex", flexDirection: "column", gap: 4 }}
              onClick={() => startGame(t)}
            >
              <span style={{ fontSize: 34 }}>{t.emoji}</span>
              {t.label}
            </button>
          ))}
          <button
            className="btn btn-teal"
            style={{ padding: "16px 10px", fontSize: 17, display: "flex", flexDirection: "column", gap: 4 }}
            onClick={() => startGame(null)}
          >
            <span style={{ fontSize: 34 }}>🎲</span>
            Surprise!
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 8,
            width: "min(560px, 95vw)",
            margin: "0 auto",
            alignItems: "stretch",
          }}
        >
          {PADS.map((p, i) => (
            <button
              key={i}
              aria-label={`note ${p.name}`}
              disabled={phase !== "input"}
              onClick={() => press(i)}
              style={{
                flex: 1,
                height: "clamp(120px, 34vw, 180px)",
                borderRadius: 16,
                border: "none",
                background: p.color,
                opacity: lit === i ? 1 : phase === "input" ? 0.9 : 0.55,
                transform: lit === i ? "translateY(4px) scale(0.97)" : "none",
                boxShadow: lit === i ? "0 0 0 5px rgba(255,255,255,0.85) inset" : "var(--shadow)",
                transition: "all 0.1s ease",
                cursor: phase === "input" ? "pointer" : "default",
              }}
            />
          ))}
        </div>
      )}
    </ActivityShell>
  );
}
