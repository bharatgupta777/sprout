export interface FoodEntry {
  emoji: string;
  word: string;
  type: "healthy" | "junk";
}

export const FOOD_ITEMS: FoodEntry[] = [
  { emoji: "🥦", word: "Broccoli", type: "healthy" },
  { emoji: "🥕", word: "Carrot", type: "healthy" },
  { emoji: "🍎", word: "Apple", type: "healthy" },
  { emoji: "🥭", word: "Mango", type: "healthy" },
  { emoji: "🍚", word: "Rice", type: "healthy" },
  { emoji: "🍛", word: "Dal", type: "healthy" },
  { emoji: "🍞", word: "Roti", type: "healthy" },
  { emoji: "🥗", word: "Salad", type: "healthy" },
  { emoji: "🥥", word: "Coconut", type: "healthy" },
  { emoji: "🥛", word: "Milk", type: "healthy" },
  { emoji: "🍔", word: "Burger", type: "junk" },
  { emoji: "🍟", word: "Fries", type: "junk" },
  { emoji: "🍕", word: "Pizza", type: "junk" },
  { emoji: "🌭", word: "Hot Dog", type: "junk" },
  { emoji: "🍿", word: "Popcorn", type: "junk" },
  { emoji: "🍰", word: "Cake", type: "junk" },
  { emoji: "🍦", word: "Ice Cream", type: "junk" },
  { emoji: "🍩", word: "Donut", type: "junk" },
  { emoji: "🧁", word: "Cupcake", type: "junk" },
  { emoji: "🍫", word: "Chocolate", type: "junk" },
];
