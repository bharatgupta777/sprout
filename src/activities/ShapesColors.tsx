import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { COLORS, SHAPES } from "../content/shapes";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function ShapesColors({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const optionCount = ageMode === "younger" ? 3 : 4;
    const total = ageMode === "younger" ? 5 : 7;

    const shapeRounds: QuizRound[] = sample(SHAPES, Math.ceil(total / 2)).map((t) => {
      const distractors = sample(
        SHAPES.filter((s) => s.name !== t.name),
        optionCount - 1,
      );
      const options = shuffle([t, ...distractors]).map((s) => ({
        id: s.name,
        display: s.emoji,
        label: s.name,
      }));
      return {
        promptText: `Find the ${t.name}`,
        caption: t.hint,
        options,
        correctId: t.name,
      };
    });

    const colorRounds: QuizRound[] = sample(COLORS, Math.floor(total / 2)).map((t) => {
      const distractors = sample(
        COLORS.filter((c) => c.name !== t.name),
        optionCount - 1,
      );
      const options = shuffle([t, ...distractors]).map((c) => ({
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
      }));
      return {
        promptText: `Find the color ${t.name}`,
        caption: `Tap the ${t.name} circle`,
        options,
        correctId: t.name,
      };
    });

    return shuffle([...shapeRounds, ...colorRounds]);
  }, [ageMode]);

  return <RoundQuiz activityId="shapes-colors" rounds={rounds} onBack={onBack} />;
}
