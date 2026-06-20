import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const SNACKS = [
  { prompt: "Tap the milk your tummy asked for.", answer: "Milk", options: ["Milk", "Cookie", "Toy", "Ball"], emoji: "🥛" },
  { prompt: "Tap the water to drink.", answer: "Water", options: ["Water", "Juice", "Apple", "Hat"], emoji: "💧" },
  { prompt: "Tap the banana for a yummy snack.", answer: "Banana", options: ["Banana", "Car", "Shoe", "Book"], emoji: "🍌" },
  { prompt: "Tap the juice box ready to sip.", answer: "Juice", options: ["Juice", "Pillow", "Crayon", "Bear"], emoji: "🧃" },
];

export function RequestSnack({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = SNACKS[index];
  const options = useMemo(() => [...round.options].sort(() => Math.random() - 0.5), [round]);

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Yay! That's what you asked for.");
      setTimeout(() => {
        if (index + 1 >= SNACKS.length) {
          setDone(true);
          award(3, "toddler-requests");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Not quite. Try the right item.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="toddler-requests" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>I want milk, water, banana, juice</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="story-card" style={{ marginBottom: 16 }}>
        <div className="story-art">{round.emoji}</div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(120px,1fr))", gap: 14 }}>
        {options.map((choice) => (
          <button
            key={choice}
            className={`tile c-pink${selected === choice ? " selected" : ""}`}
            onClick={() => handleChoose(choice)}
            aria-label={choice}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">{choice === "Milk" ? "🥛" : choice === "Water" ? "💧" : choice === "Banana" ? "🍌" : choice === "Juice" ? "🧃" : "🍪"}</span>
            <span className="label">{choice}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
