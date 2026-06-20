export interface LegoPattern {
  prompt: string;
  caption: string;
  pattern: string[];
  missing: string;
  options: string[];
}

export const LEGO_PATTERNS: LegoPattern[] = [
  { prompt: "Complete the tower.", caption: "Find the missing block.", pattern: ["🟥", "🟦", "?"], missing: "🟥", options: ["🟥", "🟦", "🟩", "🟨"] },
  { prompt: "Which block comes next?", caption: "Pick the block that fits the pattern.", pattern: ["🟩", "🟩", "?"], missing: "🟦", options: ["🟦", "🟥", "🟨", "🟩"] },
  { prompt: "Finish the stack.", caption: "Choose the block that completes the tower.", pattern: ["🟨", "🟧", "?"], missing: "🟨", options: ["🟨", "🟩", "🟦", "🟥"] },
  { prompt: "Pick the matching block.", caption: "Which block matches the others?", pattern: ["🟪", "?", "🟪"], missing: "🟪", options: ["🟪", "🟦", "🟩", "🟧"] },
  { prompt: "Find the missing block.", caption: "Tap the block that belongs in the pattern.", pattern: ["🟦", "🟨", "?"], missing: "🟦", options: ["🟦", "🟥", "🟩", "🟪"] },
];
