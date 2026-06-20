import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const EMOTIONS = [
  {
    prompt: "Who feels excited about the surprise?",
    answer: "🎉",
    options: ["😢", "😡", "🎉", "😴"],
  },
  {
    prompt: "Who is feeling shy at the party?",
    answer: "😳",
    options: ["😃", "😳", "😠", "😎"],
  },
  {
    prompt: "Who feels calm and cozy?",
    answer: "😌",
    options: ["😌", "😰", "😠", "😵"],
  },
  {
    prompt: "Who is laughing with joy?",
    answer: "😂",
    options: ["😡", "😴", "😂", "😔"],
  },
];

export function EmotionMatch({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = EMOTIONS[index];
  const options = useMemo(() => [...round.options].sort(() => Math.random() - 0.5), [round]);

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Yes! You can read feelings.");
      setTimeout(() => {
        if (index + 1 >= EMOTIONS.length) {
          setDone(true);
          award(3, "emotion-recognition");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Not quite, look again.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="emotion-recognition" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Feelings and faces</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(80px,1fr))", gap: 14 }}>
        {options.map((emoji) => (
          <button
            key={emoji}
            className={`big-choice${selected === emoji ? " selected" : ""}`}
            onClick={() => handleChoose(emoji)}
            aria-label={emoji}
          >
            {emoji}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
