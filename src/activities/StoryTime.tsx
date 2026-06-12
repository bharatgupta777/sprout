import { useEffect, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { STORIES, type Story } from "../content/stories";
import { useApp } from "../context/AppContext";

export function StoryTime({ onBack }: { onBack: () => void }) {
  const { speak, cheer, tap, award, stopSpeech } = useApp();
  const [story, setStory] = useState<Story | null>(null);
  const [page, setPage] = useState(0);
  const [confetti, setConfetti] = useState(0);

  useEffect(() => {
    if (story) {
      // Warmer, slower delivery for a cozy storyteller feel.
      const t = setTimeout(() => speak(story.pages[page].text, { rate: 0.84, pitch: 1.06 }), 400);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story, page]);

  if (!story) {
    return (
      <ActivityShell onBack={onBack} prompt={<>Pick a story</>} caption="Tap a book to begin">
        <div className="grid">
          {STORIES.map((s) => (
            <button
              key={s.id}
              className="tile c-coral"
              onClick={() => {
                tap();
                speak(s.title);
                setStory(s);
                setPage(0);
              }}
            >
              <span className="emoji">{s.emoji}</span>
              <span className="label">{s.title}</span>
            </button>
          ))}
        </div>
      </ActivityShell>
    );
  }

  const last = page >= story.pages.length - 1;
  const p = story.pages[page];

  const next = () => {
    tap();
    if (last) {
      stopSpeech();
      setConfetti((c) => c + 1);
      speak(`The end. ${story.moral}`);
      cheer("What a lovely story!");
      award(3, "story-time");
      setTimeout(() => setStory(null), 2600);
    } else {
      setPage((x) => x + 1);
    }
  };

  return (
    <ActivityShell
      onBack={() => {
        stopSpeech();
        setStory(null);
      }}
      prompt={<>{story.title}</>}
      onReplay={() => speak(p.text)}
      total={story.pages.length}
      current={page}
    >
      <Confetti fire={confetti} />
      <div className="story-card pop-in" key={page}>
        <div className="story-art">{p.art}</div>
        <div className="story-text">{p.text}</div>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
        <button
          className="btn btn-ghost"
          disabled={page === 0}
          style={{ opacity: page === 0 ? 0.4 : 1 }}
          onClick={() => {
            tap();
            setPage((x) => Math.max(0, x - 1));
          }}
        >
          ⬅️ Back
        </button>
        <button className="btn btn-teal" onClick={next}>
          {last ? "🎉 Finish" : "Next ➡️"}
        </button>
      </div>
    </ActivityShell>
  );
}
