import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const TASKS = [
  {
    prompt: "Set the dining table for dinner.",
    choices: ["Plate", "Pillow", "Shoe", "Brush"],
    answer: "Plate",
    emoji: "🍽️",
  },
  {
    prompt: "Iron the shirt so it looks nice.",
    choices: ["Iron", "Book", "Banana", "Toy"],
    answer: "Iron",
    emoji: "👕",
  },
  {
    prompt: "Pack your bag for school.",
    choices: ["Backpack", "Spoon", "Plant", "Ball"],
    answer: "Backpack",
    emoji: "🎒",
  },
  {
    prompt: "Clean the floor with a mop.",
    choices: ["Mop", "Cup", "Clock", "Hat"],
    answer: "Mop",
    emoji: "🧹",
  },
  {
    prompt: "Fold the laundry after washing.",
    choices: ["Shirt", "Ball", "Phone", "Spoon"],
    answer: "Shirt",
    emoji: "🧺",
  },
];

export function PretendHome({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = TASKS[index];
  const buttons = useMemo(() => [...round.choices].sort(() => Math.random() - 0.5), [round]);

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Perfect! You're helping at home.");
      setTimeout(() => {
        if (index + 1 >= TASKS.length) {
          setDone(true);
          award(4, "pretend-home");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Try again with the right item.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="pretend-home" stars={4} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Pretend home tasks</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="story-card" style={{ marginBottom: 16 }}>
        <div className="story-art">{round.emoji}</div>
        <div className="story-text">{round.prompt}</div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(120px,1fr))" }}>
        {buttons.map((choice) => (
          <button
            key={choice}
            className={`tile c-sun${selected === choice ? " selected" : ""}`}
            onClick={() => handleChoose(choice)}
            aria-label={choice}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">{choice === "Plate" ? "🍽️" : choice === "Iron" ? "🛠️" : choice === "Backpack" ? "🎒" : choice === "Mop" ? "🧽" : choice === "Shirt" ? "👕" : "🧸"}</span>
            <span className="label">{choice}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
