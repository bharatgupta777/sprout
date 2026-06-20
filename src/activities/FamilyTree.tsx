import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const FAMILY_ROUNDS = [
  {
    prompt: "Who is your Nani?",
    answer: "Nani",
    options: ["Nani", "Mama", "Papa", "Chachu"],
  },
  {
    prompt: "Who is your Mama?",
    answer: "Mama",
    options: ["Dadi", "Mama", "Bhai", "Nani"],
  },
  {
    prompt: "Who is your Papa?",
    answer: "Papa",
    options: ["Papa", "Didi", "Nani", "Dada"],
  },
  {
    prompt: "Who is your Dadi?",
    answer: "Dadi",
    options: ["Dada", "Dadi", "Chachu", "Mama"],
  },
  {
    prompt: "Who is your Dada?",
    answer: "Dada",
    options: ["Nani", "Dada", "Papa", "Bua"],
  },
];

export function FamilyTree({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = FAMILY_ROUNDS[index];
  const options = useMemo(
    () => [...round.options].sort(() => Math.random() - 0.5),
    [round],
  );

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Yes! Great family detective.");
      setTimeout(() => {
        if (index + 1 >= FAMILY_ROUNDS.length) {
          setDone(true);
          award(3, "family-relationships");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Try that one again.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="family-relationships" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Family match</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(120px,1fr))" }}>
        {options.map((choice) => (
          <button
            key={choice}
            className={`tile c-leaf${selected === choice ? " selected" : ""}`}
            onClick={() => handleChoose(choice)}
            aria-label={choice}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">👪</span>
            <span className="label">{choice}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
