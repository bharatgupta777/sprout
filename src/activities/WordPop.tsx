import { useEffect, useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { useApp } from "../context/AppContext";

const WORDS = [
  { word: "Milk", emoji: "🥛" },
  { word: "Water", emoji: "💧" },
  { word: "Banana", emoji: "🍌" },
  { word: "Juice", emoji: "🧃" },
  { word: "Ball", emoji: "⚽" },
  { word: "Dog", emoji: "🐶" },
  { word: "Cat", emoji: "🐱" },
  { word: "Star", emoji: "⭐" },
];

function randomWords(word: string) {
  const targets = WORDS.filter((item) => item.word === word);
  const distractors = WORDS.filter((item) => item.word !== word);
  const list = [targets[0], ...distractors.sort(() => Math.random() - 0.5).slice(0, 5)];
  return list.sort(() => Math.random() - 0.5);
}

export function WordPop({ onBack }: { onBack: () => void }) {
  const { speak, tap, award } = useApp();
  const [targetIndex, setTargetIndex] = useState(0);
  const [poppedCount, setPoppedCount] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const target = WORDS[targetIndex];
  const targetWords = useMemo(() => randomWords(target.word), [target]);

  useEffect(() => {
    setPoppedCount(0);
    const t = setTimeout(() => speak(`Pop the ${target.word} bubbles!`), 220);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIndex]);

  const pop = (word: string) => {
    tap();
    speak(word, { pitch: 1.2 });
    if (word === target.word) {
      setPoppedCount((count) => count + 1);
      setConfetti((c) => c + 1);
      if (poppedCount + 1 >= 3) {
        const next = (targetIndex + 1) % WORDS.length;
        setTargetIndex(next);
        award(1, "word-pop");
      }
    }
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Word bubble pop</>}
      caption={`Tap the ${target.word} bubbles.`}
      onReplay={() => speak(`Tap the ${target.word} bubbles.`)}
    >
      <Confetti fire={confetti} />
      <div
        className="choice-grid"
        style={{ gridTemplateColumns: "repeat(3, minmax(100px,1fr))", maxWidth: 520, margin: "0 auto" }}
      >
        {targetWords.map((item, index) => (
          <button
            key={`${item.word}-${index}`}
            className="big-choice"
            style={{ height: 120, fontSize: "clamp(20px, 4vw, 28px)" }}
            onClick={() => pop(item.word)}
          >
            <div>{item.emoji}</div>
            <div style={{ marginTop: 8, fontSize: 18, fontWeight: 800 }}>{item.word}</div>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
