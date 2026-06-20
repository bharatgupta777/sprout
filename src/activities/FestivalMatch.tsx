import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const FESTIVALS = [
  {
    prompt: "Which festival lights up the night with lamps?",
    answer: "Diwali",
    options: ["Holi", "Diwali", "Christmas", "Thanksgiving"],
  },
  {
    prompt: "Which festival has colorful powder?",
    answer: "Holi",
    options: ["Holi", "Easter", "Ramadan", "Halloween"],
  },
  {
    prompt: "Which festival has a Christmas tree?",
    answer: "Christmas",
    options: ["Ramadan", "Eid", "Christmas", "Navratri"],
  },
  {
    prompt: "Which festival celebrates a new year with drums and ribbons?",
    answer: "Chinese New Year",
    options: ["Chinese New Year", "Diwali", "Halloween", "Holi"],
  },
];

export function FestivalMatch({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = FESTIVALS[index];
  const options = useMemo(() => [...round.options].sort(() => Math.random() - 0.5), [round]);

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Yes! That's the right festival.");
      setTimeout(() => {
        if (index + 1 >= FESTIVALS.length) {
          setDone(true);
          award(3, "festival-recognition");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Try another festival.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="festival-recognition" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Festival fun</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(120px,1fr))", gap: 14 }}>
        {options.map((choice) => (
          <button
            key={choice}
            className={`tile c-sky${selected === choice ? " selected" : ""}`}
            onClick={() => handleChoose(choice)}
            aria-label={choice}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">{choice === "Diwali" ? "🪔" : choice === "Holi" ? "🌈" : choice === "Christmas" ? "🎄" : "🧧"}</span>
            <span className="label">{choice}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
