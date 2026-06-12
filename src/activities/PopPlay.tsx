import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { useApp } from "../context/AppContext";
import { pick } from "../lib/random";

// A pure cause-and-effect playground for the very youngest: tap anything and a
// happy thing happens. No prompts, no scoring, no wrong answers.
const ITEMS: { emoji: string; name: string }[] = [
  { emoji: "🐶", name: "Puppy!" }, { emoji: "🐱", name: "Kitty!" },
  { emoji: "🐰", name: "Bunny!" }, { emoji: "🐥", name: "Chick!" },
  { emoji: "🐸", name: "Frog!" }, { emoji: "🦋", name: "Butterfly!" },
  { emoji: "🐠", name: "Fish!" }, { emoji: "⭐", name: "Star!" },
  { emoji: "🌈", name: "Rainbow!" }, { emoji: "🎈", name: "Balloon!" },
  { emoji: "🍎", name: "Apple!" }, { emoji: "🌸", name: "Flower!" },
  { emoji: "☀️", name: "Sunshine!" }, { emoji: "🐝", name: "Bee!" },
  { emoji: "🚗", name: "Car!" }, { emoji: "🦆", name: "Duck!" },
];

interface Bubble {
  key: number;
  emoji: string;
  name: string;
  popped: boolean;
}

const BUBBLE_COLORS = ["#ffd9ec", "#d9ecff", "#e0ffe6", "#fff0cc", "#efe0ff", "#ffe0d6"];

export function PopPlay({ onBack }: { onBack: () => void }) {
  const { speak, tap, award } = useApp();
  const keyRef = useRef(0);
  const tapsRef = useRef(0);
  const [confetti, setConfetti] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const makeBubble = (): Bubble => {
    const item = pick(ITEMS);
    return { key: keyRef.current++, emoji: item.emoji, name: item.name, popped: false };
  };

  useEffect(() => {
    setBubbles(Array.from({ length: 6 }, makeBubble));
    const t = setTimeout(() => speak("Tap the bubbles!"), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pop = (b: Bubble) => {
    if (b.popped) return;
    tap();
    speak(b.name, { pitch: 1.3 });
    setBubbles((prev) => prev.map((x) => (x.key === b.key ? { ...x, popped: true } : x)));
    // Replace the popped bubble with a fresh one so the screen never empties.
    setTimeout(() => {
      setBubbles((prev) => prev.map((x) => (x.key === b.key ? makeBubble() : x)));
    }, 450);

    tapsRef.current += 1;
    if (tapsRef.current % 6 === 0) {
      setConfetti((c) => c + 1);
      award(1, "pop-play");
    }
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Tap the bubbles! 🫧</>}
      caption="Tap anything — it's all fun!"
      onReplay={() => speak("Tap the bubbles!")}
    >
      <Confetti fire={confetti} />
      <div
        className="choice-grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", maxWidth: 520, margin: "0 auto" }}
      >
        {bubbles.map((b, i) => (
          <button
            key={b.key}
            className="big-choice"
            aria-label={b.name}
            onClick={() => pop(b)}
            style={{
              border: "none",
              background: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
              borderRadius: "50%",
              fontSize: "clamp(40px,11vw,72px)",
              transform: b.popped ? "scale(0.2)" : "scale(1)",
              opacity: b.popped ? 0 : 1,
              transition: "transform 0.35s ease, opacity 0.35s ease",
            }}
          >
            {b.emoji}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
