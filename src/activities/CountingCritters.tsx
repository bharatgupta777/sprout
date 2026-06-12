import { useEffect, useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { NUMBERS, numberWord } from "../content/numbers";
import { useApp } from "../context/AppContext";
import { pick } from "../lib/random";

interface Round {
  count: number;
  emoji: string;
}

export function CountingCritters({ onBack }: { onBack: () => void }) {
  const { ageMode, speak, cheer, tap } = useApp();
  const [seed, setSeed] = useState(0);
  const max = ageMode === "younger" ? 5 : 10;
  const roundCount = ageMode === "younger" ? 4 : 5;

  const rounds = useMemo<Round[]>(() => {
    const pool = NUMBERS.filter((x) => x.n <= max && x.n >= 1);
    return Array.from({ length: roundCount }, () => {
      const e = pick(pool);
      const count = 1 + Math.floor(Math.random() * max);
      return { count, emoji: e.emoji };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, max, roundCount]);

  const [idx, setIdx] = useState(0);
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const round = rounds[idx];

  useEffect(() => {
    setTapped(new Set());
    const t = setTimeout(() => speak("Tap each one and count with me!"), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, seed]);

  if (done) {
    return (
      <WinScreen
        activityId="counting-critters"
        stars={3}
        onBack={onBack}
        onReplay={() => {
          setIdx(0);
          setDone(false);
          setTapped(new Set());
          setSeed((s) => s + 1);
        }}
      />
    );
  }

  const handleTap = (i: number) => {
    if (tapped.has(i)) return;
    tap();
    const next = new Set(tapped);
    next.add(i);
    setTapped(next);
    speak(numberWord(next.size), { pitch: 1.2 });
    if (next.size === round.count) {
      setTimeout(() => speak(`There are ${round.count}!`, { pitch: 1.2 }), 700);
      setTimeout(() => cheer("Perfect counting!"), 1500);
      setTimeout(() => {
        if (idx + 1 >= rounds.length) setDone(true);
        else setIdx((x) => x + 1);
      }, 2600);
    }
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Tap and count them all!</>}
      caption={`Count to ${round.count}`}
      onReplay={() => speak("Tap each one and count with me.")}
      total={rounds.length}
      current={idx}
    >
      <div className="pill" style={{ fontSize: 30, margin: "0 auto 14px" }}>
        {tapped.size} / {round.count}
      </div>
      <div
        className="choice-grid"
        style={{ gridTemplateColumns: `repeat(${Math.min(round.count, 5)}, 1fr)`, maxWidth: 520, margin: "0 auto" }}
      >
        {Array.from({ length: round.count }, (_, i) => (
          <button
            key={i}
            className="big-choice"
            style={{
              fontSize: "clamp(36px,9vw,64px)",
              border: "none",
              boxShadow: "var(--shadow-press)",
              transform: tapped.has(i) ? "scale(1.05)" : undefined,
              opacity: tapped.has(i) ? 1 : 0.85,
              background: tapped.has(i) ? "#eafff0" : "var(--card)",
            }}
            aria-label={round.emoji}
            onClick={() => handleTap(i)}
          >
            {round.emoji}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
