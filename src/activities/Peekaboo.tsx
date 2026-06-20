import { useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const HIDES = [
  { text: "Peekaboo! Find the hidden puppy.", hidden: "🐶" },
  { text: "Peekaboo! Find the hidden banana.", hidden: "🍌" },
  { text: "Peekaboo! Find the hidden star.", hidden: "⭐" },
  { text: "Peekaboo! Find the hidden water.", hidden: "💧" },
];

export function Peekaboo({ onBack }: { onBack: () => void }) {
  const { speak, cheer, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const round = HIDES[index];

  const handleReveal = () => {
    tap();
    setRevealed(true);
    speak(`Peekaboo! It's ${round.hidden}`);
    setTimeout(() => {
      if (index + 1 >= HIDES.length) {
        setDone(true);
        award(3, "peekaboo-reveal");
      } else {
        setIndex((i) => i + 1);
        setRevealed(false);
      }
    }, 1400);
  };

  if (done) {
    return <WinScreen activityId="peekaboo-reveal" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setRevealed(false);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Peekaboo reveal</>}
      caption={round.text}
      onReplay={() => speak(round.text)}
    >
      <button
        className="big-choice"
        style={{ fontSize: "clamp(48px, 12vw, 96px)", minHeight: 220 }}
        onClick={handleReveal}
      >
        {revealed ? round.hidden : "👀"}
      </button>
    </ActivityShell>
  );
}
