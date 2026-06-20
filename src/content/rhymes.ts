export interface RhymeEntry {
  word: string;
  rhyme: string;
  wrong: string[];
}

export const RHYMES: RhymeEntry[] = [
  { word: "Cat", rhyme: "Bat", wrong: ["Dog", "Pig", "Sun"] },
  { word: "Star", rhyme: "Car", wrong: ["Tree", "Boat", "Bird"] },
  { word: "Ball", rhyme: "Wall", wrong: ["Hat", "Dog", "Egg"] },
  { word: "Fish", rhyme: "Dish", wrong: ["Cow", "Bee", "Hat"] },
  { word: "Tree", rhyme: "Bee", wrong: ["Horse", "Ship", "Cup"] },
  { word: "Moon", rhyme: "Spoon", wrong: ["Chair", "Dog", "Book"] },
  { word: "Bee", rhyme: "Sea", wrong: ["Hat", "Star", "Ball"] },
  { word: "Door", rhyme: "Floor", wrong: ["Sun", "Cat", "Apple"] },
];
