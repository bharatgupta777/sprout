// Parent-facing growth & health guide content for ages 2–6.
// IMPORTANT: All figures are general, approximate guidance based on WHO/IAP
// growth standards and CDC developmental milestones. Every child grows at their
// own pace — this is NOT medical advice. Always use your pediatrician's growth
// charts and advice for your specific child.

export const GUIDE_DISCLAIMER =
  "These ranges and milestones are general, approximate guidance (based on WHO/IAP growth standards and CDC milestones). Every child is different and grows at their own pace. This is not medical advice — please consult your pediatrician for your child.";

export interface GrowthRow {
  age: string;
  girlWeight: string;
  girlHeight: string;
  boyWeight: string;
  boyHeight: string;
}

// Approximate healthy ranges (roughly 3rd–97th percentile midband, WHO/IAP).
export const GROWTH: GrowthRow[] = [
  { age: "2 years", girlWeight: "10–13.5 kg", girlHeight: "82–90 cm", boyWeight: "10.5–14 kg", boyHeight: "83–92 cm" },
  { age: "3 years", girlWeight: "11.5–16 kg", girlHeight: "90–99 cm", boyWeight: "12–16.5 kg", boyHeight: "91–100 cm" },
  { age: "4 years", girlWeight: "13–18.5 kg", girlHeight: "96–107 cm", boyWeight: "13.5–19 kg", boyHeight: "97–107 cm" },
  { age: "5 years", girlWeight: "14.5–21 kg", girlHeight: "102–114 cm", boyWeight: "15–21.5 kg", boyHeight: "103–114 cm" },
  { age: "6 years", girlWeight: "16–24 kg", girlHeight: "108–121 cm", boyWeight: "16.5–24 kg", boyHeight: "109–121 cm" },
];

export interface MilestoneGroup {
  age: string;
  emoji: string;
  movement: string[];
  language: string[];
  social: string[];
  thinking: string[];
}

export const MILESTONES: MilestoneGroup[] = [
  {
    age: "2 years",
    emoji: "🚼",
    movement: ["Runs and kicks a ball", "Walks up stairs holding on", "Stacks 4+ blocks"],
    language: ["Says 2-word phrases ('more milk')", "Points to things in a book", "Follows 2-step instructions"],
    social: ["Copies others", "Gets excited with other kids", "Shows defiance (normal!)"],
    thinking: ["Sorts shapes and colors", "Completes simple puzzles", "Begins pretend play"],
  },
  {
    age: "3 years",
    emoji: "🧒",
    movement: ["Pedals a tricycle", "Climbs well, runs easily", "Draws lines and circles"],
    language: ["Speaks in 3-word sentences", "Says first name and age", "Strangers understand most speech"],
    social: ["Takes turns (with help)", "Shows affection for friends", "Plays make-believe"],
    thinking: ["Works toys with buttons/levers", "Names some colors", "Understands 'same' and 'different'"],
  },
  {
    age: "4 years",
    emoji: "👧",
    movement: ["Hops and stands on one foot", "Catches a bounced ball", "Pours and cuts with help"],
    language: ["Tells short stories", "Knows some rhymes/songs", "Speaks in full sentences"],
    social: ["Plays cooperatively", "Talks about likes/interests", "Prefers playing with kids over alone"],
    thinking: ["Names some colors and numbers", "Draws a person with 2–4 body parts", "Understands counting"],
  },
  {
    age: "5 years",
    emoji: "🧑",
    movement: ["Skips and hops", "Uses fork, spoon (and learning utensils)", "Can do a somersault"],
    language: ["Speaks very clearly", "Tells a longer story", "Uses future tense ('we will go')"],
    social: ["Wants to please friends", "Follows rules in games", "Shows more independence"],
    thinking: ["Counts to 10 or more", "Draws a person with 6 parts", "Prints some letters/numbers"],
  },
  {
    age: "6 years",
    emoji: "🎒",
    movement: ["Rides a bicycle", "Ties shoes (learning)", "Better balance and coordination"],
    language: ["Reads simple words", "Tells time on a clock (learning)", "Holds a back-and-forth conversation"],
    social: ["Understands sharing and fairness", "Forms friendships", "Wants to be liked and accepted"],
    thinking: ["Longer attention span", "Begins simple addition", "Understands left and right"],
  },
];

export interface MealSection {
  title: string;
  emoji: string;
  items: string[];
}

// India-focused, toddler-friendly meal ideas (mild spice, soft textures for younger).
export const MEALS: MealSection[] = [
  {
    title: "Breakfast",
    emoji: "🌅",
    items: [
      "Idli with mild sambar or coconut chutney",
      "Soft dosa / uttapam with veggies",
      "Poha with peas and a little lemon",
      "Vegetable upma or rava porridge",
      "Moong dal or besan chilla (mini pancakes)",
      "Ragi porridge or ragi malt with jaggery",
      "Paratha (aloo/methi/paneer) with curd",
      "Oats or daliya cooked in milk with banana",
      "Egg bhurji or boiled egg with toast",
    ],
  },
  {
    title: "Lunch & Dinner",
    emoji: "🍛",
    items: [
      "Dal–rice with a spoon of ghee",
      "Soft roti with sabzi (lauki, palak, carrot, beans)",
      "Vegetable khichdi (moong dal + rice + veg)",
      "Curd rice with grated carrot",
      "Rajma or chole (mild) with rice",
      "Vegetable pulao with raita",
      "Sambar rice or rasam rice",
      "Paneer bhurji or palak paneer (mild)",
      "Mild fish or chicken curry with rice (if non-veg)",
    ],
  },
];

export const SNACKS: MealSection = {
  title: "Healthy Snack Ideas",
  emoji: "🍎",
  items: [
    "Fresh fruit: banana, apple, mango, papaya, chikoo, melon",
    "Soaked & chopped almonds, walnuts (no whole nuts for under-4 — choking)",
    "Roasted makhana (fox nuts) with a little ghee",
    "Homemade laddoo: ragi, besan, dates, or sesame",
    "Steamed dhokla or idli",
    "Curd / yogurt or buttermilk",
    "Cheese cubes or paneer cubes",
    "Boiled corn or sweet potato",
    "Sprouts chaat (mild) or moong salad",
    "Banana / mango milkshake or fruit smoothie",
    "Peanut or sesame chikki (small pieces)",
    "Murmura / poha chivda (lightly roasted)",
    "Vegetable sticks (cucumber, carrot) with hung-curd dip",
  ],
};

export const EATING_TIPS: string[] = [
  "Eat together as a family — kids copy what they see.",
  "Never force-feed. Offer; let the child decide how much.",
  "Offer variety and re-offer new foods many times (it can take 10+ tries).",
  "Limit sugar, fried, and packaged snacks; keep treats occasional.",
  "Include iron-rich foods: ragi, jaggery, green leafy veg, dal, eggs.",
  "Add protein + dairy daily: dal, paneer, curd, milk, eggs, beans.",
  "Hydrate with water and milk — not juice, soda, or sugary drinks.",
  "Cut food small; supervise meals to avoid choking (grapes, nuts, hard pieces).",
  "Involve kids in simple cooking — they eat what they help make.",
  "Small frequent meals (3 meals + 2 snacks) suit small tummies.",
];

export const HEALTH_HABITS: string[] = [
  "Sleep: about 11–14 hours/day for 2–3 yrs and 10–13 hours for 3–6 yrs (including naps).",
  "Active play: at least 3 hours of movement spread across the day.",
  "Screen time: AAP suggests under 1 hour/day of quality content for ages 2–5, with you alongside.",
  "Regular pediatric check-ups and on-time vaccinations.",
  "Brush teeth twice daily; first dental visit by age 1–2.",
  "Sunlight and a balanced diet; ask your doctor about vitamin D / iron.",
  "Hand-washing before meals and after play.",
  "Lots of cuddles, reading, and talking — connection fuels the brain.",
];
