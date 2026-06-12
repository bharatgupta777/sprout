// Tap-to-fill coloring pictures, built from simple SVG primitives so every
// region is a forgiving, large tap target. "overlay" parts (eyes, antennae)
// are drawn on top and are not colorable.

export type Region =
  | { id: string; type: "circle"; cx: number; cy: number; r: number }
  | { id: string; type: "ellipse"; cx: number; cy: number; rx: number; ry: number }
  | { id: string; type: "rect"; x: number; y: number; w: number; h: number; rx?: number }
  | { id: string; type: "polygon"; points: string };

export type Overlay =
  | { type: "circle"; cx: number; cy: number; r: number; fill: string }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number };

export interface ColorPic {
  id: string;
  title: string;
  emoji: string;
  regions: Region[];
  overlay?: Overlay[];
}

export const COLOR_PICS: ColorPic[] = [
  {
    id: "flower",
    title: "Flower",
    emoji: "🌷",
    regions: [
      { id: "stem", type: "rect", x: 95, y: 105, w: 10, h: 85 },
      { id: "leaf-l", type: "ellipse", cx: 78, cy: 150, rx: 22, ry: 11 },
      { id: "leaf-r", type: "ellipse", cx: 122, cy: 165, rx: 22, ry: 11 },
      { id: "petal-1", type: "circle", cx: 100, cy: 37, r: 24 },
      { id: "petal-2", type: "circle", cx: 64, cy: 63, r: 24 },
      { id: "petal-3", type: "circle", cx: 136, cy: 63, r: 24 },
      { id: "petal-4", type: "circle", cx: 78, cy: 106, r: 24 },
      { id: "petal-5", type: "circle", cx: 122, cy: 106, r: 24 },
      { id: "center", type: "circle", cx: 100, cy: 75, r: 24 },
    ],
  },
  {
    id: "fish",
    title: "Fish",
    emoji: "🐟",
    regions: [
      { id: "body", type: "ellipse", cx: 90, cy: 100, rx: 60, ry: 38 },
      { id: "tail", type: "polygon", points: "150,100 196,70 196,130" },
      { id: "fin-top", type: "polygon", points: "78,66 112,66 95,40" },
      { id: "fin-bot", type: "polygon", points: "78,134 112,134 95,160" },
      { id: "bubble-1", type: "circle", cx: 30, cy: 70, r: 9 },
      { id: "bubble-2", type: "circle", cx: 16, cy: 54, r: 6 },
    ],
    overlay: [{ type: "circle", cx: 60, cy: 90, r: 6, fill: "#2b2350" }],
  },
  {
    id: "butterfly",
    title: "Butterfly",
    emoji: "🦋",
    regions: [
      { id: "wing-tl", type: "ellipse", cx: 70, cy: 72, rx: 34, ry: 40 },
      { id: "wing-tr", type: "ellipse", cx: 130, cy: 72, rx: 34, ry: 40 },
      { id: "wing-bl", type: "ellipse", cx: 74, cy: 132, rx: 28, ry: 30 },
      { id: "wing-br", type: "ellipse", cx: 126, cy: 132, rx: 28, ry: 30 },
      { id: "body", type: "ellipse", cx: 100, cy: 100, rx: 9, ry: 56 },
    ],
    overlay: [
      { type: "line", x1: 100, y1: 46, x2: 86, y2: 26 },
      { type: "line", x1: 100, y1: 46, x2: 114, y2: 26 },
    ],
  },
  {
    id: "house",
    title: "House",
    emoji: "🏠",
    regions: [
      { id: "wall", type: "rect", x: 45, y: 95, w: 110, h: 85 },
      { id: "roof", type: "polygon", points: "33,95 100,40 167,95" },
      { id: "door", type: "rect", x: 88, y: 130, w: 24, h: 50, rx: 4 },
      { id: "window", type: "rect", x: 112, y: 108, w: 26, h: 24, rx: 3 },
      { id: "sun", type: "circle", cx: 172, cy: 30, r: 18 },
    ],
  },
  {
    id: "car",
    title: "Car",
    emoji: "🚗",
    regions: [
      { id: "roof", type: "polygon", points: "62,95 138,95 118,60 82,60" },
      { id: "body", type: "rect", x: 25, y: 95, w: 150, h: 46, rx: 18 },
      { id: "window", type: "polygon", points: "86,92 114,92 110,64 90,64" },
      { id: "wheel-l", type: "circle", cx: 65, cy: 146, r: 20 },
      { id: "wheel-r", type: "circle", cx: 140, cy: 146, r: 20 },
    ],
  },
  {
    id: "rocket",
    title: "Rocket",
    emoji: "🚀",
    regions: [
      { id: "flame", type: "polygon", points: "82,150 118,150 100,196" },
      { id: "body", type: "ellipse", cx: 100, cy: 95, rx: 32, ry: 58 },
      { id: "nose", type: "polygon", points: "70,68 130,68 100,18" },
      { id: "fin-l", type: "polygon", points: "68,108 42,158 68,148" },
      { id: "fin-r", type: "polygon", points: "132,108 158,158 132,148" },
      { id: "window", type: "circle", cx: 100, cy: 84, r: 16 },
    ],
  },
  {
    id: "star",
    title: "Star",
    emoji: "⭐",
    regions: [
      { id: "star", type: "polygon", points: "100,18 122,74 182,74 134,110 152,170 100,134 48,170 66,110 18,74 78,74" },
    ],
  },
  {
    id: "heart",
    title: "Heart",
    emoji: "❤️",
    regions: [
      { id: "heart", type: "polygon", points: "100,182 28,108 28,66 62,44 100,72 138,44 172,66 172,108" },
    ],
  },
  {
    id: "ice-cream",
    title: "Ice Cream",
    emoji: "🍦",
    regions: [
      { id: "scoop-top", type: "circle", cx: 100, cy: 50, r: 28 },
      { id: "scoop-left", type: "circle", cx: 78, cy: 80, r: 26 },
      { id: "scoop-right", type: "circle", cx: 122, cy: 80, r: 26 },
      { id: "cone", type: "polygon", points: "66,96 134,96 100,184" },
    ],
  },
  {
    id: "cake",
    title: "Cake",
    emoji: "🎂",
    regions: [
      { id: "plate", type: "ellipse", cx: 100, cy: 168, rx: 78, ry: 12 },
      { id: "layer-bottom", type: "rect", x: 40, y: 120, w: 120, h: 44, rx: 8 },
      { id: "layer-top", type: "rect", x: 56, y: 86, w: 88, h: 36, rx: 8 },
      { id: "flame", type: "polygon", points: "94,46 106,46 100,28" },
      { id: "candle", type: "rect", x: 96, y: 56, w: 8, h: 30 },
    ],
  },
  {
    id: "tree",
    title: "Tree",
    emoji: "🌳",
    regions: [
      { id: "trunk", type: "rect", x: 90, y: 120, w: 20, h: 64 },
      { id: "leaves-1", type: "circle", cx: 100, cy: 70, r: 42 },
      { id: "leaves-2", type: "circle", cx: 66, cy: 100, r: 30 },
      { id: "leaves-3", type: "circle", cx: 134, cy: 100, r: 30 },
    ],
  },
  {
    id: "sun",
    title: "Sun",
    emoji: "☀️",
    regions: [
      { id: "sun", type: "circle", cx: 100, cy: 100, r: 44 },
      { id: "ray-1", type: "polygon", points: "92,8 108,8 100,44" },
      { id: "ray-2", type: "polygon", points: "92,192 108,192 100,156" },
      { id: "ray-3", type: "polygon", points: "8,92 8,108 44,100" },
      { id: "ray-4", type: "polygon", points: "192,92 192,108 156,100" },
    ],
  },
  {
    id: "balloon",
    title: "Balloon",
    emoji: "🎈",
    regions: [
      { id: "balloon", type: "ellipse", cx: 100, cy: 80, rx: 50, ry: 60 },
      { id: "knot", type: "polygon", points: "92,138 108,138 100,150" },
    ],
  },
  {
    id: "boat",
    title: "Boat",
    emoji: "⛵",
    regions: [
      { id: "hull", type: "polygon", points: "34,120 166,120 142,168 58,168" },
      { id: "sail", type: "polygon", points: "100,30 100,114 40,114" },
      { id: "mast", type: "rect", x: 98, y: 30, w: 6, h: 90 },
      { id: "water", type: "rect", x: 10, y: 172, w: 180, h: 18, rx: 8 },
    ],
  },
];
