import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

const COLORS = ["#7c5cff", "#ff6fb5", "#19c3b3", "#ffc23c", "#ff7a59", "#4cc66a", "#4cb8ff"];

/** A short, gentle confetti burst. Respects the reduced-motion setting. */
export function Confetti({ fire }: { fire: number }) {
  const { settings } = useApp();
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    if (fire === 0 || settings.reducedMotion) return;
    setPieces(Array.from({ length: 80 }, (_, i) => i));
    const t = setTimeout(() => setPieces([]), 2600);
    return () => clearTimeout(t);
  }, [fire, settings.reducedMotion]);

  if (pieces.length === 0) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const dur = 1.8 + Math.random() * 1.2;
        const bg = COLORS[i % COLORS.length];
        return (
          <i
            key={i}
            style={{
              left: `${left}%`,
              background: bg,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
