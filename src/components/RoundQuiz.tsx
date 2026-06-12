import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useApp } from "../context/AppContext";
import { ActivityShell } from "./ActivityShell";
import { WinScreen } from "./WinScreen";

export interface QuizOption {
  id: string;
  display: ReactNode; // what shows on the big button (emoji / letter / number)
  label: string; // what is spoken if tapped (e.g., "Apple")
}

export interface QuizRound {
  /** Spoken instruction, e.g. "Find the letter B" */
  promptText: string;
  /** Optional short caption shown for hearing accessibility */
  caption?: string;
  /** Optional big visual shown above the choices (the thing to match) */
  promptVisual?: ReactNode;
  options: QuizOption[];
  correctId: string;
}

/** A reusable "listen to the prompt, tap the right big button" game. */
export function RoundQuiz({
  activityId,
  rounds,
  onBack,
  starsPerWin = 3,
}: {
  activityId: string;
  rounds: QuizRound[];
  onBack: () => void;
  starsPerWin?: number;
}) {
  const { speak, cheer, oops, tap, settings } = useApp();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [seed, setSeed] = useState(0); // bump to replay

  const round = rounds[idx];

  const sayPrompt = () => round && speak(round.promptText);

  useEffect(() => {
    setPicked(null);
    setWrongId(null);
    const t = setTimeout(sayPrompt, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, seed]);

  if (done) {
    return (
      <WinScreen
        activityId={activityId}
        stars={starsPerWin}
        onBack={onBack}
        onReplay={() => {
          setIdx(0);
          setDone(false);
          setSeed((s) => s + 1);
        }}
      />
    );
  }

  const handlePick = (opt: QuizOption) => {
    if (picked) return;
    if (opt.id === round.correctId) {
      tap();
      setPicked(opt.id);
      speak(opt.label, { pitch: 1.2 });
      setTimeout(() => cheer(), 650);
      setTimeout(() => {
        if (idx + 1 >= rounds.length) setDone(true);
        else setIdx((i) => i + 1);
      }, 1700);
    } else {
      setWrongId(opt.id);
      oops();
      setTimeout(() => setWrongId(null), 600);
    }
  };

  const cols = round.options.length <= 2 ? 2 : round.options.length <= 4 ? 2 : 3;

  return (
    <ActivityShell
      onBack={onBack}
      prompt={
        <>
          {round.promptText} <span className="speaker">🔊</span>
        </>
      }
      caption={round.caption}
      onReplay={sayPrompt}
      total={rounds.length}
      current={idx}
    >
      {round.promptVisual !== undefined && (
        <div className="story-art" style={{ marginBottom: 12 }}>
          {round.promptVisual}
        </div>
      )}
      <div className="choice-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {round.options.map((opt) => {
          const isCorrect = picked === opt.id;
          const isWrong = wrongId === opt.id;
          const dim = picked && picked !== opt.id;
          return (
            <button
              key={opt.id}
              className={`big-choice${isCorrect ? " correct" : ""}${isWrong ? " wrong" : ""}${
                dim ? " dim" : ""
              }`}
              aria-label={opt.label}
              onClick={() => handlePick(opt)}
            >
              {opt.display}
            </button>
          );
        })}
      </div>
      {settings.reducedMotion && <div style={{ height: 4 }} />}
    </ActivityShell>
  );
}
