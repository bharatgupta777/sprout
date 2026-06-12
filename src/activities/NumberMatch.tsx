import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { NUMBERS, numberWord } from "../content/numbers";
import { useApp } from "../context/AppContext";
import { pick, sample, shuffle } from "../lib/random";

export function NumberMatch({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const max = ageMode === "younger" ? 5 : 10;
    const optionCount = ageMode === "younger" ? 3 : 4;
    const roundCount = ageMode === "younger" ? 4 : 6;
    const pool = NUMBERS.filter((x) => x.n <= max);
    return Array.from({ length: roundCount }, () => {
      const target = pick(pool);
      const distractors = sample(
        pool.filter((x) => x.n !== target.n),
        optionCount - 1,
      );
      const options = shuffle([target, ...distractors]).map((x) => ({
        id: String(x.n),
        display: x.n,
        label: numberWord(x.n),
      }));
      return {
        promptText: "How many do you see? Tap the number.",
        caption: `Count the ${target.emoji} and tap ${target.n}`,
        promptVisual: (
          <div style={{ fontSize: "0.6em", lineHeight: 1.1, maxWidth: 420, margin: "0 auto" }}>
            {target.emoji.repeat(target.n)}
          </div>
        ),
        options,
        correctId: String(target.n),
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="number-match" rounds={rounds} onBack={onBack} />;
}
