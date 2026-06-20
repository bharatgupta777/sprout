import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { ANIMAL_BABIES } from "../content/animalBabies";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function AnimalBabyMatch({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const optionCount = ageMode === "younger" ? 3 : 4;
    const roundCount = ageMode === "younger" ? 4 : 6;
    const targets = sample(ANIMAL_BABIES, roundCount);
    return targets.map((t) => {
      const distractors = sample(
        ANIMAL_BABIES.filter((item) => item.adult !== t.adult),
        optionCount - 1,
      );
      const options = shuffle([
        { id: `${t.baby}-${t.adult}`, display: t.babyEmoji, label: t.baby },
        ...distractors.map((item) => ({ id: `${item.baby}-${item.adult}`, display: item.babyEmoji, label: item.baby })),
      ]);
      return {
        promptText: `Which baby goes with ${t.adult}?`,
        caption: `${t.adultEmoji} ${t.adult} → ?`,
        promptVisual: t.adultEmoji,
        options,
        correctId: `${t.baby}-${t.adult}`,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="animal-baby-match" rounds={rounds} onBack={onBack} />;
}
