import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const SOUNDS = [
  { prompt: "Finish the word: B- - g.", answer: "Ball", choices: ["Ball", "Bug", "Bag", "Bat"] },
  { prompt: "Finish the word: K- - t.", answer: "Kit", choices: ["Cat", "Kit", "Kid", "Key"] },
  { prompt: "Finish the word: B- - na.", answer: "Banana", choices: ["Banana", "Bandana", "Banda", "Bingo"] },
  { prompt: "Finish the word: W- - ter.", answer: "Water", choices: ["Water", "Winter", "Waiter", "Walker"] },
];

export function FinishSound({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = SOUNDS[index];
  const choices = useMemo(() => [...round.choices].sort(() => Math.random() - 0.5), [round]);

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Yes! That's the right sound.");
      setTimeout(() => {
        if (index + 1 >= SOUNDS.length) {
          setDone(true);
          award(3, "finish-the-sound");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Try again. Listen to the sound.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="finish-the-sound" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Finish the sound</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(120px,1fr))", gap: 14 }}>
        {choices.map((choice) => (
          <button
            key={choice}
            className={`tile c-coral${selected === choice ? " selected" : ""}`}
            onClick={() => handleChoose(choice)}
            aria-label={choice}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">{choice === "Ball" ? "⚽" : choice === "Kit" ? "🧷" : choice === "Banana" ? "🍌" : choice === "Water" ? "💧" : "🎵"}</span>
            <span className="label">{choice}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
