import { useEffect, useState } from "react";

/** Sprout, the friendly mascot. Shows a speech bubble when given a message. */
export function Mascot({
  message,
  cheering,
  size = 1,
  face = "🌱",
}: {
  message?: string;
  cheering?: boolean;
  size?: number;
  face?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (message) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 4200);
      return () => clearTimeout(t);
    }
  }, [message]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {visible && message && (
        <div className="speech-bubble pop-in" aria-live="polite">
          {message}
        </div>
      )}
      <div
        className={`mascot${cheering ? " cheer" : ""}`}
        style={{ fontSize: `${size}em` }}
        role="img"
        aria-label="Sprout the mascot"
      >
        {face}
      </div>
    </div>
  );
}
