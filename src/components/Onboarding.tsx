import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { Confetti } from "./Confetti";

/** A 10-second wordless first-run: "Tap Sprout!" → confetti → one guaranteed win.
 *  Teaches the core gesture (tap) to a non-reader without any tutorial text. */
export function Onboarding({ onDone }: { onDone: () => void }) {
  const { speak, cheer, tap } = useApp();
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => speak("Hi! I am Sprout. Tap me to start!"), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTap = () => {
    if (tapped) return;
    setTapped(true);
    tap();
    cheer("Yay! Let's play and learn!");
    setTimeout(onDone, 2200);
  };

  return (
    <div className="overlay" style={{ background: "rgba(124,92,255,0.35)" }}>
      {tapped && <Confetti fire={1} />}
      <div
        className="sheet"
        style={{ textAlign: "center", maxWidth: 460, background: "rgba(255,255,255,0.96)" }}
      >
        <button
          onClick={handleTap}
          aria-label="Tap Sprout to start"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <div className={`mascot${tapped ? " cheer" : ""}`} style={{ fontSize: "clamp(90px,28vw,160px)" }}>
            🌱
          </div>
        </button>
        <h2 style={{ color: "var(--primary-dark)", margin: "8px 0" }}>
          {tapped ? "Yay! 🎉" : "Tap Sprout! 👆"}
        </h2>
        {!tapped && <p className="caption" style={{ fontSize: 18 }}>Tap the little sprout to begin.</p>}
      </div>
    </div>
  );
}
