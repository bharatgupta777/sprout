import { useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { WORD_CATEGORIES, type WordCategory, type WordItem } from "../content/firstWords";
import { useApp } from "../context/AppContext";

export function FirstWords({ onBack }: { onBack: () => void }) {
  const { speak, tap, award } = useApp();
  const [cat, setCat] = useState<WordCategory | null>(null);
  const [active, setActive] = useState<WordItem | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [confetti, setConfetti] = useState(0);
  const rewarded = useState({ done: false })[0];

  if (!cat) {
    return (
      <ActivityShell onBack={onBack} prompt={<>Pick a word group</>} caption="Tap a card to explore words">
        <div className="grid">
          {WORD_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className="tile c-sky"
              onClick={() => {
                tap();
                speak(c.title);
                setCat(c);
                setActive(null);
                setSeen(new Set());
              }}
            >
              <span className="emoji">{c.emoji}</span>
              <span className="label">{c.title}</span>
            </button>
          ))}
        </div>
      </ActivityShell>
    );
  }

  const choose = (item: WordItem) => {
    tap();
    setActive(item);
    speak(item.word, { pitch: 1.15 });
    setSeen((prev) => {
      const next = new Set(prev);
      next.add(item.word);
      if (next.size >= 6 && !rewarded.done) {
        rewarded.done = true;
        setConfetti((x) => x + 1);
        award(3, "first-words");
        setTimeout(() => speak("So many new words! Great talking!", { expressive: true }), 1100);
      }
      return next;
    });
  };

  return (
    <ActivityShell
      onBack={() => setCat(null)}
      prompt={<>{cat.emoji} {cat.title}</>}
      caption="Tap a picture to hear the word"
      onReplay={active ? () => speak(active.word) : undefined}
    >
      <Confetti fire={confetti} />
      {active && (
        <div className="story-card" style={{ marginBottom: 14 }}>
          <div className="story-art">{active.emoji}</div>
          <div className="story-text">{active.word}</div>
        </div>
      )}
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))" }}>
        {cat.items.map((item) => (
          <button
            key={item.word}
            className="big-choice"
            style={{ fontSize: "clamp(34px,8vw,52px)", borderColor: seen.has(item.word) ? "var(--leaf)" : undefined }}
            aria-label={item.word}
            onClick={() => choose(item)}
          >
            {item.emoji}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
