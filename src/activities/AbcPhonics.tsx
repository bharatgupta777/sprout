import { useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { LETTERS, type LetterEntry } from "../content/letters";
import { useApp } from "../context/AppContext";

export function AbcPhonics({ onBack }: { onBack: () => void }) {
  const { speakSequence, speak, tap, award } = useApp();
  const [active, setActive] = useState<LetterEntry>(LETTERS[0]);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [confetti, setConfetti] = useState(0);
  const [rewarded, setRewarded] = useState(false);

  const choose = (l: LetterEntry) => {
    tap();
    setActive(l);
    speakSequence([l.name, l.sound, l.word], 360);
    setSeen((prev) => {
      const next = new Set(prev);
      next.add(l.letter);
      if (next.size >= 8 && !rewarded) {
        setRewarded(true);
        setConfetti((c) => c + 1);
        award(3, "abc-phonics");
        setTimeout(() => speak("You explored so many letters! Great job!", { pitch: 1.2 }), 1400);
      }
      return next;
    });
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Tap a letter to hear it</>}
      caption="Letter name, sound, and a word"
      onReplay={() => speakSequence([active.name, active.sound, active.word], 360)}
    >
      <Confetti fire={confetti} />
      <div className="story-card" style={{ marginBottom: 18 }}>
        <div style={{ fontSize: "clamp(60px,16vw,120px)", fontWeight: 900, color: "var(--primary-dark)" }}>
          {active.letter}
          <span style={{ fontSize: "0.5em", color: "var(--ink-soft)" }}>{active.letter.toLowerCase()}</span>
        </div>
        <div className="story-art">{active.emoji}</div>
        <div className="story-text">
          {active.sound} … {active.word}
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))" }}>
        {LETTERS.map((l) => (
          <button
            key={l.letter}
            className="big-choice"
            style={{
              fontSize: "clamp(24px,6vw,38px)",
              borderColor: seen.has(l.letter) ? "var(--leaf)" : undefined,
              background: active.letter === l.letter ? "#f2ecff" : undefined,
            }}
            aria-label={`Letter ${l.name}`}
            onClick={() => choose(l)}
          >
            {l.letter}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
