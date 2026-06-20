import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";
import { SPOT_DIFFERENCES } from "../content/spotDifferences";
import { sample } from "../lib/random";

export function SpotDifference({ onBack }: { onBack: () => void }) {
  const { speak, tap } = useApp();
  const rounds = useMemo(() => sample(SPOT_DIFFERENCES, 4), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const round = rounds[index];

  const choose = (label: string) => {
    if (selected) return;
    tap();
    setSelected(label);
    if (label === round.answer) {
      setTimeout(() => {
        if (index + 1 >= rounds.length) {
          setDone(true);
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      speak("Try again!", { pitch: 0.84 });
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="spot-difference" stars={4} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Spot the difference</>}
      caption={round.caption}
      onReplay={() => speak(round.prompt)}
    >
      <div className="story-card" style={{ marginBottom: 16 }}>
        <div className="story-art" style={{ fontSize: 42 }}>{round.pattern.join(" ")}</div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {round.options.map((option) => {
          const isWrong = selected === option.label && option.label !== round.answer;
          return (
            <button
              key={option.label}
              className={`big-choice${isWrong ? " wrong" : ""}`}
              onClick={() => choose(option.label)}
            >
              <span style={{ fontSize: 40 }}>{option.emoji}</span>
              <div style={{ marginTop: 8 }}>{option.label}</div>
            </button>
          );
        })}
      </div>
    </ActivityShell>
  );
}
