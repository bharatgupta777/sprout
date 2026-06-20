import { useEffect, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { useApp } from "../context/AppContext";
import { Confetti } from "../components/Confetti";
import { LEGO_CHALLENGES } from "../content/legoPatterns";

const BRICKS = [
  { char: "R", name: "Red", color: "#ff5d5d" },
  { char: "B", name: "Blue", color: "#4cb8ff" },
  { char: "G", name: "Green", color: "#4cc66a" },
  { char: "Y", name: "Yellow", color: "#ffd23c" },
  { char: "O", name: "Orange", color: "#ff7a59" },
  { char: "P", name: "Purple", color: "#7c5cff" },
];

const COLOR_MAP: Record<string, string> = {
  R: "#ff5d5d",
  B: "#4cb8ff",
  G: "#4cc66a",
  Y: "#ffd23c",
  O: "#ff7a59",
  P: "#7c5cff",
};

export function LegoBlocks({ onBack }: { onBack: () => void }) {
  const { tap, speak, award, cheer } = useApp();

  const [mode, setMode] = useState<"menu" | "free" | "challenges">("menu");
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [activeTool, setActiveTool] = useState<string>("R"); // Selected color char or "eraser"
  const [userGrid, setUserGrid] = useState<string[][]>(() =>
    Array.from({ length: 5 }, () => Array(5).fill("."))
  );
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [successOverlay, setSuccessOverlay] = useState(false);

  const activeChallenge = mode === "challenges" ? LEGO_CHALLENGES[challengeIdx] : null;

  // Whenever challenge changes, clear user board and say prompt
  useEffect(() => {
    if (activeChallenge) {
      setUserGrid(Array.from({ length: 5 }, () => Array(5).fill(".")));
      speak(activeChallenge.prompt);
      setSuccessOverlay(false);
    }
  }, [challengeIdx, activeChallenge, speak]);

  const selectMode = (m: typeof mode) => {
    tap();
    setMode(m);
    setDone(false);
    setUserGrid(Array.from({ length: 5 }, () => Array(5).fill(".")));
    if (m === "free") {
      speak("Let's build anything you want with blocks!");
    }
  };

  const handleCellClick = (rIdx: number, cIdx: number) => {
    tap();
    setUserGrid((prevGrid) => {
      const nextGrid = prevGrid.map((row, r) =>
        row.map((cell, c) => {
          if (r === rIdx && c === cIdx) {
            if (activeTool === "eraser") {
              return ".";
            }
            // Toggle cell: if already has this tool, clear it; otherwise set it.
            return cell === activeTool ? "." : activeTool;
          }
          return cell;
        })
      );

      // Check success if in challenge mode
      if (mode === "challenges" && activeChallenge) {
        // Compare nextGrid to activeChallenge.grid
        const isMatched = nextGrid.every((row, r) =>
          row.every((cell, c) => cell === activeChallenge.grid[r][c])
        );

        if (isMatched) {
          triggerChallengeWin();
        }
      }

      return nextGrid;
    });
  };

  const triggerChallengeWin = () => {
    setConfetti((c) => c + 1);
    setSuccessOverlay(true);
    award(3, "lego-blocks");
    cheer(`Hooray! You built the ${activeChallenge?.name}!`);

    setTimeout(() => {
      if (challengeIdx + 1 >= LEGO_CHALLENGES.length) {
        setDone(true);
      } else {
        setChallengeIdx((i) => i + 1);
      }
    }, 2500);
  };

  const handleFreeBuildDone = () => {
    setConfetti((c) => c + 1);
    award(4, "lego-blocks");
    cheer("Wow! That is a beautiful creation! Great building.");
    setTimeout(() => {
      setDone(true);
    }, 2000);
  };

  const clearGrid = () => {
    tap();
    setUserGrid(Array.from({ length: 5 }, () => Array(5).fill(".")));
  };

  // Render a 3D-styled Lego peg brick or empty baseplate slot
  const renderBrick = (char: string, size = 52) => {
    const isFilled = char !== ".";
    const color = COLOR_MAP[char] || "#ece7ff";

    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: isFilled ? color : "#e0e0eb",
          borderRadius: 8,
          border: isFilled ? "3px solid rgba(0, 0, 0, 0.15)" : "2px solid #c7c7d8",
          borderBottomWidth: isFilled ? 6 : 2,
          position: "relative",
          boxShadow: isFilled ? "0 4px 6px rgba(0, 0, 0, 0.12)" : "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
          display: "grid",
          placeItems: "center",
          transition: "transform 0.1s ease",
        }}
      >
        {/* Lego Stud peg in the center */}
        <div
          style={{
            width: size * 0.4,
            height: size * 0.4,
            borderRadius: "50%",
            backgroundColor: isFilled ? "rgba(255, 255, 255, 0.3)" : "#cfcfdd",
            boxShadow: isFilled ? "inset 0 1px 2px rgba(0,0,0,0.15)" : "0 1px 1px rgba(255,255,255,0.5)",
          }}
        />
      </div>
    );
  };

  if (mode === "menu") {
    return (
      <ActivityShell onBack={onBack} prompt="Lego Assembly 🧱">
        <p className="caption" style={{ marginBottom: 24 }}>Pick a way to play and build with blocks!</p>
        <div className="choice-grid" style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 500, margin: "0 auto" }}>
          <button className="btn btn-teal" onClick={() => selectMode("free")}>
            🏰 Free Build
          </button>
          <button className="btn btn-coral" onClick={() => selectMode("challenges")}>
            🎯 Challenges
          </button>
        </div>
      </ActivityShell>
    );
  }

  if (done) {
    return (
      <WinScreen
        activityId="lego-blocks"
        stars={5}
        onBack={onBack}
        onReplay={() => {
          setMode("menu");
          setChallengeIdx(0);
          setDone(false);
        }}
      />
    );
  }

  return (
    <ActivityShell
      onBack={() => setMode("menu")}
      prompt={
        mode === "challenges" ? (
          <span>{activeChallenge?.prompt}</span>
        ) : (
          <span>Build anything! 🧱</span>
        )
      }
      caption={
        mode === "challenges"
          ? "Copy the pattern on the left onto your board!"
          : "Tap a block color, then tap cells on the board to build."
      }
      onReplay={() => speak(activeChallenge?.prompt || "Build anything with blocks!")}
      total={mode === "challenges" ? LEGO_CHALLENGES.length : 1}
      current={mode === "challenges" ? challengeIdx : 0}
    >
      <Confetti fire={confetti} />

      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "10px 0 20px",
        }}
      >
        {/* Challenge reference board (Left) */}
        {mode === "challenges" && activeChallenge && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 16, color: "var(--ink-soft)" }}>Target Model</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 4,
                padding: 10,
                background: "#ece7ff",
                borderRadius: 16,
                boxShadow: "var(--shadow-press)",
              }}
            >
              {activeChallenge.grid.map((row, r) =>
                row.map((cell, c) => (
                  <div key={`${r}-${c}`}>{renderBrick(cell, 34)}</div>
                ))
              )}
            </div>
          </div>
        )}

        {/* User Interactive Board (Right) */}
        <div style={{ position: "relative" }}>
          {mode === "challenges" && (
            <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 16, color: "var(--ink-soft)" }}>Your Board</div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 6,
              padding: 14,
              background: "#dcd6f7",
              borderRadius: 20,
              boxShadow: "var(--shadow)",
            }}
          >
            {userGrid.map((row, rIdx) =>
              row.map((cell, cIdx) => (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleCellClick(rIdx, cIdx)}
                  style={{
                    padding: 0,
                    border: "none",
                    background: "none",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  disabled={successOverlay}
                >
                  {renderBrick(cell, 48)}
                </button>
              ))
            )}
          </div>

          {/* Success checkmark overlay */}
          {successOverlay && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(255,255,255,0.75)",
                display: "grid",
                placeItems: "center",
                borderRadius: 20,
                animation: "pop-in 0.3s ease",
              }}
            >
              <div style={{ fontSize: 72, color: "#4cc66a", animation: "cheer 0.6s ease infinite" }}>✓</div>
            </div>
          )}
        </div>
      </div>

      {/* Block selection Bin & utility controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 500, margin: "0 auto 16px" }}>
        {/* Colors bin */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {BRICKS.map((brick) => (
            <button
              key={brick.char}
              aria-label={`brick color ${brick.name}`}
              onClick={() => {
                tap();
                setActiveTool(brick.char);
              }}
              style={{
                width: 44,
                height: 44,
                backgroundColor: brick.color,
                borderRadius: 10,
                border: activeTool === brick.char ? "4px solid var(--ink)" : "3px solid #fff",
                boxShadow: "var(--shadow-press)",
                transform: activeTool === brick.char ? "scale(1.1)" : "none",
                transition: "transform 0.1s ease",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              />
            </button>
          ))}

          {/* Eraser */}
          <button
            aria-label="Eraser"
            onClick={() => {
              tap();
              setActiveTool("eraser");
            }}
            className="big-choice"
            style={{
              width: 44,
              height: 44,
              fontSize: 20,
              borderRadius: 10,
              aspectRatio: "auto",
              border: activeTool === "eraser" ? "4px solid var(--ink)" : "3px solid #fff",
              boxShadow: "var(--shadow-press)",
              transform: activeTool === "eraser" ? "scale(1.1)" : "none",
            }}
          >
            🧹
          </button>
        </div>

        {/* Clear all */}
        <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 16 }} onClick={clearGrid}>
          🧽 Clear
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          className="btn btn-ghost"
          style={{ padding: "10px 20px", fontSize: 18 }}
          onClick={() => {
            tap();
            setMode("menu");
          }}
        >
          📂 Select Mode
        </button>
        {mode === "free" && (
          <button
            className="btn btn-teal"
            style={{ padding: "10px 24px", fontSize: 18 }}
            onClick={handleFreeBuildDone}
          >
            Done! 🌟
          </button>
        )}
      </div>
    </ActivityShell>
  );
}
