// "Code a Path": build a sequence of arrow steps to move a character to a goal.
// Teaches sequencing, planning, and directions — the roots of computational thinking.

export type Dir = "up" | "down" | "left" | "right";

export interface CodeLevel {
  id: string;
  rows: number;
  cols: number;
  start: { r: number; c: number };
  goal: { r: number; c: number };
  walls: { r: number; c: number }[];
  hero: string; // emoji
  prize: string; // emoji at goal
}

// Ordered easy -> harder. Younger mode uses the first few.
export const CODE_LEVELS: CodeLevel[] = [
  {
    id: "l1", rows: 1, cols: 3, start: { r: 0, c: 0 }, goal: { r: 0, c: 2 },
    walls: [], hero: "🐢", prize: "🥬",
  },
  {
    id: "l2", rows: 3, cols: 3, start: { r: 2, c: 0 }, goal: { r: 0, c: 0 },
    walls: [], hero: "🐰", prize: "🥕",
  },
  {
    id: "l3", rows: 3, cols: 3, start: { r: 2, c: 0 }, goal: { r: 0, c: 2 },
    walls: [{ r: 1, c: 1 }], hero: "🐝", prize: "🌻",
  },
  {
    id: "l4", rows: 3, cols: 4, start: { r: 0, c: 0 }, goal: { r: 2, c: 3 },
    walls: [{ r: 1, c: 1 }, { r: 1, c: 2 }], hero: "🐶", prize: "🦴",
  },
  {
    id: "l5", rows: 4, cols: 4, start: { r: 3, c: 0 }, goal: { r: 0, c: 3 },
    walls: [{ r: 2, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 2 }], hero: "🐱", prize: "🐟",
  },
  {
    id: "l6", rows: 4, cols: 4, start: { r: 3, c: 3 }, goal: { r: 0, c: 0 },
    walls: [{ r: 2, c: 2 }, { r: 1, c: 1 }, { r: 2, c: 0 }], hero: "🦊", prize: "🍇",
  },
  {
    id: "l7", rows: 5, cols: 5, start: { r: 4, c: 0 }, goal: { r: 0, c: 4 },
    walls: [{ r: 3, c: 1 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 1, c: 3 }],
    hero: "🐧", prize: "🐟",
  },
  {
    id: "l8", rows: 5, cols: 5, start: { r: 0, c: 0 }, goal: { r: 4, c: 4 },
    walls: [{ r: 0, c: 2 }, { r: 1, c: 2 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 4, c: 1 }],
    hero: "🐭", prize: "🧀",
  },
];

export const DIR_DELTA: Record<Dir, { dr: number; dc: number }> = {
  up: { dr: -1, dc: 0 },
  down: { dr: 1, dc: 0 },
  left: { dr: 0, dc: -1 },
  right: { dr: 0, dc: 1 },
};

export const DIR_ARROW: Record<Dir, string> = {
  up: "⬆️",
  down: "⬇️",
  left: "⬅️",
  right: "➡️",
};
