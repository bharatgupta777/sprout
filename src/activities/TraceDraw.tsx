import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";
import { audio } from "../lib/audio";
import { TRACING_PATTERNS, type TracingPattern, type TracingPoint } from "../content/tracingPatterns";
import { Confetti } from "../components/Confetti";
import { sample } from "../lib/random";

const PALETTE = ["#ff5d5d", "#4cb8ff", "#4cc66a", "#ffd23c", "#ff7a59", "#7c5cff"];
const NOTES_FREQS = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C, D, E, F, G, A, B, C2

export function TraceDraw({ onBack }: { onBack: () => void }) {
  const { tap, award, cheer, speak } = useApp();

  const [category, setCategory] = useState<"selection" | "lines" | "letters" | "numbers" | "shapes">("selection");
  const [roundIndex, setRoundIndex] = useState(0);
  const [sessionPatterns, setSessionPatterns] = useState<TracingPattern[]>([]);
  const [activeColor, setActiveColor] = useState(PALETTE[0]);
  const [showCompleteCheck, setShowCompleteCheck] = useState(false);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-frequency interaction refs to avoid re-render lag
  const isDrawingRef = useRef(false);
  const activeStrokeIndexRef = useRef(0);
  const activePointIndexRef = useRef(0);
  const activeColorRef = useRef(activeColor);
  activeColorRef.current = activeColor;

  const userScribblesRef = useRef<{ x: number; y: number }[]>([]);
  const completedStrokesRef = useRef<TracingPoint[][]>([]);

  const activePattern = sessionPatterns[roundIndex];
  const activePatternRef = useRef<TracingPattern | null>(null);
  activePatternRef.current = activePattern;

  // Initialize a 3-round session when category is selected
  const startSession = (cat: typeof category) => {
    if (cat === "selection") return;
    tap();
    const filtered = TRACING_PATTERNS.filter((p) => p.category === cat);
    // Grab 3 patterns (or all if less than 3)
    const selected = sample(filtered, Math.min(3, filtered.length));
    setSessionPatterns(selected);
    setRoundIndex(0);
    setCategory(cat);
    setShowCompleteCheck(false);
    setDone(false);

    // Reset interaction refs
    activeStrokeIndexRef.current = 0;
    activePointIndexRef.current = 0;
    userScribblesRef.current = [];
    completedStrokesRef.current = [];
  };

  // Speak prompt when a round starts
  useEffect(() => {
    if (activePattern) {
      speak(activePattern.prompt);
      // Reset interaction refs for the new pattern
      activeStrokeIndexRef.current = 0;
      activePointIndexRef.current = 0;
      userScribblesRef.current = [];
      completedStrokesRef.current = [];
      setShowCompleteCheck(false);
    }
  }, [roundIndex, activePattern, speak]);

  // High-DPI canvas setup & Render animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Render loop
    let animFrame: number;
    const render = () => {
      drawCanvas();
      animFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, [category, activePattern, activeColor]);

  // Main canvas drawing logic
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width / (window.devicePixelRatio || 1);
    const H = canvas.height / (window.devicePixelRatio || 1);

    // 1. Clear background
    ctx.clearRect(0, 0, W, H);

    // 2. Draw notebook rules for early-childhood writing feel
    ctx.strokeStyle = "#e9f2ff";
    ctx.lineWidth = 2;
    // Horizontal blue guidelines
    for (let y = W * 0.1; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    // Red left margin line
    ctx.strokeStyle = "#ffccd5";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W * 0.12, 0);
    ctx.lineTo(W * 0.12, H);
    ctx.stroke();

    const pattern = activePatternRef.current;
    if (!pattern) return;

    // Helper functions for coordinates mapping
    const scaleX = (val: number) => (val * W) / 100;
    const scaleY = (val: number) => (val * H) / 100;

    // 3. Draw guiding paths (underneath user drawing)
    pattern.strokes.forEach((stroke, sIdx) => {
      const isCompleted = sIdx < activeStrokeIndexRef.current;
      const isActive = sIdx === activeStrokeIndexRef.current;

      // Draw faint background guideline channel
      ctx.strokeStyle = isCompleted ? "#d9ffd0" : isActive ? "#ece7ff" : "#f1f1f6";
      ctx.lineWidth = 32;
      ctx.beginPath();
      stroke.forEach((pt, pIdx) => {
        if (pIdx === 0) ctx.moveTo(scaleX(pt.x), scaleY(pt.y));
        else ctx.lineTo(scaleX(pt.x), scaleY(pt.y));
      });
      ctx.stroke();

      // Draw middle dashed target line
      ctx.strokeStyle = isCompleted ? "#7ee06b" : isActive ? "#b8aaff" : "#d3d3df";
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      stroke.forEach((pt, pIdx) => {
        if (pIdx === 0) ctx.moveTo(scaleX(pt.x), scaleY(pt.y));
        else ctx.lineTo(scaleX(pt.x), scaleY(pt.y));
      });
      ctx.stroke();
      ctx.setLineDash([]); // clear dash
    });

    // 4. Draw completed strokes in green or matching color
    completedStrokesRef.current.forEach((stroke) => {
      ctx.strokeStyle = "#4cc66a"; // Completed strokes show as perfect green
      ctx.lineWidth = 18;
      ctx.beginPath();
      stroke.forEach((pt, pIdx) => {
        if (pIdx === 0) ctx.moveTo(scaleX(pt.x), scaleY(pt.y));
        else ctx.lineTo(scaleX(pt.x), scaleY(pt.y));
      });
      ctx.stroke();
    });

    // 5. Draw active scribbles drawn by user
    if (userScribblesRef.current.length > 1) {
      ctx.strokeStyle = activeColorRef.current;
      ctx.lineWidth = 16;
      ctx.beginPath();
      userScribblesRef.current.forEach((pt, pIdx) => {
        if (pIdx === 0) ctx.moveTo(scaleX(pt.x), scaleY(pt.y));
        else ctx.lineTo(scaleX(pt.x), scaleY(pt.y));
      });
      ctx.stroke();
    }

    // 6. Draw dots along the active stroke to be popped
    const currentStroke = pattern.strokes[activeStrokeIndexRef.current];
    if (currentStroke) {
      currentStroke.forEach((pt, pIdx) => {
        const isPopped = pIdx < activePointIndexRef.current;
        const isActiveTarget = pIdx === activePointIndexRef.current;

        const x = scaleX(pt.x);
        const y = scaleY(pt.y);

        if (isPopped) {
          // Green popped dot with check
          ctx.fillStyle = "#4cc66a";
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#fff";
          ctx.font = "bold 14px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("✓", x, y);
        } else if (isActiveTarget) {
          // Large pulsing gold target dot
          const pulse = 1 + Math.sin(Date.now() * 0.007) * 0.15;
          const r = 20 * pulse;

          // Outer glowing pulse
          ctx.fillStyle = "rgba(255, 194, 60, 0.35)";
          ctx.beginPath();
          ctx.arc(x, y, r + 8, 0, Math.PI * 2);
          ctx.fill();

          // Main dot
          ctx.fillStyle = "#ffc23c";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();

          // Inner center circle
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(x, y, r * 0.45, 0, Math.PI * 2);
          ctx.fill();

          // Draw a small pointer helper hand waving emoji
          ctx.font = "22px sans-serif";
          ctx.fillText("👆", x + 16, y - 16);
        } else {
          // Faint unvisited dots
          ctx.fillStyle = "rgba(124, 92, 255, 0.4)";
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }
  };

  // Get pointer coordinates relative to canvas bounding box (scaled 0-100)
  const getPointerPos = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (showCompleteCheck) return;
    const pos = getPointerPos(e);
    isDrawingRef.current = true;
    userScribblesRef.current = [pos];
    (e.target as Element).setPointerCapture?.(e.pointerId);
    checkCollision(pos);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current || showCompleteCheck) return;
    const pos = getPointerPos(e);
    userScribblesRef.current.push(pos);
    checkCollision(pos);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    // Don't erase userScribblesRef yet so they can see their partial drawing,
    // but they can continue tracing without losing popped progress.
  };

  // Check if drawing pointer hits the current target guide point
  const checkCollision = (pos: { x: number; y: number }) => {
    const pattern = activePatternRef.current;
    if (!pattern) return;

    const stroke = pattern.strokes[activeStrokeIndexRef.current];
    if (!stroke) return;

    const target = stroke[activePointIndexRef.current];
    if (!target) return;

    // Relative distance calculation
    const dist = Math.hypot(pos.x - target.x, pos.y - target.y);
    const hitThreshold = 8.5; // 8.5% of canvas dimensions (approx. 35-40px hit zone)

    if (dist <= hitThreshold) {
      // 1. Pop point progress
      const currentPointIdx = activePointIndexRef.current;
      audio.playNote(NOTES_FREQS[currentPointIdx % NOTES_FREQS.length]);
      activePointIndexRef.current += 1;

      // Check if stroke completed
      if (activePointIndexRef.current >= stroke.length) {
        // Play success chime
        setTimeout(() => audio.playNote(523.25, 0.35), 100);

        // Save completed stroke to render it static
        completedStrokesRef.current.push(stroke);
        userScribblesRef.current = [];

        // Advance to next stroke or finish pattern
        activeStrokeIndexRef.current += 1;
        activePointIndexRef.current = 0;

        if (activeStrokeIndexRef.current >= pattern.strokes.length) {
          // Completed entire pattern!
          isDrawingRef.current = false;
          setShowCompleteCheck(true);
          setConfetti((c) => c + 1);
          award(2, "trace-learn");
          cheer(`Fantastic! You traced the ${pattern.name}!`);

          // Auto-advance or finish round after a brief pause
          setTimeout(() => {
            handleRoundComplete();
          }, 2400);
        }
      }
    }
  };

  const handleRoundComplete = () => {
    if (roundIndex + 1 >= sessionPatterns.length) {
      // Complete session!
      setDone(true);
    } else {
      // Go to next pattern in current session
      setRoundIndex((r) => r + 1);
    }
  };

  const handleReplayPattern = () => {
    tap();
    activeStrokeIndexRef.current = 0;
    activePointIndexRef.current = 0;
    userScribblesRef.current = [];
    completedStrokesRef.current = [];
    setShowCompleteCheck(false);
    if (activePattern) speak(activePattern.prompt);
  };

  if (category === "selection") {
    return (
      <ActivityShell onBack={onBack} prompt="What would you like to trace? ✏️">
        <div style={{ marginTop: 24 }}>
          <p className="caption" style={{ marginBottom: 20 }}>Select a folder below to trace and learn!</p>
          <div className="choice-grid" style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 500, margin: "0 auto" }}>
            <button className="btn btn-teal" onClick={() => startSession("lines")}>
              📏 Lines
            </button>
            <button className="btn btn-coral" onClick={() => startSession("letters")}>
              🔤 Letters
            </button>
            <button className="btn btn-sun" style={{ color: "#fff" }} onClick={() => startSession("numbers")}>
              🔢 Numbers
            </button>
            <button className="btn" onClick={() => startSession("shapes")}>
              🔴 Shapes
            </button>
          </div>
        </div>
      </ActivityShell>
    );
  }

  if (done) {
    return (
      <WinScreen
        activityId="trace-learn"
        stars={6}
        onBack={onBack}
        onReplay={() => {
          setCategory("selection");
          setDone(false);
        }}
      />
    );
  }

  return (
    <ActivityShell
      onBack={() => setCategory("selection")}
      prompt={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span>{activePattern?.prompt}</span>
          <span style={{ fontSize: 36 }}>{activePattern?.emoji}</span>
        </div>
      }
      caption="Trace the dots using your finger or mouse!"
      onReplay={() => speak(activePattern?.prompt || "")}
      total={sessionPatterns.length}
      current={roundIndex}
    >
      <Confetti fire={confetti} />

      {/* Colors and tools */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {PALETTE.map((color) => (
            <button
              key={color}
              aria-label={`brush color ${color}`}
              onClick={() => {
                tap();
                setActiveColor(color);
              }}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor: color,
                border: activeColor === color ? "4px solid var(--ink)" : "3px solid #fff",
                boxShadow: "var(--shadow-press)",
                cursor: "pointer",
                transition: "transform 0.1s ease",
                transform: activeColor === color ? "scale(1.15)" : "none",
              }}
            />
          ))}
        </div>

        <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 16 }} onClick={handleReplayPattern}>
          🧽 Clear
        </button>
      </div>

      {/* Main Notebook Canvas Frame */}
      <div
        className="pop-in"
        style={{
          position: "relative",
          width: "min(580px, 94vw)",
          height: "min(50vh, 400px)",
          backgroundColor: "#fff",
          borderRadius: 24,
          boxShadow: "var(--shadow)",
          border: "4px solid #ece7ff",
          margin: "0 auto 12px",
          touchAction: "none",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            cursor: "crosshair",
          }}
        />

        {/* Completion Checkmark Overlay */}
        {showCompleteCheck && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              display: "grid",
              placeItems: "center",
              animation: "pop-in 0.3s ease",
            }}
          >
            <div
              style={{
                fontSize: 90,
                color: "#4cc66a",
                animation: "cheer 0.6s ease infinite",
              }}
            >
              🎉 ✓ 🎉
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          className="btn btn-ghost"
          style={{ padding: "10px 20px", fontSize: 18 }}
          onClick={() => {
            tap();
            setCategory("selection");
          }}
        >
          📂 Choose Category
        </button>
        {showCompleteCheck && (
          <button
            className="btn btn-teal pop-in"
            style={{ padding: "10px 24px", fontSize: 18 }}
            onClick={() => {
              tap();
              handleRoundComplete();
            }}
          >
            Next ➡️
          </button>
        )}
      </div>
    </ActivityShell>
  );
}
