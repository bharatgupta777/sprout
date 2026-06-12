import { useEffect, useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

const DECK = ["🐶", "🐱", "🐰", "🦊", "🐸", "🐵", "🐼", "🦁", "🐯", "🐷", "🐮", "🦄"];

interface Card {
  key: number;
  emoji: string;
  matched: boolean;
}

export function MemoryMatch({ onBack }: { onBack: () => void }) {
  const { ageMode, speak, cheer, oops, tap } = useApp();
  const [seed, setSeed] = useState(0);
  const pairCount = ageMode === "younger" ? 3 : 6;

  const cards = useMemo<Card[]>(() => {
    const chosen = sample(DECK, pairCount);
    const doubled = [...chosen, ...chosen];
    return shuffle(doubled).map((emoji, i) => ({ key: i, emoji, matched: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, pairCount]);

  const [board, setBoard] = useState<Card[]>(cards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setBoard(cards);
    setFlipped([]);
    setBusy(false);
    speak("Find the matching pairs! Tap a card.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const allMatched = board.length > 0 && board.every((c) => c.matched);
  if (allMatched) {
    return (
      <WinScreen
        activityId="memory-match"
        stars={4}
        onBack={onBack}
        onReplay={() => setSeed((s) => s + 1)}
      />
    );
  }

  const flip = (key: number) => {
    if (busy) return;
    const card = board.find((c) => c.key === key);
    if (!card || card.matched || flipped.includes(key)) return;
    tap();
    const nextFlipped = [...flipped, key];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setBusy(true);
      const [a, b] = nextFlipped.map((k) => board.find((c) => c.key === k)!);
      if (a.emoji === b.emoji) {
        setTimeout(() => {
          setBoard((prev) => prev.map((c) => (c.emoji === a.emoji ? { ...c, matched: true } : c)));
          setFlipped([]);
          setBusy(false);
          cheer("Match!");
        }, 650);
      } else {
        oops("Not a match. Try again!");
        setTimeout(() => {
          setFlipped([]);
          setBusy(false);
        }, 1100);
      }
    }
  };

  const cols = pairCount <= 3 ? 3 : 4;

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Find the matching pairs!</>}
      caption="Tap two cards that are the same"
      onReplay={() => speak("Find the matching pairs! Tap a card.")}
    >
      <div
        className="choice-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: 520, margin: "0 auto" }}
      >
        {board.map((c) => {
          const show = c.matched || flipped.includes(c.key);
          return (
            <button
              key={c.key}
              className={`big-choice${c.matched ? " correct" : ""}`}
              style={{ fontSize: "clamp(34px,9vw,60px)", background: show ? undefined : "var(--primary)" }}
              aria-label={show ? c.emoji : "hidden card"}
              onClick={() => flip(c.key)}
            >
              {show ? c.emoji : "❓"}
            </button>
          );
        })}
      </div>
    </ActivityShell>
  );
}
