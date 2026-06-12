import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Confetti } from "./Confetti";
import { Mascot } from "./Mascot";

/** Celebration shown when a child finishes a round of an activity. */
export function WinScreen({
  stars,
  onReplay,
  onBack,
  activityId,
}: {
  stars: number;
  onReplay: () => void;
  onBack: () => void;
  activityId: string;
}) {
  const { award, cheer, tap } = useApp();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    award(stars, activityId);
    cheer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="frame">
      <Confetti fire={1} />
      <Mascot cheering message="You finished! Amazing work!" size={1.4} />
      <div className="pill" style={{ fontSize: 28 }}>
        <span>+{stars}</span>
        <span className="star-count">⭐</span>
      </div>
      <div className="choice-grid" style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 440 }}>
        <button
          className="btn btn-teal"
          onClick={() => {
            tap();
            onReplay();
          }}
        >
          🔁 Again
        </button>
        <button
          className="btn"
          onClick={() => {
            tap();
            onBack();
          }}
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
}
