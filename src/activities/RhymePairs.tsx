import { useMemo } from "react";
import { RoundQuiz, type QuizRound } from "../components/RoundQuiz";
import { RHYMES } from "../content/rhymes";
import { useApp } from "../context/AppContext";
import { sample, shuffle } from "../lib/random";

export function RhymePairs({ onBack }: { onBack: () => void }) {
  const { ageMode } = useApp();
  const rounds = useMemo<QuizRound[]>(() => {
    const roundCount = ageMode === "younger" ? 4 : 6;
    const targets = sample(RHYMES, roundCount);
    return targets.map((t) => {
      const options = shuffle([
        { id: t.rhyme, display: t.rhyme, label: t.rhyme },
        ...t.wrong.map((word) => ({ id: word, display: word, label: word })),
      ]);
      return {
        promptText: `Tap the word that rhymes with ${t.word}`,
        caption: `${t.word} → ?`,
        options,
        correctId: t.rhyme,
      };
    });
  }, [ageMode]);

  return <RoundQuiz activityId="rhyme-pairs" rounds={rounds} onBack={onBack} />;
}
