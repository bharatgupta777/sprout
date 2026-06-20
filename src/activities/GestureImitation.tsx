import { useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const MOVES = [
  { name: "Wave", emoji: "👋", prompt: "Wave your hand like this." },
  { name: "Clap", emoji: "👏", prompt: "Clap your hands together." },
  { name: "Jump", emoji: "🦘", prompt: "Jump up and down." },
  { name: "Touch nose", emoji: "👃", prompt: "Touch your nose gently." },
];

export function GestureImitation({ onBack }: { onBack: () => void }) {
  const { speak, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const move = MOVES[index];

  const next = () => {
    tap();
    speak(move.prompt, { expressive: true });
    if (index + 1 >= MOVES.length) {
      setDone(true);
      award(3, "gesture-imitation");
    } else {
      setIndex((i) => i + 1);
    }
  };

  if (done) {
    return <WinScreen activityId="gesture-imitation" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Copy the movement</>}
      caption={move.prompt}
      onReplay={() => speak(move.prompt)}
    >
      <div className="story-card" style={{ marginBottom: 18 }}>
        <div className="story-art">{move.emoji}</div>
        <div className="story-text">{move.name}</div>
      </div>
      <button className="btn btn-teal" onClick={next}>
        I did it!
      </button>
    </ActivityShell>
  );
}
