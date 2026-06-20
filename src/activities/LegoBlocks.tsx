import { useEffect, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";
import { LEGO_PATTERNS } from "../content/legoPatterns";

export function LegoBlocks({ onBack }: { onBack: () => void }) {
  const { tap, speak, award } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const pattern = LEGO_PATTERNS[index];
  const [display, setDisplay] = useState<(string | null)[]>(
    pattern.pattern.map((p) => (p === "?" ? null : p))
  );

  useEffect(() => {
    setDisplay(LEGO_PATTERNS[index].pattern.map((p) => (p === "?" ? null : p)));
    setSelected(null);
  }, [index]);

  const handleSelect = (choice: string) => {
    if (selected) return;
    tap();
    setSelected(choice);
    // show the chosen block placed into the missing slot
    const missingIndex = pattern.pattern.findIndex((p) => p === "?");
    setDisplay((d) => d.map((v, i) => (i === missingIndex ? choice : v)));

    if (choice === pattern.missing) {
      speak("Nice! That fits.");
      setTimeout(() => {
        if (index + 1 >= LEGO_PATTERNS.length) {
          setDone(true);
          award(4, "lego-blocks");
        } else {
          setIndex((i) => i + 1);
        }
      }, 900);
    } else {
      speak("Try again!", { pitch: 0.85 });
      setTimeout(() => {
        // remove the wrong choice from the pattern and allow retry
        setDisplay((d) => d.map((v, i) => (pattern.pattern[i] === "?" ? null : v)));
        setSelected(null);
      }, 900);
    }
  };

  if (done) {
    return <WinScreen activityId="lego-blocks" stars={4} onBack={onBack} onReplay={() => {
      setIndex(0);
      setSelected(null);
      setDone(false);
    }} />;
  }

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Finish the Lego pattern</>}
      caption={pattern.caption}
      onReplay={() => speak(pattern.prompt)}
    >
      <div className="story-card" style={{ marginBottom: 18 }}>
        <div className="story-art" style={{ fontSize: 46 }}>{display.map((p) => p ?? "⬜").join(" ")}</div>
        <div className="caption" style={{ marginTop: 10, fontSize: 18 }}>{pattern.caption}</div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {pattern.options.map((choice) => {
          const isWrong = selected === choice && choice !== pattern.missing;
          return (
            <button
              key={choice}
              className={`big-choice${isWrong ? " wrong" : ""}`}
              style={{ fontSize: "clamp(32px,8vw,48px)" }}
              aria-label={choice}
              onClick={() => handleSelect(choice)}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </ActivityShell>
  );
}
