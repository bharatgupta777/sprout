import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { FOOD_ITEMS } from "../content/foodGroups";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function HealthyJunkFood({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const roundCount = ageMode === "younger" ? 4 : 6;
    const items = sample(FOOD_ITEMS, roundCount);
    return items.map((item) => {
      const type = item.type;
      const distractors = sample(FOOD_ITEMS.filter((f) => f.type !== type), 3);
      const options = shuffle([
        { id: item.word, display: item.emoji, label: item.word },
        ...distractors.map((opt) => ({ id: opt.word, display: opt.emoji, label: opt.word })),
      ]);
      return {
        promptText: `Tap the ${type === "healthy" ? "healthy" : "treat"} food`,
        caption: `Pick the ${type === "healthy" ? "healthy" : "junk"} food`,
        promptVisual: item.emoji,
        options,
        correctId: item.word,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="healthy-junk-food" rounds={rounds} onBack={onBack} />;
}
