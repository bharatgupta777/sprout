import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { ANIMALS } from "../content/animals";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function AnimalSoundMatch({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const optionCount = ageMode === "younger" ? 3 : 4;
    const roundCount = ageMode === "younger" ? 4 : 6;
    const targets = sample(ANIMALS, roundCount);
    return targets.map((t) => {
      const distractors = sample(ANIMALS.filter((item) => item.name !== t.name), optionCount - 1);
      const options = shuffle([
        { id: t.name, display: t.emoji, label: t.name },
        ...distractors.map((item) => ({ id: item.name, display: item.emoji, label: item.name })),
      ]);
      return {
        promptText: `${t.sound} Which animal says this?`,
        caption: `Tap the animal that says ${t.sound}`,
        promptVisual: t.emoji,
        options,
        correctId: t.name,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="animal-sound-match" rounds={rounds} onBack={onBack} />;
}
