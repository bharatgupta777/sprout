import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { FOOD_ITEMS } from "../content/foodGroups";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function FoodSort({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const roundCount = ageMode === "younger" ? 4 : 6;
    const mode = Math.random() < 0.5 ? "healthy" : "junk";
    const items = sample(FOOD_ITEMS.filter((item) => item.type === mode), roundCount);

    return items.map((item) => {
      const otherType = mode === "healthy" ? "junk" : "healthy";
      const distractors = sample(FOOD_ITEMS.filter((f) => f.type === otherType), 3);
      const options = shuffle([
        { id: item.word, display: item.emoji, label: item.word },
        ...distractors.map((opt) => ({ id: opt.word, display: opt.emoji, label: opt.word })),
      ]);
      return {
        promptText: `Tap the ${mode === "healthy" ? "healthy" : "treat"} food`,
        caption: `Find the ${mode === "healthy" ? "healthy" : "junk"} choice`,
        promptVisual: item.emoji,
        options,
        correctId: item.word,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="food-sort" rounds={rounds} onBack={onBack} />;
}
