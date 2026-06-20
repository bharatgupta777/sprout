import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const OBJECTS = [
  { label: "Toy", emoji: "🧸" },
  { label: "Book", emoji: "📚" },
  { label: "Shoe", emoji: "👟" },
  { label: "Cup", emoji: "🥤" },
  { label: "Ball", emoji: "⚽" },
  { label: "Cat", emoji: "🐱" },
  { label: "Duck", emoji: "🦆" },
  { label: "Hat", emoji: "🎩" },
  { label: "Flower", emoji: "🌸" },
  { label: "Star", emoji: "⭐" },
];

const ROUNDS = [
  { prompt: "Where is the toy?", answer: "Toy" },
  { prompt: "Where is the ball?", answer: "Ball" },
  { prompt: "Where is the book?", answer: "Book" },
  { prompt: "Where is the cat?", answer: "Cat" },
];

export function ObjectFinder({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = ROUNDS[index];
  const options = useMemo(
    () => OBJECTS.sort(() => Math.random() - 0.5).slice(0, 6).concat(OBJECTS.find((o) => o.label === round.answer) ?? []).sort(() => Math.random() - 0.5),
    [round],
  );

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Nice find!");
      setTimeout(() => {
        if (index + 1 >= ROUNDS.length) {
          setDone(true);
          award(3, "object-finder");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Not that one. Look again.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="object-finder" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Where is the object?</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(120px,1fr))", gap: 14 }}>
        {options.map((item) => (
          <button
            key={item.label}
            className={`tile c-coral${selected === item.label ? " selected" : ""}`}
            onClick={() => handleChoose(item.label)}
            aria-label={item.label}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">{item.emoji}</span>
            <span className="label">{item.label}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
