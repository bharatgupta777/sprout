export interface AnimalEntry {
  name: string;
  emoji: string;
  sound: string; // onomatopoeia spoken aloud
  fact: string; // one friendly fact
  habitat: "farm" | "jungle" | "ocean" | "home" | "sky" | "cold";
}

// 30+ animals across habitats — Science & General Knowledge.
export const ANIMALS: AnimalEntry[] = [
  { name: "Dog", emoji: "🐶", sound: "Woof woof!", fact: "Dogs are loyal friends who love to play fetch.", habitat: "home" },
  { name: "Cat", emoji: "🐱", sound: "Meow!", fact: "Cats sleep for most of the day.", habitat: "home" },
  { name: "Cow", emoji: "🐮", sound: "Moo!", fact: "Cows give us milk.", habitat: "farm" },
  { name: "Pig", emoji: "🐷", sound: "Oink oink!", fact: "Pigs love to roll in cool mud.", habitat: "farm" },
  { name: "Sheep", emoji: "🐑", sound: "Baa baa!", fact: "Sheep have warm woolly coats.", habitat: "farm" },
  { name: "Horse", emoji: "🐴", sound: "Neigh!", fact: "Horses can run very fast.", habitat: "farm" },
  { name: "Chicken", emoji: "🐔", sound: "Cluck cluck!", fact: "Chickens lay eggs.", habitat: "farm" },
  { name: "Duck", emoji: "🦆", sound: "Quack quack!", fact: "Ducks love to swim in ponds.", habitat: "farm" },
  { name: "Lion", emoji: "🦁", sound: "Roar!", fact: "The lion is the king of the jungle.", habitat: "jungle" },
  { name: "Tiger", emoji: "🐯", sound: "Grrr!", fact: "Tigers have orange fur with black stripes.", habitat: "jungle" },
  { name: "Elephant", emoji: "🐘", sound: "Pawooo!", fact: "Elephants are the biggest land animals.", habitat: "jungle" },
  { name: "Monkey", emoji: "🐵", sound: "Ooh ooh ah ah!", fact: "Monkeys love to climb trees.", habitat: "jungle" },
  { name: "Frog", emoji: "🐸", sound: "Ribbit!", fact: "Frogs can jump very high.", habitat: "jungle" },
  { name: "Snake", emoji: "🐍", sound: "Hiss!", fact: "Snakes have no legs but move fast.", habitat: "jungle" },
  { name: "Bear", emoji: "🐻", sound: "Grrr!", fact: "Bears love to eat honey.", habitat: "cold" },
  { name: "Penguin", emoji: "🐧", sound: "Squawk!", fact: "Penguins waddle and slide on ice.", habitat: "cold" },
  { name: "Polar Bear", emoji: "🐻‍❄️", sound: "Grrr!", fact: "Polar bears live where it is very cold.", habitat: "cold" },
  { name: "Fish", emoji: "🐟", sound: "Blub blub!", fact: "Fish breathe under the water.", habitat: "ocean" },
  { name: "Whale", emoji: "🐳", sound: "Whoooo!", fact: "Whales are the biggest animals in the sea.", habitat: "ocean" },
  { name: "Dolphin", emoji: "🐬", sound: "Eee eee!", fact: "Dolphins are very playful and clever.", habitat: "ocean" },
  { name: "Octopus", emoji: "🐙", sound: "Bloop!", fact: "An octopus has eight arms.", habitat: "ocean" },
  { name: "Crab", emoji: "🦀", sound: "Click click!", fact: "Crabs walk sideways on the sand.", habitat: "ocean" },
  { name: "Turtle", emoji: "🐢", sound: "...", fact: "Turtles carry their home on their back.", habitat: "ocean" },
  { name: "Bird", emoji: "🐦", sound: "Tweet tweet!", fact: "Birds can fly high in the sky.", habitat: "sky" },
  { name: "Owl", emoji: "🦉", sound: "Hoo hoo!", fact: "Owls stay awake at night.", habitat: "sky" },
  { name: "Bee", emoji: "🐝", sound: "Bzzzz!", fact: "Bees make sweet honey.", habitat: "sky" },
  { name: "Butterfly", emoji: "🦋", sound: "Flutter!", fact: "Butterflies start life as caterpillars.", habitat: "sky" },
  { name: "Rabbit", emoji: "🐰", sound: "Sniff sniff!", fact: "Rabbits hop and love carrots.", habitat: "home" },
  { name: "Mouse", emoji: "🐭", sound: "Squeak!", fact: "Mice are tiny and quick.", habitat: "home" },
  { name: "Fox", emoji: "🦊", sound: "Yip yip!", fact: "Foxes have big bushy tails.", habitat: "cold" },
  { name: "Giraffe", emoji: "🦒", sound: "Hum!", fact: "Giraffes have very long necks.", habitat: "jungle" },
  { name: "Zebra", emoji: "🦓", sound: "Neigh!", fact: "Every zebra has its own stripes.", habitat: "jungle" },
];
