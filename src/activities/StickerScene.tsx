import { useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { useApp } from "../context/AppContext";

const SCENES = [
  { id: "sky", label: "Sky", bg: "linear-gradient(180deg,#bfe6ff,#e9f7ff 70%,#cdeccd)", ground: "🌳🌳🌷🌼🌳" },
  { id: "sea", label: "Ocean", bg: "linear-gradient(180deg,#9fe3ff,#3aa0e0)", ground: "🪸🐚⭐🪨🐚" },
  { id: "space", label: "Space", bg: "linear-gradient(180deg,#2b2350,#5a3fd6)", ground: "🌑🪐⭐🌟⭐" },
  { id: "park", label: "Park", bg: "linear-gradient(180deg,#d8f5ff,#bdeec8)", ground: "🌳🏡🌷🌳🌼" },
];

const STICKERS: { emoji: string; name: string }[] = [
  { emoji: "🌞", name: "Sun" }, { emoji: "☁️", name: "Cloud" }, { emoji: "🌈", name: "Rainbow" },
  { emoji: "🦋", name: "Butterfly" }, { emoji: "🐦", name: "Bird" }, { emoji: "🐠", name: "Fish" },
  { emoji: "🐙", name: "Octopus" }, { emoji: "🚀", name: "Rocket" }, { emoji: "⭐", name: "Star" },
  { emoji: "🐶", name: "Puppy" }, { emoji: "🐱", name: "Kitty" }, { emoji: "🐰", name: "Bunny" },
  { emoji: "🌷", name: "Flower" }, { emoji: "🎈", name: "Balloon" }, { emoji: "🦄", name: "Unicorn" },
  { emoji: "🐢", name: "Turtle" },
];

interface Placed {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export function StickerScene({ onBack }: { onBack: () => void }) {
  const { speak, tap, award } = useApp();
  const [scene, setScene] = useState(SCENES[0]);
  const [placed, setPlaced] = useState<Placed[]>([]);
  const idRef = useRef(0);
  const rewarded = useRef(false);

  const add = (s: { emoji: string; name: string }) => {
    tap();
    speak(s.name, { pitch: 1.2 });
    setPlaced((prev) => [
      ...prev,
      { id: idRef.current++, emoji: s.emoji, x: 10 + Math.random() * 80, y: 8 + Math.random() * 70 },
    ]);
    if (idRef.current >= 5 && !rewarded.current) {
      rewarded.current = true;
      award(2, "sticker-scene");
    }
  };

  const remove = (id: number) => {
    tap();
    setPlaced((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Make a picture! 🖼️</>}
      caption="Tap a sticker to add it. Tap a sticker on the scene to remove it."
    >
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        {SCENES.map((s) => (
          <button
            key={s.id}
            className="btn btn-ghost"
            style={{ padding: "8px 14px", fontSize: 15, outline: scene.id === s.id ? "3px solid var(--primary)" : "none" }}
            onClick={() => {
              tap();
              setScene(s);
            }}
          >
            {s.label}
          </button>
        ))}
        <button className="btn btn-coral" style={{ padding: "8px 14px", fontSize: 15 }} onClick={() => { tap(); setPlaced([]); }}>
          🧽 Clear
        </button>
      </div>

      <div
        style={{
          position: "relative",
          width: "min(620px, 92vw)",
          height: "min(48vh, 380px)",
          margin: "0 auto",
          background: scene.bg,
          borderRadius: 24,
          boxShadow: "var(--shadow)",
          overflow: "hidden",
          border: "4px solid #fff",
        }}
      >
        <div style={{ position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center", fontSize: "clamp(28px,7vw,42px)", opacity: 0.9 }}>
          {scene.ground}
        </div>
        {placed.map((p) => (
          <button
            key={p.id}
            aria-label="placed sticker"
            onClick={() => remove(p.id)}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(36px,9vw,56px)",
              background: "none",
              border: "none",
              cursor: "pointer",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,.25))",
            }}
            className="pop-in"
          >
            {p.emoji}
          </button>
        ))}
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(58px, 1fr))", marginTop: 12, maxWidth: 620, marginInline: "auto" }}
      >
        {STICKERS.map((s) => (
          <button
            key={s.emoji}
            className="big-choice"
            style={{ fontSize: "clamp(28px,7vw,40px)", border: "none", boxShadow: "var(--shadow-press)" }}
            aria-label={s.name}
            onClick={() => add(s)}
          >
            {s.emoji}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
