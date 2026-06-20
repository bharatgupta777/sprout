import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const LIFECYCLES = [
  {
    prompt: "Tap the next stage of the butterfly.",
    stages: ["Egg", "Caterpillar", "Chrysalis", "Butterfly"],
    answer: "Butterfly",
  },
  {
    prompt: "Tap the next stage of the frog.",
    stages: ["Egg", "Tadpole", "Froglet", "Frog"],
    answer: "Frog",
  },
  {
    prompt: "Tap the next stage of the pumpkin.",
    stages: ["Seed", "Sprout", "Flower", "Pumpkin"],
    answer: "Pumpkin",
  },
  {
    prompt: "Tap the next stage of the bird.",
    stages: ["Egg", "Chick", "Juvenile", "Bird"],
    answer: "Bird",
  },
];

export function LifeCycle({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = LIFECYCLES[index];
  const options = useMemo(() => [...round.stages].sort(() => Math.random() - 0.5), [round]);

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Yes! That's the life cycle stage.");
      setTimeout(() => {
        if (index + 1 >= LIFECYCLES.length) {
          setDone(true);
          award(3, "life-cycle");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Try again. The life cycle is next.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="life-cycle" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Nature life cycles</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(120px,1fr))", gap: 14 }}>
        {options.map((stage) => (
          <button
            key={stage}
            className={`tile c-leaf${selected === stage ? " selected" : ""}`}
            onClick={() => handleChoose(stage)}
            aria-label={stage}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">{stage === "Egg" ? "🥚" : stage === "Caterpillar" ? "🐛" : stage === "Chrysalis" ? "🦋" : stage === "Butterfly" ? "🦋" : stage === "Tadpole" ? "🐸" : stage === "Froglet" ? "🐸" : stage === "Seed" ? "🌱" : stage === "Sprout" ? "🌿" : stage === "Flower" ? "🌼" : stage === "Pumpkin" ? "🎃" : stage === "Chick" ? "🐥" : stage === "Bird" ? "🐦" : "🌟"}</span>
            <span className="label">{stage}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
