export interface LegoChallenge {
  id: string;
  name: string;
  prompt: string;
  // 5x5 grid: R=Red, B=Blue, G=Green, Y=Yellow, O=Orange, P=Purple, .=Empty
  grid: string[][];
}

export const LEGO_CHALLENGES: LegoChallenge[] = [
  {
    id: "colorful-tower",
    name: "Colorful Tower",
    prompt: "Can you build a tall tower?",
    grid: [
      [".", ".", ".", ".", "."],
      [".", ".", "Y", ".", "."],
      [".", ".", "B", ".", "."],
      [".", ".", "R", ".", "."],
      [".", ".", ".", ".", "."]
    ]
  },
  {
    id: "pyramid",
    name: "Little Pyramid",
    prompt: "Let's build a pyramid!",
    grid: [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", "Y", ".", "."],
      [".", "G", "G", "G", "."],
      [".", ".", ".", ".", "."]
    ]
  },
  {
    id: "bridge",
    name: "Arch Bridge",
    prompt: "Can you make a bridge?",
    grid: [
      [".", ".", ".", ".", "."],
      [".", "O", "O", "O", "."],
      [".", "O", ".", "O", "."],
      [".", "O", ".", "O", "."],
      [".", ".", ".", ".", "."]
    ]
  },
  {
    id: "heart",
    name: "Pixel Heart",
    prompt: "Let's build a beautiful heart!",
    grid: [
      [".", "R", ".", "R", "."],
      ["R", "R", "R", "R", "R"],
      ["R", "R", "R", "R", "R"],
      [".", "R", "R", "R", "."],
      [".", ".", "R", ".", "."]
    ]
  },
  {
    id: "letter-h",
    name: "Letter H",
    prompt: "Let's build the letter H!",
    grid: [
      [".", "P", ".", "P", "."],
      [".", "P", "P", "P", "."],
      [".", "P", ".", "P", "."],
      [".", "P", ".", "P", "."],
      [".", ".", ".", ".", "."]
    ]
  }
];
