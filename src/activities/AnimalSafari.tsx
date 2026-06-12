import { useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { ANIMALS, type AnimalEntry } from "../content/animals";
import { useApp } from "../context/AppContext";

const HABITATS: { id: AnimalEntry["habitat"] | "all"; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "🌍" },
  { id: "farm", label: "Farm", emoji: "🚜" },
  { id: "jungle", label: "Jungle", emoji: "🌴" },
  { id: "ocean", label: "Ocean", emoji: "🌊" },
  { id: "home", label: "Home", emoji: "🏠" },
  { id: "sky", label: "Sky", emoji: "☁️" },
  { id: "cold", label: "Snow", emoji: "❄️" },
];

export function AnimalSafari({ onBack }: { onBack: () => void }) {
  const { speakSequence, speak, tap, award } = useApp();
  const [habitat, setHabitat] = useState<AnimalEntry["habitat"] | "all">("all");
  const [active, setActive] = useState<AnimalEntry | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [confetti, setConfetti] = useState(0);
  const [rewarded, setRewarded] = useState(false);

  const list = habitat === "all" ? ANIMALS : ANIMALS.filter((a) => a.habitat === habitat);

  const choose = (a: AnimalEntry) => {
    tap();
    setActive(a);
    speakSequence([`${a.name}.`, a.sound, a.fact], 420);
    setSeen((prev) => {
      const next = new Set(prev);
      next.add(a.name);
      if (next.size >= 6 && !rewarded) {
        setRewarded(true);
        setConfetti((c) => c + 1);
        award(3, "animal-safari");
        setTimeout(() => speak("You met so many animals! Great explorer!", { pitch: 1.2 }), 1800);
      }
      return next;
    });
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Tap an animal to meet it</>}
      caption="Hear its sound and a fun fact"
      onReplay={active ? () => speakSequence([`${active.name}.`, active.sound, active.fact], 420) : undefined}
    >
      <Confetti fire={confetti} />
      {active && (
        <div className="story-card" style={{ marginBottom: 16 }}>
          <div className="story-art">{active.emoji}</div>
          <div className="story-text">
            {active.name} — {active.sound}
          </div>
          <div className="caption" style={{ marginTop: 8, fontSize: 18 }}>
            {active.fact}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 14 }}>
        {HABITATS.map((h) => (
          <button
            key={h.id}
            className="btn btn-ghost"
            style={{
              padding: "8px 14px",
              fontSize: 16,
              outline: habitat === h.id ? "3px solid var(--primary)" : "none",
            }}
            onClick={() => {
              tap();
              setHabitat(h.id);
            }}
          >
            {h.emoji} {h.label}
          </button>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))" }}>
        {list.map((a) => (
          <button
            key={a.name}
            className="big-choice"
            style={{
              fontSize: "clamp(34px,8vw,52px)",
              borderColor: seen.has(a.name) ? "var(--leaf)" : undefined,
            }}
            aria-label={a.name}
            onClick={() => choose(a)}
          >
            {a.emoji}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
