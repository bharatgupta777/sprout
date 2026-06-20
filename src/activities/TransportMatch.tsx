import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { TRANSPORTS } from "../content/transport";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function TransportMatch({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const optionCount = ageMode === "younger" ? 3 : 4;
    const roundCount = ageMode === "younger" ? 4 : 6;
    const targets = sample(TRANSPORTS, roundCount);
    return targets.map((t) => {
      const distractors = sample(TRANSPORTS.filter((item) => item.word !== t.word), optionCount - 1);
      const options = shuffle([
        { id: t.word, display: t.emoji, label: t.word },
        ...distractors.map((item) => ({ id: item.word, display: item.emoji, label: item.word })),
      ]);
      return {
        promptText: `Find the ${t.word}`,
        caption: `Tap the ${t.word}`,
        promptVisual: t.emoji,
        options,
        correctId: t.word,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="transport-match" rounds={rounds} onBack={onBack} />;
}
