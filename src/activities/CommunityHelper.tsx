import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const HELPERS = [
  {
    prompt: "Tap the friend who helps when you are sick.",
    answer: "Doctor",
    options: ["Doctor", "Teacher", "Chef", "Artist"],
  },
  {
    prompt: "Tap the helper who keeps the park clean.",
    answer: "Gardener",
    options: ["Farmer", "Gardener", "Pilot", "Dentist"],
  },
  {
    prompt: "Tap the helper who teaches you letters.",
    answer: "Teacher",
    options: ["Teacher", "Driver", "Chef", "Singer"],
  },
  {
    prompt: "Tap the helper who puts out fires.",
    answer: "Firefighter",
    options: ["Police", "Firefighter", "Doctor", "Pilot"],
  },
];

export function CommunityHelper({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = HELPERS[index];
  const options = useMemo(() => [...round.options].sort(() => Math.random() - 0.5), [round]);

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === round.answer) {
      cheer("Great helper choice!");
      setTimeout(() => {
        if (index + 1 >= HELPERS.length) {
          setDone(true);
          award(3, "community-helper");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Let's try the helper again.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="community-helper" stars={3} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Community helpers</>}
      caption={round.prompt}
      onReplay={() => speak(round.prompt)}
    >
      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(140px,1fr))", gap: 14 }}>
        {options.map((choice) => (
          <button
            key={choice}
            className={`tile c-teal${selected === choice ? " selected" : ""}`}
            onClick={() => handleChoose(choice)}
            aria-label={choice}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">{choice === "Doctor" ? "🩺" : choice === "Teacher" ? "📚" : choice === "Chef" ? "👩‍🍳" : choice === "Gardener" ? "🌿" : choice === "Firefighter" ? "🚒" : choice === "Police" ? "🚓" : "👷"}</span>
            <span className="label">{choice}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
