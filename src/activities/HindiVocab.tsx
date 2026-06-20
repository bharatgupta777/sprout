import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";

const WORDS = [
  { english: "Apple", hindi: "सेब", icon: "🍎" },
  { english: "Milk", hindi: "दूध", icon: "🥛" },
  { english: "Banana", hindi: "केला", icon: "🍌" },
  { english: "Water", hindi: "पानी", icon: "💧" },
  { english: "Book", hindi: "किताब", icon: "📚" },
  { english: "House", hindi: "घर", icon: "🏠" },
  { english: "Grandma", hindi: "दादी", icon: "👵" },
  { english: "Friend", hindi: "दोस्त", icon: "🧸" },
];

export function HindiVocab({ onBack }: { onBack: () => void }) {
  const { speak, cheer, oops, tap, award } = useApp();
  const [mode, setMode] = useState<"en-to-hi" | "hi-to-en">("en-to-hi");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const round = WORDS[index];
  const choices = useMemo(() => {
    const options = [round, ...WORDS.filter((w) => w !== round).slice(0, 3)];
    return options.sort(() => Math.random() - 0.5);
  }, [round]);

  const promptText = mode === "en-to-hi"
    ? `Tap the Hindi word for ${round.english}`
    : `Tap the English word for ${round.hindi}`;

  const answer = mode === "en-to-hi" ? round.hindi : round.english;

  const handleChoose = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    if (choice === answer) {
      cheer("Very good!");
      setTimeout(() => {
        if (index + 1 >= WORDS.length) {
          setDone(true);
          award(3, "hindi-english-vocab");
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
        }
      }, 900);
    } else {
      oops("Try the other word.");
      setTimeout(() => setSelected(null), 900);
    }
  };

  if (done) {
    return <WinScreen activityId="hindi-english-vocab" stars={4} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Hindi + English words</>}
      caption={promptText}
      onReplay={() => speak(promptText)}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        <button
          className={`btn btn-ghost${mode === "en-to-hi" ? " active" : ""}`}
          onClick={() => {
            tap();
            setMode("en-to-hi");
          }}
        >
          English → Hindi
        </button>
        <button
          className={`btn btn-ghost${mode === "hi-to-en" ? " active" : ""}`}
          onClick={() => {
            tap();
            setMode("hi-to-en");
          }}
        >
          Hindi → English
        </button>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(120px,1fr))", marginTop: 10 }}>
        {choices.map((choice) => (
          <button
            key={choice.english}
            className={`tile c-sky${selected === choice.english || selected === choice.hindi ? " selected" : ""}`}
            onClick={() => handleChoose(mode === "en-to-hi" ? choice.hindi : choice.english)}
            aria-label={mode === "en-to-hi" ? choice.hindi : choice.english}
            style={{ minHeight: 120 }}
          >
            <span className="emoji">{choice.icon}</span>
            <span className="label">{mode === "en-to-hi" ? choice.hindi : choice.english}</span>
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
