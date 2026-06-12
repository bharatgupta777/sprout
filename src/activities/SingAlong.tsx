import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { SONGS, type Song } from "../content/songs";
import { useApp } from "../context/AppContext";

export function SingAlong({ onBack }: { onBack: () => void }) {
  const { speak, tap, award, cheer, stopSpeech } = useApp();
  const [song, setSong] = useState<Song | null>(null);
  const [line, setLine] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const rewarded = useRef(false);

  // Sing the lines in sequence, highlighting each as it is spoken.
  useEffect(() => {
    if (!song || !playing) return;
    if (line >= song.lines.length) {
      setPlaying(false);
      if (!rewarded.current) {
        rewarded.current = true;
        award(2, "sing-along");
        cheer("You sang beautifully!");
      }
      return;
    }
    if (line < 0) {
      setLine(0);
      return;
    }
    speak(song.lines[line], {
      rate: 0.85,
      onEnd: () => setTimeout(() => setLine((l) => l + 1), 250),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song, playing, line]);

  if (!song) {
    return (
      <ActivityShell onBack={onBack} prompt={<>Pick a song</>} caption="Tap to sing along">
        <div className="grid">
          {SONGS.map((s) => (
            <button
              key={s.id}
              className="tile c-sun"
              onClick={() => {
                tap();
                rewarded.current = false;
                setSong(s);
                setLine(-1);
                setPlaying(true);
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

  return (
    <ActivityShell
      onBack={() => {
        stopSpeech();
        setSong(null);
        setPlaying(false);
      }}
      prompt={<>{song.emoji} {song.title}</>}
    >
      <div className="story-card" style={{ textAlign: "left" }}>
        {song.lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontSize: "clamp(18px,3.4vw,24px)",
              fontWeight: i === line ? 900 : 600,
              color: i === line ? "var(--primary-dark)" : "var(--ink-soft)",
              padding: "6px 4px",
              transform: i === line ? "scale(1.03)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {i === line ? "🎵 " : ""}
            {l}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 6 }}>
        <button
          className="btn btn-teal"
          onClick={() => {
            tap();
            stopSpeech();
            rewarded.current = false;
            setLine(-1);
            setPlaying(true);
          }}
        >
          🔁 Sing Again
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => {
            tap();
            stopSpeech();
            setPlaying(false);
          }}
        >
          ⏸️ Stop
        </button>
      </div>
    </ActivityShell>
  );
}
