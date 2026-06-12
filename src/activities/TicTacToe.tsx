import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { useApp } from "../context/AppContext";

type Cell = "P" | "C" | null; // player vs computer/player-2
const KID = "🐱";
const OPP = "🐶";
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(b: Cell[]): { who: Cell; line: number[] } | null {
  for (const l of LINES) {
    const [a, c, d] = l;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { who: b[a], line: l };
  }
  return null;
}

export function TicTacToe({ onBack }: { onBack: () => void }) {
  const { speak, cheer, tap, award } = useApp();
  const [twoPlayer, setTwoPlayer] = useState(false);
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"P" | "C">("P");
  const [result, setResult] = useState<null | { who: Cell; line: number[] } | "draw">(null);
  const [confetti, setConfetti] = useState(0);
  const timers = useRef<number[]>([]);

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setBoard(Array(9).fill(null));
    setTurn("P");
    setResult(null);
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const finish = (b: Cell[]) => {
    const w = winner(b);
    if (w) {
      setResult(w);
      setConfetti((c) => c + 1);
      if (w.who === "P" || twoPlayer) {
        award(3, "tic-tac-toe");
        cheer(twoPlayer ? (w.who === "P" ? "Cat wins!" : "Dog wins!") : "You win! Hooray!");
      } else {
        speak("I won this time! Let's play again!", { pitch: 1.1 });
      }
      return true;
    }
    if (b.every((x) => x)) {
      setResult("draw");
      speak("It's a tie! Good game!", { expressive: true });
      award(1, "tic-tac-toe");
      return true;
    }
    return false;
  };

  // Friendly, beatable computer: take a winning move, sometimes block, else random.
  const computerMove = (b: Cell[]) => {
    const empty = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
    const tryFind = (who: Cell) => {
      for (const l of LINES) {
        const marks = l.map((i) => b[i]);
        const mine = marks.filter((m) => m === who).length;
        const empt = l.filter((i) => !b[i]);
        if (mine === 2 && empt.length === 1) return empt[0];
      }
      return -1;
    };
    let move = tryFind("C"); // win if possible
    if (move < 0 && Math.random() < 0.6) move = tryFind("P"); // block only sometimes (kid-friendly)
    if (move < 0) move = empty[Math.floor(Math.random() * empty.length)];
    return move;
  };

  const play = (i: number) => {
    if (board[i] || result) return;
    if (!twoPlayer && turn !== "P") return;
    tap();
    const b = board.slice();
    b[i] = turn;
    setBoard(b);
    if (finish(b)) return;

    if (twoPlayer) {
      setTurn(turn === "P" ? "C" : "P");
      return;
    }
    // vs computer
    setTurn("C");
    const t = window.setTimeout(() => {
      const move = computerMove(b);
      if (move >= 0) {
        const b2 = b.slice();
        b2[move] = "C";
        setBoard(b2);
        if (!finish(b2)) setTurn("P");
      }
    }, 700);
    timers.current.push(t);
  };

  const mark = (c: Cell) => (c === "P" ? KID : c === "C" ? OPP : "");
  const banner = result
    ? result === "draw"
      ? "It's a tie! 🤝"
      : result.who === "P"
        ? "🎉 You win!"
        : twoPlayer
          ? `🎉 ${mark(result.who)} wins!`
          : "🐶 Sprout wins — try again!"
    : twoPlayer
      ? `${mark(turn)}'s turn`
      : turn === "P"
        ? "Your turn! 🐱"
        : "Sprout is thinking…";

  return (
    <ActivityShell
      onBack={() => {
        timers.current.forEach(clearTimeout);
        onBack();
      }}
      prompt={<>{banner}</>}
      caption={twoPlayer ? "Two players: take turns" : "You are the cat. Get three in a row!"}
    >
      <Confetti fire={confetti} />
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 }}>
        <button
          className="btn btn-ghost"
          style={{ padding: "8px 14px", fontSize: 15, outline: !twoPlayer ? "3px solid var(--primary)" : "none" }}
          onClick={() => {
            tap();
            setTwoPlayer(false);
            reset();
          }}
        >
          🐱 vs Sprout 🐶
        </button>
        <button
          className="btn btn-ghost"
          style={{ padding: "8px 14px", fontSize: 15, outline: twoPlayer ? "3px solid var(--primary)" : "none" }}
          onClick={() => {
            tap();
            setTwoPlayer(true);
            reset();
          }}
        >
          🐱 2 Players 🐶
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          width: "min(360px, 86vw)",
          margin: "0 auto",
        }}
      >
        {board.map((c, i) => {
          const inWin = result && result !== "draw" && result.line.includes(i);
          return (
            <button
              key={i}
              className="big-choice"
              aria-label={c ? (c === "P" ? "cat" : "dog") : `square ${i + 1}`}
              onClick={() => play(i)}
              style={{
                fontSize: "clamp(40px,12vw,70px)",
                background: inWin ? "#eafff0" : undefined,
                borderColor: inWin ? "var(--leaf)" : undefined,
              }}
            >
              {mark(c)}
            </button>
          );
        })}
      </div>

      <button className="btn btn-teal" style={{ marginTop: 16 }} onClick={() => { tap(); reset(); }}>
        🔁 New Game
      </button>
    </ActivityShell>
  );
}
