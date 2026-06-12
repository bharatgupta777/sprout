import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { LETTERS } from "../content/letters";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function LetterHunt({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const optionCount = ageMode === "younger" ? 3 : 4;
    const roundCount = ageMode === "younger" ? 4 : 6;
    const targets = sample(LETTERS, roundCount);
    return targets.map((t) => {
      const distractors = sample(
        LETTERS.filter((l) => l.letter !== t.letter),
        optionCount - 1,
      );
      const options = shuffle([t, ...distractors]).map((l) => ({
        id: l.letter,
        display: l.letter,
        label: `${l.name}. ${l.word}.`,
      }));
      return {
        promptText: `Find the letter ${t.name}`,
        caption: `Tap the letter ${t.letter}`,
        options,
        correctId: t.letter,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="letter-hunt" rounds={rounds} onBack={onBack} />;
}
