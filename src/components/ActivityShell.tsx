import type { ReactNode } from "react";
import { useApp } from "../context/AppContext";

/** Common chrome for every activity: a big back button, an optional spoken
 *  prompt with a replay-speaker, progress dots, and the activity stage. */
export function ActivityShell({
  onBack,
  prompt,
  caption,
  onReplay,
  total,
  current,
  children,
}: {
  onBack: () => void;
  prompt?: ReactNode;
  caption?: string;
  onReplay?: () => void;
  total?: number;
  current?: number;
  children: ReactNode;
}) {
  const { tap } = useApp();
  return (
    <div className="frame">
      <div style={{ display: "flex", width: "100%", alignItems: "center", gap: 12 }}>
        <button
          className="icon-btn"
          aria-label="Go back home"
          onClick={() => {
            tap();
            onBack();
          }}
        >
          🏠
        </button>
        <div style={{ flex: 1 }} />
        {onReplay && (
          <button className="icon-btn" aria-label="Hear it again" onClick={onReplay}>
            🔊
          </button>
        )}
      </div>

      {typeof total === "number" && total > 1 && (
        <div className="dots">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`dot${i < (current ?? 0) ? " done" : ""}${
                i === (current ?? 0) ? " active" : ""
              }`}
            />
          ))}
        </div>
      )}

      {prompt && (
        <div className="prompt" onClick={onReplay}>
          {prompt}
        </div>
      )}
      {caption && <div className="caption">{caption}</div>}

      <div className="stage">{children}</div>
    </div>
  );
}
