import { useMemo, useState } from "react";

/** A simple arithmetic gate so toddlers can't wander into settings. */
export function ParentGate({ onPass, onClose }: { onPass: () => void; onClose: () => void }) {
  const { a, b } = useMemo(() => ({ a: 6 + Math.floor(Math.random() * 6), b: 5 + Math.floor(Math.random() * 5) }), []);
  const answer = a + b;
  const [entry, setEntry] = useState("");
  const [shake, setShake] = useState(false);

  const submit = () => {
    if (Number(entry) === answer) onPass();
    else {
      setShake(true);
      setEntry("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className={`sheet${shake ? "" : ""}`} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
        <h2 style={{ marginTop: 0, color: "var(--primary-dark)" }}>For grown-ups 🔒</h2>
        <p style={{ color: "var(--ink-soft)", fontWeight: 700 }}>
          To open the parent zone, what is{" "}
          <strong>
            {a} + {b}
          </strong>
          ?
        </p>
        <div
          className={shake ? "big-choice wrong" : ""}
          style={{
            fontSize: 36,
            fontWeight: 900,
            textAlign: "center",
            padding: "12px",
            border: "2px dashed #d9ccff",
            borderRadius: 16,
            minHeight: 64,
            color: "var(--ink)",
          }}
        >
          {entry || "?"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button key={n} className="btn btn-ghost" onClick={() => setEntry((e) => (e + n).slice(0, 3))}>
              {n}
            </button>
          ))}
          <button className="btn btn-ghost" onClick={() => setEntry("")}>
            ✕
          </button>
          <button className="btn btn-ghost" onClick={() => setEntry((e) => (e + "0").slice(0, 3))}>
            0
          </button>
          <button className="btn btn-teal" onClick={submit}>
            ✓
          </button>
        </div>
        <button className="btn btn-ghost" style={{ width: "100%", marginTop: 12 }} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
