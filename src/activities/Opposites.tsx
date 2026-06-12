import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { OPPOSITES } from "../content/opposites";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function Opposites({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const optionCount = ageMode === "younger" ? 3 : 4;
    const roundCount = ageMode === "younger" ? 4 : 6;
    const targets = sample(OPPOSITES, roundCount);
    return targets.map((t) => {
      // Build distractors from OTHER pairs' opposite emojis.
      const others = sample(
        OPPOSITES.filter((o) => o.word !== t.word),
        optionCount - 1,
      );
      const correct = { id: "ok", display: t.oppositeEmoji, label: t.opposite };
      const distractors = others.map((o, i) => ({
        id: `d${i}`,
        display: o.oppositeEmoji,
        label: o.opposite,
      }));
      const options = shuffle([correct, ...distractors]);
      return {
        promptText: `${t.word} is the opposite of what?`,
        caption: `${t.word} ${t.emoji} → ?`,
        promptVisual: t.emoji,
        options,
        correctId: "ok",
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="opposites" rounds={rounds} onBack={onBack} />;
}
