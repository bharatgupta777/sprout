export interface NumberEntry {
  n: number;
  word: string;
  emoji: string; // the "thing" we count
}

// 1–20 with a countable object each. Younger mode uses 1–5/10, older uses up to 20.
export const NUMBERS: NumberEntry[] = [
  { n: 1, word: "One", emoji: "🍎" },
  { n: 2, word: "Two", emoji: "🐤" },
  { n: 3, word: "Three", emoji: "🎈" },
  { n: 4, word: "Four", emoji: "🐠" },
  { n: 5, word: "Five", emoji: "⭐" },
  { n: 6, word: "Six", emoji: "🍓" },
  { n: 7, word: "Seven", emoji: "🦋" },
  { n: 8, word: "Eight", emoji: "🌸" },
  { n: 9, word: "Nine", emoji: "🐝" },
  { n: 10, word: "Ten", emoji: "🍪" },
  { n: 11, word: "Eleven", emoji: "🚗" },
  { n: 12, word: "Twelve", emoji: "🐞" },
  { n: 13, word: "Thirteen", emoji: "🌼" },
  { n: 14, word: "Fourteen", emoji: "🍇" },
  { n: 15, word: "Fifteen", emoji: "🐟" },
  { n: 16, word: "Sixteen", emoji: "🎵" },
  { n: 17, word: "Seventeen", emoji: "🌟" },
  { n: 18, word: "Eighteen", emoji: "🍒" },
  { n: 19, word: "Nineteen", emoji: "🐧" },
  { n: 20, word: "Twenty", emoji: "🐠" },
];

export function numberWord(n: number): string {
  return NUMBERS.find((x) => x.n === n)?.word ?? String(n);
}
