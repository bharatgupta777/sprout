import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { useApp } from "../context/AppContext";

const PALETTE = [
  "#ff5d5d", "#ff9f43", "#ffd23c", "#4cc66a", "#19c3b3",
  "#4cb8ff", "#7c5cff", "#ff6fb5", "#9b6b43", "#2b2350",
];
const SIZES = [10, 22, 40];
const STAMPS = ["⭐", "❤️", "🌸", "🦋", "🌈", "☀️", "🐱", "🐶", "🍓", "🚗"];

export function DrawPad({ onBack }: { onBack: () => void }) {
  const { speak, tap, award } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const drewSomething = useRef(false);
  const rewarded = useRef(false);
  const [color, setColor] = useState(PALETTE[6]);
  const [size, setSize] = useState(SIZES[1]);
  const [stamp, setStamp] = useState<string | null>(null);
  const stampRef = useRef<string | null>(null);
  stampRef.current = stamp;

  // Size the canvas to its displayed box (handles high-DPI for crisp lines).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const prev = ctxRef.current?.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctxRef.current = ctx;
      if (prev) ctx.putImageData(prev, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    speak("Draw anything you like!");
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent) => {
    const p = pos(e);
    if (stampRef.current) {
      // Stamp mode: drop the chosen emoji where they tap.
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.font = `${44 + size * 1.6}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(stampRef.current, p.x, p.y);
      }
      markDrew();
      return;
    }
    drawing.current = true;
    last.current = p;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dot(last.current);
  };

  const markDrew = () => {
    if (!drewSomething.current) {
      drewSomething.current = true;
      if (!rewarded.current) {
        rewarded.current = true;
        award(2, "draw-pad");
      }
    }
  };
  const dot = (p: { x: number; y: number }) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = ctxRef.current;
    const p = pos(e);
    if (ctx && last.current) {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    last.current = p;
    markDrew();
  };
  const end = () => {
    drawing.current = false;
    last.current = null;
  };
  const clear = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
    tap();
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Draw anything! 🎨</>}
      caption="Pick a color, then draw with your finger"
    >
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 }}>
        {PALETTE.map((c) => (
          <button
            key={c}
            aria-label={`color ${c}`}
            onClick={() => {
              setColor(c);
              setStamp(null);
              tap();
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: c,
              border: color === c ? "4px solid var(--ink)" : "3px solid #fff",
              boxShadow: "var(--shadow-press)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
        {SIZES.map((s, i) => (
          <button
            key={s}
            aria-label={`brush ${["small", "medium", "big"][i]}`}
            onClick={() => {
              setSize(s);
              tap();
            }}
            className="icon-btn"
            style={{ outline: size === s ? "3px solid var(--primary)" : "none" }}
          >
            <span style={{ width: s, height: s, borderRadius: "50%", background: color, display: "block" }} />
          </button>
        ))}
        <button className="btn btn-coral" style={{ padding: "10px 18px" }} onClick={clear}>
          🧽 Clear
        </button>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 }}>
        <button
          aria-label="Draw mode"
          onClick={() => {
            setStamp(null);
            tap();
          }}
          className="big-choice"
          style={{ width: 46, height: 46, fontSize: 22, aspectRatio: "auto", border: stamp === null ? "3px solid var(--primary)" : "3px solid #ece7ff" }}
        >
          ✏️
        </button>
        {STAMPS.map((s) => (
          <button
            key={s}
            aria-label={`stamp ${s}`}
            onClick={() => {
              setStamp(s);
              tap();
            }}
            className="big-choice"
            style={{ width: 46, height: 46, fontSize: 24, aspectRatio: "auto", border: stamp === s ? "3px solid var(--primary)" : "3px solid #ece7ff" }}
          >
            {s}
          </button>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        style={{
          width: "min(620px, 92vw)",
          height: "min(56vh, 460px)",
          background: "#fff",
          borderRadius: 24,
          boxShadow: "var(--shadow)",
          touchAction: "none",
          display: "block",
          margin: "0 auto",
          border: "4px solid #ece7ff",
        }}
      />
    </ActivityShell>
  );
}
