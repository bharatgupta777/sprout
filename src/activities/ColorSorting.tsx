import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { COLORS } from "../content/shapes";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function ColorSorting({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const optionCount = ageMode === "younger" ? 3 : 4;
    const total = ageMode === "younger" ? 5 : 7;
    const targets = sample(COLORS, total);
    return targets.map((t) => {
      const distractors = sample(COLORS.filter((c) => c.name !== t.name), optionCount - 1);
      const options = shuffle([
        { id: t.name, display: (
            <span
              style={{
                width: "62%",
                height: "62%",
                borderRadius: "50%",
                background: t.hex,
                boxShadow: "inset 0 -8px 14px rgba(0,0,0,0.15)",
              }}
            />
          ),
          label: t.name,
        },
        ...distractors.map((c) => ({
          id: c.name,
          display: (
            <span
              style={{
                width: "62%",
                height: "62%",
                borderRadius: "50%",
                background: c.hex,
                boxShadow: "inset 0 -8px 14px rgba(0,0,0,0.15)",
              }}
            />
          ),
          label: c.name,
        })),
      ]);
      return {
        promptText: `Find the color ${t.name}`,
        caption: `Tap the ${t.name} circle`,
        options,
        correctId: t.name,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="color-sorting" rounds={rounds} onBack={onBack} />;
}
