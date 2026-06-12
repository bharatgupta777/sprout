import { useEffect, useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { MANNERS, type MannerScene } from "../content/manners";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function GoodManners({ onBack }: { onBack: () => void }) {
  const { ageMode, speak, cheer, tap } = useApp();
  const [seed, setSeed] = useState(0);
  const roundCount = ageMode === "younger" ? 4 : 6;

  const scenes = useMemo<MannerScene[]>(
    () => sample(MANNERS, roundCount).map((s) => ({ ...s, options: shuffle(s.options) })),
    [seed, roundCount],
  );

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const scene = scenes[idx];

  useEffect(() => {
    setPicked(null);
    const t = setTimeout(() => speak(scene.prompt), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, seed]);

  if (done) {
    return (
      <WinScreen
        activityId="good-manners"
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

  const choose = (i: number) => {
    if (picked !== null) return;
    const opt = scene.options[i];
    tap();
    // Speak the choice so the child hears what it means.
    speak(opt.phrase, { pitch: opt.good ? 1.2 : 1.0 });
    if (opt.good) {
      setPicked(i);
      setTimeout(() => cheer("That's so kind!"), 1100);
      setTimeout(() => {
        if (idx + 1 >= scenes.length) setDone(true);
        else setIdx((x) => x + 1);
      }, 2400);
    } else {
      setTimeout(() => speak("Hmm, let's be kind. Try again!"), 1300);
    }
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>What's the kind thing to do? 💛</>}
      caption="Tap a choice to hear it, then pick the kind one"
      onReplay={() => speak(scene.prompt)}
      total={scenes.length}
      current={idx}
    >
      <div className="story-card" style={{ marginBottom: 16, padding: "18px 22px" }}>
        <div className="story-text" style={{ fontSize: "clamp(18px,3.6vw,24px)" }}>
          {scene.prompt}
        </div>
      </div>
      <div
        className="choice-grid"
        style={{ gridTemplateColumns: `repeat(${scene.options.length <= 2 ? 2 : 3}, 1fr)` }}
      >
        {scene.options.map((opt, i) => (
          <button
            key={i}
            className={`big-choice${picked === i ? " correct" : ""}${picked !== null && picked !== i ? " dim" : ""}`}
            aria-label={opt.phrase}
            onClick={() => choose(i)}
          >
            {opt.emoji}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
