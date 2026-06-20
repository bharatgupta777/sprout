export interface TracingPoint {
  x: number; // 0 to 100
  y: number; // 0 to 100
}

export interface TracingPattern {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
  category: "lines" | "letters" | "numbers" | "shapes";
  strokes: TracingPoint[][];
}

export const TRACING_PATTERNS: TracingPattern[] = [
  // --- LINES ---
  {
    id: "standing-line",
    name: "Standing Line",
    emoji: "📏",
    prompt: "Draw a standing line from top to bottom!",
    category: "lines",
    strokes: [
      [
        { x: 50, y: 15 },
        { x: 50, y: 50 },
        { x: 50, y: 85 }
      ]
    ]
  },
  {
    id: "sleeping-line",
    name: "Sleeping Line",
    emoji: "📏",
    prompt: "Draw a sleeping line from left to right!",
    category: "lines",
    strokes: [
      [
        { x: 15, y: 50 },
        { x: 50, y: 50 },
        { x: 85, y: 50 }
      ]
    ]
  },
  {
    id: "slanting-line-right",
    name: "Slanting Line",
    emoji: "📏",
    prompt: "Draw a slanting line from top-left to bottom-right!",
    category: "lines",
    strokes: [
      [
        { x: 20, y: 20 },
        { x: 50, y: 50 },
        { x: 80, y: 80 }
      ]
    ]
  },
  {
    id: "slanting-line-left",
    name: "Slanting Line",
    emoji: "📏",
    prompt: "Draw a slanting line from top-right to bottom-left!",
    category: "lines",
    strokes: [
      [
        { x: 80, y: 20 },
        { x: 50, y: 50 },
        { x: 20, y: 80 }
      ]
    ]
  },
  {
    id: "curved-line",
    name: "Curved Line",
    emoji: "〰️",
    prompt: "Let's draw a nice curvy line!",
    category: "lines",
    strokes: [
      [
        { x: 20, y: 20 },
        { x: 20, y: 60 },
        { x: 30, y: 78 },
        { x: 50, y: 85 },
        { x: 70, y: 78 },
        { x: 80, y: 60 },
        { x: 80, y: 20 }
      ]
    ]
  },

  // --- LETTERS ---
  {
    id: "letter-a",
    name: "Letter A",
    emoji: "🅰️",
    prompt: "Trace the letter A!",
    category: "letters",
    strokes: [
      // Left leg
      [
        { x: 50, y: 15 },
        { x: 35, y: 50 },
        { x: 20, y: 85 }
      ],
      // Right leg
      [
        { x: 50, y: 15 },
        { x: 65, y: 50 },
        { x: 80, y: 85 }
      ],
      // Crossbar
      [
        { x: 30, y: 55 },
        { x: 50, y: 55 },
        { x: 70, y: 55 }
      ]
    ]
  },
  {
    id: "letter-b",
    name: "Letter B",
    emoji: "🅱️",
    prompt: "Trace the letter B!",
    category: "letters",
    strokes: [
      // Down stroke
      [
        { x: 30, y: 15 },
        { x: 30, y: 50 },
        { x: 30, y: 85 }
      ],
      // Top loop
      [
        { x: 30, y: 15 },
        { x: 55, y: 18 },
        { x: 65, y: 30 },
        { x: 55, y: 48 },
        { x: 30, y: 48 }
      ],
      // Bottom loop
      [
        { x: 30, y: 48 },
        { x: 60, y: 50 },
        { x: 70, y: 66 },
        { x: 60, y: 82 },
        { x: 30, y: 85 }
      ]
    ]
  },
  {
    id: "letter-c",
    name: "Letter C",
    emoji: "🔤",
    prompt: "Trace the letter C!",
    category: "letters",
    strokes: [
      [
        { x: 70, y: 25 },
        { x: 50, y: 15 },
        { x: 30, y: 30 },
        { x: 20, y: 50 },
        { x: 30, y: 70 },
        { x: 50, y: 85 },
        { x: 70, y: 75 }
      ]
    ]
  },
  {
    id: "letter-d",
    name: "Letter D",
    emoji: "🔤",
    prompt: "Trace the letter D!",
    category: "letters",
    strokes: [
      // Down stroke
      [
        { x: 30, y: 15 },
        { x: 30, y: 50 },
        { x: 30, y: 85 }
      ],
      // Big curve
      [
        { x: 30, y: 15 },
        { x: 60, y: 20 },
        { x: 75, y: 50 },
        { x: 60, y: 80 },
        { x: 30, y: 85 }
      ]
    ]
  },
  {
    id: "letter-e",
    name: "Letter E",
    emoji: "🔤",
    prompt: "Trace the letter E!",
    category: "letters",
    strokes: [
      // Spine
      [
        { x: 30, y: 15 },
        { x: 30, y: 85 }
      ],
      // Top bar
      [
        { x: 30, y: 15 },
        { x: 70, y: 15 }
      ],
      // Mid bar
      [
        { x: 30, y: 50 },
        { x: 60, y: 50 }
      ],
      // Bottom bar
      [
        { x: 30, y: 85 },
        { x: 70, y: 85 }
      ]
    ]
  },

  // --- NUMBERS ---
  {
    id: "number-1",
    name: "Number 1",
    emoji: "1️⃣",
    prompt: "Trace the number 1!",
    category: "numbers",
    strokes: [
      [
        { x: 40, y: 25 },
        { x: 50, y: 15 },
        { x: 50, y: 85 }
      ]
    ]
  },
  {
    id: "number-2",
    name: "Number 2",
    emoji: "2️⃣",
    prompt: "Trace the number 2!",
    category: "numbers",
    strokes: [
      [
        { x: 25, y: 30 },
        { x: 45, y: 15 },
        { x: 65, y: 20 },
        { x: 70, y: 35 },
        { x: 45, y: 60 },
        { x: 25, y: 85 },
        { x: 75, y: 85 }
      ]
    ]
  },
  {
    id: "number-3",
    name: "Number 3",
    emoji: "3️⃣",
    prompt: "Trace the number 3!",
    category: "numbers",
    strokes: [
      // Top half
      [
        { x: 25, y: 25 },
        { x: 50, y: 15 },
        { x: 70, y: 25 },
        { x: 50, y: 50 }
      ],
      // Bottom half
      [
        { x: 50, y: 50 },
        { x: 75, y: 60 },
        { x: 65, y: 80 },
        { x: 40, y: 85 },
        { x: 25, y: 75 }
      ]
    ]
  },

  // --- SHAPES ---
  {
    id: "shape-circle",
    name: "Circle",
    emoji: "🔴",
    prompt: "Let's draw a round circle!",
    category: "shapes",
    strokes: [
      [
        { x: 50, y: 15 },
        { x: 75, y: 25 },
        { x: 85, y: 50 },
        { x: 75, y: 75 },
        { x: 50, y: 85 },
        { x: 25, y: 75 },
        { x: 15, y: 50 },
        { x: 25, y: 25 },
        { x: 50, y: 15 }
      ]
    ]
  },
  {
    id: "shape-triangle",
    name: "Triangle",
    emoji: "🔺",
    prompt: "Let's draw a triangle!",
    category: "shapes",
    strokes: [
      [
        { x: 50, y: 15 },
        { x: 80, y: 80 },
        { x: 20, y: 80 },
        { x: 50, y: 15 }
      ]
    ]
  },
  {
    id: "shape-square",
    name: "Square",
    emoji: "🟩",
    prompt: "Let's draw a square!",
    category: "shapes",
    strokes: [
      [
        { x: 20, y: 20 },
        { x: 80, y: 20 },
        { x: 80, y: 80 },
        { x: 20, y: 80 },
        { x: 20, y: 20 }
      ]
    ]
  }
];
