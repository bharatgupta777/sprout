export interface ShapeEntry {
  name: string;
  emoji: string;
  hint: string;
}

export const SHAPES: ShapeEntry[] = [
  { name: "Circle", emoji: "⭕", hint: "Round like the sun." },
  { name: "Square", emoji: "🟦", hint: "Four equal sides." },
  { name: "Triangle", emoji: "🔺", hint: "Three pointy corners." },
  { name: "Star", emoji: "⭐", hint: "It twinkles in the sky." },
  { name: "Heart", emoji: "❤️", hint: "Full of love." },
  { name: "Diamond", emoji: "🔶", hint: "Shiny and pointy." },
  { name: "Rectangle", emoji: "🟫", hint: "Like a door." },
  { name: "Oval", emoji: "🥚", hint: "Like an egg." },
];

export interface ColorEntry {
  name: string;
  emoji: string;
  hex: string;
}

export const COLORS: ColorEntry[] = [
  { name: "Red", emoji: "🔴", hex: "#ff4d4d" },
  { name: "Blue", emoji: "🔵", hex: "#4c8dff" },
  { name: "Green", emoji: "🟢", hex: "#4cc66a" },
  { name: "Yellow", emoji: "🟡", hex: "#ffc23c" },
  { name: "Orange", emoji: "🟠", hex: "#ff8a3c" },
  { name: "Purple", emoji: "🟣", hex: "#a05cff" },
  { name: "Pink", emoji: "🌸", hex: "#ff6fb5" },
  { name: "Brown", emoji: "🟤", hex: "#9b6b43" },
  { name: "Black", emoji: "⚫", hex: "#2b2350" },
  { name: "White", emoji: "⚪", hex: "#f3f0ff" },
  { name: "Gray", emoji: "🩶", hex: "#9aa0b5" },
  { name: "Rainbow", emoji: "🌈", hex: "#ff6fb5" },
];
