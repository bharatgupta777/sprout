import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { WinScreen } from "../components/WinScreen";
import { CODE_LEVELS, DIR_ARROW, DIR_DELTA, type Dir } from "../content/coding";
import { useApp } from "../context/AppContext";

export function CodePath({ onBack }: { onBack: () => void }) {
  const { ageMode, speak, cheer, oops, tap } = useApp();
  const levelCount = ageMode === "younger" ? 4 : CODE_LEVELS.length;
  const levels = useMemo(() => CODE_LEVELS.slice(0, levelCount), [levelCount]);

  const [levelIdx, setLevelIdx] = useState(0);
  const [program, setProgram] = useState<Dir[]>([]);
  const [pos, setPos] = useState(levels[0].start);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  const level = levels[levelIdx];

  const reset = (li: number) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setProgram([]);
    setPos(levels[li].start);
    setRunning(false);
  };

  useEffect(() => {
    reset(levelIdx);
    const t = window.setTimeout(
      () => speak("Build a path with the arrows, then press Go!"),
      400,
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIdx]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  if (done) {
    return (
      <WinScreen
        activityId="code-path"
        stars={5}
        onBack={onBack}
        onReplay={() => {
          setLevelIdx(0);
          setDone(false);
          reset(0);
        }}
      />
    );
  }

  const isWall = (r: number, c: number) => level.walls.some((w) => w.r === r && w.c === c);

  const add = (d: Dir) => {
    if (running) return;
    tap();
    setProgram((p) => [...p, d]);
  };
  const undo = () => {
    if (running) return;
    tap();
    setProgram((p) => p.slice(0, -1));
  };

  const run = () => {
    if (running || program.length === 0) return;
    setRunning(true);
    let cur = { ...level.start };
    setPos(cur);
    let step = 0;
    let crashed = false;

    const tick = () => {
      if (step >= program.length) {
        // finished program
        if (cur.r === level.goal.r && cur.c === level.goal.c) {
          cheer("You reached it!");
          const t = window.setTimeout(() => {
            if (levelIdx + 1 >= levels.length) setDone(true);
            else setLevelIdx((i) => i + 1);
          }, 1900);
          timers.current.push(t);
        } else {
          oops("Not quite! Try a new path.");
          const t = window.setTimeout(() => reset(levelIdx), 1200);
          timers.current.push(t);
        }
        return;
      }
      const d = program[step++];
      const nr = cur.r + DIR_DELTA[d].dr;
      const nc = cur.c + DIR_DELTA[d].dc;
      if (nr < 0 || nc < 0 || nr >= level.rows || nc >= level.cols || isWall(nr, nc)) {
        crashed = true;
        oops("Bonk! That way is blocked.");
        const t = window.setTimeout(() => reset(levelIdx), 1100);
        timers.current.push(t);
        return;
      }
      cur = { r: nr, c: nc };
      setPos({ ...cur });
      const t = window.setTimeout(tick, 480);
      timers.current.push(t);
    };

    const t0 = window.setTimeout(tick, 300);
    timers.current.push(t0);
    void crashed;
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Help {level.hero} reach {level.prize}!</>}
      caption="Add arrows, then press Go"
      onReplay={() => speak("Build a path with the arrows, then press Go!")}
      total={levels.length}
      current={levelIdx}
    >
      {/* Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${level.cols}, 1fr)`,
          gap: 8,
          width: "min(420px, 90vw)",
          margin: "0 auto",
          aspectRatio: `${level.cols} / ${level.rows}`,
        }}
      >
        {Array.from({ length: level.rows * level.cols }, (_, i) => {
          const r = Math.floor(i / level.cols);
          const c = i % level.cols;
          const isHero = pos.r === r && pos.c === c;
          const isGoal = level.goal.r === r && level.goal.c === c;
          const wall = isWall(r, c);
          return (
            <div
              key={i}
              style={{
                borderRadius: 16,
                background: wall ? "#cdbfff" : "var(--card)",
                boxShadow: "var(--shadow-press)",
                display: "grid",
                placeItems: "center",
                fontSize: "clamp(26px,7vw,44px)",
                transition: "transform 0.2s ease",
              }}
            >
              {isHero ? level.hero : wall ? "🧱" : isGoal ? level.prize : ""}
            </div>
          );
        })}
      </div>

      {/* Program strip */}
      <div
        style={{
          minHeight: 48,
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          justifyContent: "center",
          background: "var(--bg-2)",
          borderRadius: 16,
          padding: 8,
          width: "min(420px,90vw)",
          margin: "0 auto",
        }}
      >
        {program.length === 0 && <span className="caption">Your path shows here…</span>}
        {program.map((d, i) => (
          <span key={i} style={{ fontSize: 26 }}>
            {DIR_ARROW[d]}
          </span>
        ))}
      </div>

      {/* Arrow pad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 64px)", gap: 8, justifyContent: "center" }}>
        <span />
        <button className="icon-btn" aria-label="up" onClick={() => add("up")}>⬆️</button>
        <span />
        <button className="icon-btn" aria-label="left" onClick={() => add("left")}>⬅️</button>
        <button className="icon-btn" aria-label="down" onClick={() => add("down")}>⬇️</button>
        <button className="icon-btn" aria-label="right" onClick={() => add("right")}>➡️</button>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button className="btn btn-ghost" onClick={undo} aria-label="Undo last arrow">↩️ Undo</button>
        <button className="btn btn-teal" onClick={run} aria-label="Run the path">▶️ Go!</button>
      </div>
    </ActivityShell>
  );
}
