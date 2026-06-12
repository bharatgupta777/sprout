import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { FEELINGS } from "../content/feelings";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function Feelings({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const optionCount = ageMode === "younger" ? 3 : 4;
    const roundCount = ageMode === "younger" ? 4 : 6;
    const targets = sample(FEELINGS, roundCount);
    return targets.map((t) => {
      const distractors = sample(
        FEELINGS.filter((f) => f.name !== t.name),
        optionCount - 1,
      );
      const options = shuffle([t, ...distractors]).map((f) => ({
        id: f.name,
        display: f.emoji,
        label: f.name,
      }));
      return {
        promptText: t.prompt,
        caption: "Tap the face that shows the feeling",
        options,
        correctId: t.name,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="feelings" rounds={rounds} onBack={onBack} />;
}
