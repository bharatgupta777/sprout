import { useEffect, useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

const POOL = ["🔴", "🔵", "🟡", "🟢", "⭐", "❤️", "🍎", "🍌", "🐱", "🐶", "🌸", "🌙"];

interface Round {
  sequence: string[];
  answer: string;
  options: string[];
}

function buildRound(harder: boolean): Round {
  const items = sample(POOL, harder ? 3 : 2);
  const [a, b, c] = items;
  // Choose a pattern template.
  const templates = harder
    ? [
        [a, b, c, a, b, c, a], // ABC...A  -> next b
        [a, a, b, a, a, b, a], // AAB...   -> next a
        [a, b, b, a, b, b, a], // ABB...   -> next b
      ]
    : [
        [a, b, a, b, a, b], // AB -> next a
        [a, a, b, a, a, b], // AAB -> next a... compute
        [a, b, b, a, b, b], // ABB
      ];
  const full = templates[Math.floor(Math.random() * templates.length)];
  const sequence = full.slice(0, full.length - 1);
  const answer = full[full.length - 1];
  const distractPool = items.filter((x) => x !== answer);
  const options = shuffle([answer, ...sample(distractPool.length ? distractPool : POOL, 2)]).slice(0, 3);
  if (!options.includes(answer)) options[0] = answer;
  return { sequence, answer, options: shuffle(options) };
}

export function Patterns({ onBack }: { onBack: () => void }) {
  const { ageMode, speak, cheer, oops, tap } = useApp();
  const [seed, setSeed] = useState(0);
  const roundCount = ageMode === "younger" ? 4 : 6;
  const rounds = useMemo(
    () => Array.from({ length: roundCount }, () => buildRound(ageMode === "older")),
    [seed, roundCount, ageMode],
  );
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = rounds[idx];

  useEffect(() => {
    setPicked(null);
    setWrong(null);
    const t = setTimeout(() => speak("What comes next?"), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, seed]);

  if (done) {
    return (
      <WinScreen
        activityId="patterns"
        stars={3}
        onBack={onBack}
        onReplay={() => {
          setIdx(0);
          setDone(false);
          setSeed((s) => s + 1);
        }}
      />
    );
  }

  const pick = (opt: string) => {
    if (picked) return;
    if (opt === round.answer) {
      tap();
      setPicked(opt);
      setTimeout(() => cheer(), 500);
      setTimeout(() => {
        if (idx + 1 >= rounds.length) setDone(true);
        else setIdx((i) => i + 1);
      }, 1600);
    } else {
      setWrong(opt);
      oops();
      setTimeout(() => setWrong(null), 600);
    }
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>What comes next? 🤔</>}
      caption="Look at the pattern, then tap what's next"
      onReplay={() => speak("What comes next?")}
      total={rounds.length}
      current={idx}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
          fontSize: "clamp(34px,9vw,56px)",
          marginBottom: 18,
        }}
      >
        {round.sequence.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
        <span
          style={{
            border: "4px dashed var(--primary)",
            borderRadius: 14,
            padding: "0 10px",
            color: "var(--primary)",
          }}
        >
          ?
        </span>
      </div>
      <div className="choice-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {round.options.map((opt, i) => (
          <button
            key={`${opt}-${i}`}
            className={`big-choice${picked === opt ? " correct" : ""}${wrong === opt ? " wrong" : ""}${
              picked && picked !== opt ? " dim" : ""
            }`}
            aria-label={`option ${opt}`}
            onClick={() => pick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
