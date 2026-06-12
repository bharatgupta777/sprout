import { useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { audio } from "../lib/audio";
import { useApp } from "../context/AppContext";

// C-major scale, rainbow xylophone bars.
const BARS = [
  { note: "C", freq: 261.63, color: "#ff5d5d" },
  { note: "D", freq: 293.66, color: "#ff9f43" },
  { note: "E", freq: 329.63, color: "#ffd23c" },
  { note: "F", freq: 349.23, color: "#4cc66a" },
  { note: "G", freq: 392.0, color: "#19c3b3" },
  { note: "A", freq: 440.0, color: "#4cb8ff" },
  { note: "B", freq: 493.88, color: "#7c5cff" },
  { note: "C2", freq: 523.25, color: "#ff6fb5" },
];

// Twinkle Twinkle melody as bar indices.
const TWINKLE = [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0];

export function MusicMaker({ onBack }: { onBack: () => void }) {
  const { tap, award, cheer } = useApp();
  const [lit, setLit] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const tapsRef = useRef(0);
  const rewarded = useRef(false);
  const timers = useRef<number[]>([]);

  const hit = (i: number) => {
    audio.playNote(BARS[i].freq);
    setLit(i);
    setTimeout(() => setLit((cur) => (cur === i ? null : cur)), 220);
    tap();
    tapsRef.current += 1;
    if (tapsRef.current === 8 && !rewarded.current) {
      rewarded.current = true;
      setConfetti((c) => c + 1);
      award(2, "music-maker");
    }
  };

  const playSong = () => {
    if (playing) return;
    setPlaying(true);
    TWINKLE.forEach((bar, step) => {
      const t = window.setTimeout(() => {
        audio.playNote(BARS[bar].freq, 0.5);
        setLit(bar);
        setTimeout(() => setLit((cur) => (cur === bar ? null : cur)), 300);
        if (step === TWINKLE.length - 1) {
          setPlaying(false);
          setConfetti((c) => c + 1);
          if (!rewarded.current) {
            rewarded.current = true;
            award(2, "music-maker");
          }
          setTimeout(() => cheer("What a lovely song!"), 500);
        }
      }, step * 480);
      timers.current.push(t);
    });
  };

  return (
    <ActivityShell
      onBack={() => {
        timers.current.forEach(clearTimeout);
        onBack();
      }}
      prompt={<>Make some music! 🎶</>}
      caption="Tap the colorful bars to play notes"
    >
      <Confetti fire={confetti} />
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
          justifyContent: "center",
          height: "min(46vh, 360px)",
          width: "100%",
          maxWidth: 560,
          margin: "0 auto",
        }}
      >
        {BARS.map((b, i) => (
          <button
            key={b.note}
            aria-label={`Note ${b.note}`}
            onClick={() => hit(i)}
            style={{
              flex: 1,
              height: `${55 + i * 5}%`,
              background: b.color,
              border: "none",
              borderRadius: 16,
              boxShadow: lit === i ? "0 0 0 5px rgba(255,255,255,0.9) inset" : "var(--shadow)",
              transform: lit === i ? "translateY(8px) scale(0.97)" : "none",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <button
        className="btn btn-teal"
        style={{ marginTop: 18 }}
        disabled={playing}
        onClick={() => {
          tap();
          playSong();
        }}
      >
        {playing ? "🎵 Playing…" : "▶️ Play Twinkle Twinkle"}
      </button>
    </ActivityShell>
  );
}
