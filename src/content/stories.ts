export interface StoryPage {
  art: string;   // ONE big emoji or a short emoji combo representing the scene
  text: string;  // 1-2 short simple sentences, read aloud to a toddler
}
export interface Story {
  id: string;          // kebab-case unique
  title: string;
  emoji: string;       // cover emoji
  moral: string;       // one short kid-friendly takeaway sentence
  pages: StoryPage[];  // 6 to 9 pages
}

export const STORIES: Story[] = [
  {
    id: "two-bunnies-one-carrot",
    title: "Two Bunnies, One Carrot",
    emoji: "🐰",
    moral: "Sharing makes everyone happy.",
    pages: [
      { art: "🐰", text: "Bo the bunny found a big orange carrot." },
      { art: "🥕", text: "He hopped home to eat it all up." },
      { art: "🐰🐰", text: "But here came his friend Lily. She was hungry too." },
      { art: "🤔", text: "Bo looked at the carrot. He looked at Lily." },
      { art: "🔪🥕", text: "\"Let's share!\" said Bo. He broke it in two." },
      { art: "😋😋", text: "Crunch, crunch! Both bunnies munched together." },
      { art: "🐰❤️🐰", text: "Sharing made the carrot taste even better." },
      { art: "🌅", text: "And they shared every snack after that." }
    ]
  },
  {
    id: "little-turtle-big-step",
    title: "Little Turtle's Big Step",
    emoji: "🐢",
    moral: "Being brave means trying, even when you feel small.",
    pages: [
      { art: "🐢", text: "Tilly turtle stood at the edge of the pond." },
      { art: "💧", text: "The water looked deep and cool and wide." },
      { art: "😟", text: "\"I am scared,\" said Tilly. Her little legs shook." },
      { art: "🐸", text: "Her friend frog smiled. \"You can be brave,\" he said." },
      { art: "🐢💨", text: "Tilly took one deep breath. Then one small step." },
      { art: "💦", text: "Splash! She slid into the water." },
      { art: "🐢🏊", text: "Look! Tilly could swim! She was so happy." },
      { art: "🌊😄", text: "Being brave felt wonderful, splash after splash." }
    ]
  },
  {
    id: "the-kind-little-cloud",
    title: "The Kind Little Cloud",
    emoji: "☁️",
    moral: "A little kindness can help a whole lot.",
    pages: [
      { art: "☁️", text: "A small cloud floated high in the blue sky." },
      { art: "🌻", text: "Below, the flowers drooped. They were very thirsty." },
      { art: "😢🌻", text: "\"We need a drink,\" the flowers sighed." },
      { art: "☁️💭", text: "\"I can help!\" said the kind little cloud." },
      { art: "🌧️", text: "Drip, drip, drop. Gentle rain came down." },
      { art: "🌷🌼", text: "The flowers drank and stood up tall." },
      { art: "🌈", text: "Then a bright rainbow said thank you." },
      { art: "☁️😊", text: "The little cloud felt warm and glad inside." }
    ]
  },
  {
    id: "duckling-tries-again",
    title: "Duckling Tries Again",
    emoji: "🐥",
    moral: "If you try again, you can learn anything.",
    pages: [
      { art: "🐥", text: "Pip the duckling wanted to swim like mama." },
      { art: "🦆💦", text: "Mama glided across the pond so smoothly." },
      { art: "🐥💦", text: "Pip jumped in and went wibble, wobble, splash!" },
      { art: "😵", text: "He tipped over and got water in his beak." },
      { art: "🦆❤️", text: "\"Try again, little one,\" said mama softly." },
      { art: "🐥💪", text: "Pip paddled slow. Kick, kick, kick." },
      { art: "🐥🌊", text: "Then he was swimming! Round and round he went." },
      { art: "🦆🐥", text: "\"I did it!\" Pip cheered. Trying again worked." }
    ]
  },
  {
    id: "sleepy-star-goodnight",
    title: "Sleepy Star Says Goodnight",
    emoji: "🌙",
    moral: "Rest helps your body and heart feel calm.",
    pages: [
      { art: "🌙", text: "The moon climbed up. The day was done." },
      { art: "⭐", text: "One little star yawned a big sleepy yawn." },
      { art: "🐻💤", text: "Down below, the bears curled up warm." },
      { art: "🐦🪺", text: "The birds tucked their wings in soft nests." },
      { art: "🌸😴", text: "Even the flowers closed up for the night." },
      { art: "👶🛏️", text: "Snuggle down now, close your eyes." },
      { art: "🌟", text: "Breathe in slow. Breathe out slow." },
      { art: "🌙💤", text: "Goodnight, little one. Sweet, sweet dreams." }
    ]
  },
  {
    id: "fox-and-the-new-friend",
    title: "Fox and the New Friend",
    emoji: "🦊",
    moral: "Saying hello can make a wonderful friend.",
    pages: [
      { art: "🦊", text: "Finn the fox played alone in the meadow." },
      { art: "🦔", text: "A little hedgehog sat nearby, all by himself." },
      { art: "😶", text: "\"Should I say hello?\" Finn wondered quietly." },
      { art: "🦊👋", text: "Finn smiled. \"Hello! Want to play with me?\"" },
      { art: "🦔😊", text: "The hedgehog beamed. \"Yes, please! I do!\"" },
      { art: "⚽", text: "They rolled a berry back and forth, giggling." },
      { art: "🦊🤝🦔", text: "Two friends are better than playing alone." },
      { art: "🌳💕", text: "Now they play together every single day." }
    ]
  },
  {
    id: "helping-hands-at-home",
    title: "Helping Hands at Home",
    emoji: "🏠",
    moral: "Helping your family is a happy thing to do.",
    pages: [
      { art: "🏠", text: "It was a busy morning at Mia's home." },
      { art: "🧺", text: "Mama carried a big basket of laundry." },
      { art: "🐻", text: "\"Can I help?\" asked little Mia bear." },
      { art: "🧦", text: "She matched the socks, one and two." },
      { art: "🍽️", text: "Then she set a spoon at every plate." },
      { art: "🌟", text: "\"Thank you, Mia!\" Mama gave a big hug." },
      { art: "🐻❤️", text: "Helping made Mia feel proud and warm." },
      { art: "🏠😊", text: "Together, the whole home felt cozy and bright." }
    ]
  },
  {
    id: "what-is-under-the-leaf",
    title: "What Is Under the Leaf?",
    emoji: "🍃",
    moral: "The world is full of wonderful things to discover.",
    pages: [
      { art: "🍃", text: "Ollie saw a green leaf in the garden." },
      { art: "👀", text: "\"I wonder what is under there,\" he said." },
      { art: "🐌", text: "He peeked. A tiny snail said hello!" },
      { art: "🌱", text: "Under another leaf grew a little sprout." },
      { art: "🐞", text: "A red ladybug crawled by with spotty wings." },
      { art: "🦋", text: "A butterfly opened its bright, pretty wings." },
      { art: "😄", text: "\"So many friends!\" Ollie laughed with joy." },
      { art: "🌿✨", text: "Nature has surprises if you look closely." }
    ]
  },
  {
    id: "honest-little-puppy",
    title: "The Honest Little Puppy",
    emoji: "🐶",
    moral: "Telling the truth makes your heart feel light.",
    pages: [
      { art: "🐶", text: "Max the puppy played ball in the kitchen." },
      { art: "🏀", text: "Bonk! The ball hit the flower pot." },
      { art: "🪴💥", text: "The little pot tipped over and cracked." },
      { art: "😨", text: "\"Uh oh,\" said Max. His tummy felt funny." },
      { art: "🐶💭", text: "Should he hide? No. Max chose the truth." },
      { art: "🗣️", text: "\"I did it, Mama. I am sorry,\" he said." },
      { art: "🤗", text: "Mama hugged him. \"Thank you for being honest.\"" },
      { art: "🐶✨", text: "Telling the truth made Max feel light again." },
      { art: "🌼", text: "Together they planted the flower in a new pot." }
    ]
  },
  {
    id: "patient-little-seed",
    title: "The Patient Little Seed",
    emoji: "🌱",
    moral: "Good things grow when we wait with patience.",
    pages: [
      { art: "🌰", text: "Rosa planted a tiny seed in the soft dirt." },
      { art: "💧", text: "She gave it water and a sunny spot." },
      { art: "👀", text: "The next day she looked. Nothing yet." },
      { art: "😕", text: "\"When will it grow?\" Rosa asked with a sigh." },
      { art: "⏳", text: "\"Just wait,\" said Grandpa. \"Good things take time.\"" },
      { art: "💧☀️", text: "Day by day she watered. Wait and wait." },
      { art: "🌱", text: "Then one morning, a little green sprout peeked out!" },
      { art: "🌻", text: "Slowly it grew into a tall, happy flower." },
      { art: "😊", text: "Rosa learned that patience helps things bloom." }
    ]
  },
  {
    id: "spots-are-special",
    title: "Spots Are Special",
    emoji: "🦒",
    moral: "Being different is what makes you wonderful.",
    pages: [
      { art: "🦒", text: "Gigi the giraffe had lots of brown spots." },
      { art: "🐴", text: "The other animals were smooth and plain." },
      { art: "😟", text: "\"My spots look so different,\" Gigi said sadly." },
      { art: "🦓", text: "Zara zebra smiled. \"I have stripes, you know!\"" },
      { art: "🦜", text: "Pip the bird had feathers of every color." },
      { art: "🌈", text: "\"Different is beautiful,\" they all sang together." },
      { art: "🦒💛", text: "Gigi looked at her spots and grinned wide." },
      { art: "✨", text: "\"My spots are special. They are just mine!\"" },
      { art: "🐾", text: "Everyone is different, and that is wonderful." }
    ]
  },
  {
    id: "thank-you-bear",
    title: "Thank You, Bear",
    emoji: "🐻",
    moral: "Saying thank you fills the day with warmth.",
    pages: [
      { art: "🐻", text: "Benny bear woke to a bright, happy morning." },
      { art: "🍯", text: "Bee gave him sweet honey for breakfast." },
      { art: "🐝", text: "\"Thank you, bee!\" said Benny with a smile." },
      { art: "🍓", text: "Squirrel shared a berry red and round." },
      { art: "🐿️", text: "\"Thank you, squirrel!\" Benny said again." },
      { art: "☀️", text: "The warm sun shined down just for him." },
      { art: "🐻🙏", text: "\"Thank you, sun, for the cozy, golden day.\"" },
      { art: "💛", text: "Every thank you made Benny's heart grow warm." }
    ]
  },
  {
    id: "the-great-mud-rescue",
    title: "The Great Mud Rescue",
    emoji: "🐷",
    moral: "When we work as a team, we can do big things.",
    pages: [
      { art: "🐷", text: "Pippa the piglet got stuck in the mud." },
      { art: "🟤", text: "\"Help! I cannot move!\" she squealed loudly." },
      { art: "🐔", text: "Hen heard her. \"I am too small alone.\"" },
      { art: "🐑", text: "Sheep came. \"Let's pull together!\" she said." },
      { art: "🐮", text: "Cow came too, strong and ready to help." },
      { art: "💪", text: "\"One, two, three, pull!\" they all called out." },
      { art: "🐷✨", text: "Pop! Out came Pippa, free at last!" },
      { art: "🤝", text: "\"We did it together!\" everyone cheered." },
      { art: "🌾😄", text: "A team can do what one cannot alone." }
    ]
  },
  {
    id: "taking-turns-on-the-swing",
    title: "Taking Turns on the Swing",
    emoji: "🛝",
    moral: "Taking turns means everyone gets a happy go.",
    pages: [
      { art: "🛝", text: "At the park stood one big, shiny swing." },
      { art: "🐵", text: "Momo the monkey wanted to swing so much." },
      { art: "🐰", text: "But little bunny was already swinging high." },
      { art: "😣", text: "\"I want a turn now!\" Momo almost cried." },
      { art: "⏱️", text: "\"Let's take turns,\" said bunny kindly. \"You count ten.\"" },
      { art: "🔢", text: "Momo counted slowly. One, two, three... ten!" },
      { art: "🐵🛝", text: "Now it was Momo's turn to swing way up!" },
      { art: "😄🐰", text: "\"Wheee!\" Both friends laughed and played." },
      { art: "🌳", text: "Taking turns made the swing fun for all." }
    ]
  },
  {
    id: "brave-at-the-dentist",
    title: "Brave at the Dentist",
    emoji: "🦷",
    moral: "New places feel okay when we are brave together.",
    pages: [
      { art: "🦷", text: "Today Leo had his very first dentist visit." },
      { art: "😟", text: "\"What if it is scary?\" Leo whispered." },
      { art: "🧑‍⚕️", text: "The dentist smiled. \"Hello! I keep teeth happy.\"" },
      { art: "🪑", text: "Leo sat in the big chair that goes up." },
      { art: "🪥", text: "\"Open wide,\" she said. \"I will count your teeth.\"" },
      { art: "✨", text: "Tickle, tickle! She cleaned each tooth shiny clean." },
      { art: "🦷😁", text: "\"All done! Your teeth are sparkling,\" she cheered." },
      { art: "⭐", text: "Leo got a sticker for being so brave." },
      { art: "😄", text: "\"That was easy!\" Leo grinned his shiny smile." }
    ]
  },
  {
    id: "first-day-at-the-pond-school",
    title: "First Day at Pond School",
    emoji: "🐸",
    moral: "A new place can become a happy place.",
    pages: [
      { art: "🐸", text: "It was Freddie frog's first day at school." },
      { art: "😦", text: "He held mama's hand. \"I feel a little shy.\"" },
      { art: "🪷", text: "\"You are brave,\" said mama. \"I will be back soon.\"" },
      { art: "🐢🐠", text: "Inside, the other little ones waved hello." },
      { art: "🎨", text: "They painted lily pads in green and pink." },
      { art: "🎵", text: "They sang a song about the splashing rain." },
      { art: "🐸😊", text: "Freddie made a new friend named Tess turtle." },
      { art: "🏡", text: "When mama came, Freddie smiled big and wide." },
      { art: "💚", text: "\"School is fun!\" he said. \"Can we come back?\"" }
    ]
  },
  {
    id: "the-magic-words",
    title: "The Magic Words",
    emoji: "✨",
    moral: "Please and thank you are magic words.",
    pages: [
      { art: "🐭", text: "Milo mouse wanted a slice of yellow cheese." },
      { art: "🧀", text: "\"Give me that!\" he said. The cheese stayed put." },
      { art: "🦉", text: "Wise owl smiled. \"Try the magic words,\" she said." },
      { art: "🤔", text: "\"Magic words?\" asked Milo. \"What are those?\"" },
      { art: "🙏", text: "\"Please\" and \"thank you,\" owl said softly." },
      { art: "😊", text: "\"May I have the cheese, please?\" Milo asked." },
      { art: "🧀✨", text: "Like magic, the cheese slid right to him!" },
      { art: "💛", text: "\"Thank you!\" Milo said. His heart felt warm." },
      { art: "🐭🦉", text: "Please and thank you work like magic every day." }
    ]
  },
  {
    id: "sorry-makes-it-better",
    title: "Sorry Makes It Better",
    emoji: "🤝",
    moral: "Saying sorry and forgiving brings friends back together.",
    pages: [
      { art: "🐻🐰", text: "Bibi bear and Ruby rabbit built a tall tower." },
      { art: "🧱", text: "It stood up high, block by block by block." },
      { art: "💥", text: "Bibi bumped it. Crash! The tower fell down." },
      { art: "😢", text: "\"You broke it!\" cried Ruby. Her eyes filled up." },
      { art: "😟", text: "Bibi felt bad. Her tummy felt all twisty." },
      { art: "🗣️", text: "\"I am sorry, Ruby,\" Bibi said very gently." },
      { art: "🤗", text: "\"It is okay. I forgive you,\" said Ruby." },
      { art: "🧱😊", text: "Together they built the tower up again." },
      { art: "❤️", text: "Sorry and forgive made their friendship strong." }
    ]
  },
  {
    id: "wait-for-your-turn",
    title: "Wait for Your Turn",
    emoji: "⏳",
    moral: "Waiting your turn is kind, and your turn will come.",
    pages: [
      { art: "🎨", text: "At school there was one big tub of paint." },
      { art: "🐱", text: "Coco cat wanted to paint right now!" },
      { art: "🐶", text: "But puppy was painting a bright blue sky." },
      { art: "😤", text: "\"Me first! Me first!\" Coco wanted to shout." },
      { art: "🫶", text: "Teacher said, \"We wait. Your turn is coming.\"" },
      { art: "⏳", text: "Coco took a breath and waited. Tick, tock." },
      { art: "🖌️", text: "\"All done! Your turn now,\" said puppy kindly." },
      { art: "🌈", text: "Coco painted a happy rainbow, big and wide." },
      { art: "😸", text: "Waiting was easy, and her turn was worth it." }
    ]
  },
  {
    id: "tidy-up-time",
    title: "Tidy Up Time",
    emoji: "🧸",
    moral: "Cleaning up your toys makes your room happy.",
    pages: [
      { art: "🧸", text: "Tess played all day. Toys covered the floor!" },
      { art: "🧱🚗", text: "Blocks here, cars there, dolls everywhere." },
      { art: "🕐", text: "\"Tidy up time!\" sang Mama with a smile." },
      { art: "😮", text: "\"So many toys,\" said Tess. \"Where do I start?\"" },
      { art: "📦", text: "\"One at a time,\" said Mama. \"Toys go in the box.\"" },
      { art: "🎵", text: "They sang a tidy song. Plip, plop, in they go." },
      { art: "🧸📦", text: "Bear in the basket. Cars on the shelf." },
      { art: "✨", text: "Soon the floor was clean and shiny and clear." },
      { art: "😄", text: "\"My room is happy!\" Tess cheered with pride." }
    ]
  },
  {
    id: "happy-teeth-before-bed",
    title: "Happy Teeth Before Bed",
    emoji: "🪥",
    moral: "Brushing your teeth keeps your smile bright and happy.",
    pages: [
      { art: "🌙", text: "The moon came up. It was almost bedtime." },
      { art: "🐨", text: "Kip koala gave a great big sleepy yawn." },
      { art: "🪥", text: "\"Brush time!\" said Papa, holding the little brush." },
      { art: "😴", text: "\"But I am sleepy,\" Kip said with a wiggle." },
      { art: "✨", text: "\"Your teeth want to sparkle,\" Papa said with a grin." },
      { art: "🪥🦷", text: "Up and down, round and round, brush, brush, brush." },
      { art: "💧", text: "Swish and spit. Kip's teeth felt clean and fresh." },
      { art: "😁", text: "Kip smiled big. His teeth shined nice and bright." },
      { art: "🛏️", text: "Off to bed with a happy, clean smile. Goodnight!" }
    ]
  },
  {
    id: "gentle-with-the-kitten",
    title: "Gentle With the Kitten",
    emoji: "🐱",
    moral: "Be gentle and kind, and pets will love you back.",
    pages: [
      { art: "🐱", text: "A soft little kitten came to Nina's house." },
      { art: "😍", text: "\"So fluffy!\" said Nina. She wanted to squeeze it." },
      { art: "🫷", text: "\"Gently,\" said Mama. \"Soft hands for the kitten.\"" },
      { art: "🤲", text: "Nina opened her hands soft and slow." },
      { art: "🐾", text: "She petted the kitten with one little finger." },
      { art: "😺", text: "The kitten purred. Purr, purr, purr, so happy." },
      { art: "🥛", text: "Nina gave it warm milk in a tiny dish." },
      { art: "🐱❤️", text: "The kitten curled up safe in Nina's lap." },
      { art: "😊", text: "Being gentle made a brand new furry friend." }
    ]
  },
  {
    id: "snack-time-and-excuse-me",
    title: "Snack Time and Excuse Me",
    emoji: "🍪",
    moral: "Sharing snacks and saying excuse me make snack time sweet.",
    pages: [
      { art: "🍪", text: "Sammy squirrel had a plate of yummy cookies." },
      { art: "🐰🐦", text: "His friends sat down, but their plates were empty." },
      { art: "🤔", text: "Sammy looked at his cookies. So many for one!" },
      { art: "🍪🤲", text: "\"Let's share!\" he said, and passed them around." },
      { art: "😋", text: "Munch, munch! Everyone smiled and chewed." },
      { art: "🙊", text: "Sammy needed to reach across the table." },
      { art: "🗣️", text: "\"Excuse me, please,\" he said, soft and polite." },
      { art: "🥛", text: "He passed the milk so all could have a sip." },
      { art: "💛", text: "Sharing and excuse me made snack time sweet." }
    ]
  },
  {
    id: "a-friend-for-the-new-duck",
    title: "A Friend for the New Duck",
    emoji: "🦆",
    moral: "A kind hello can cheer up someone new or sad.",
    pages: [
      { art: "🦆", text: "A new duck sat alone by the quiet pond." },
      { art: "😞", text: "Her head hung low. She looked very sad." },
      { art: "🐥🐥", text: "The other ducklings played and splashed away." },
      { art: "👀", text: "Little Dot saw the new duck all alone." },
      { art: "🤔", text: "\"She looks sad,\" Dot thought. \"I can help.\"" },
      { art: "🦆👋", text: "\"Hello! I am Dot. Want to play with us?\"" },
      { art: "😊", text: "The new duck smiled. \"Yes, please! Thank you!\"" },
      { art: "💦", text: "They splashed and giggled in the cool, blue water." },
      { art: "🦆❤️🐥", text: "One kind hello turned a sad day glad." }
    ]
  },
  {
    id: "trying-the-green-soup",
    title: "Trying the Green Soup",
    emoji: "🥣",
    moral: "Trying new food can be a tasty surprise.",
    pages: [
      { art: "🥣", text: "Mama set a bowl of bright green soup down." },
      { art: "😯", text: "\"Green soup?\" said Theo. \"I have never tried that.\"" },
      { art: "🥦", text: "It smelled of peas and soft little herbs." },
      { art: "🙅", text: "\"I do not know,\" said Theo. \"It looks new.\"" },
      { art: "🥄", text: "\"Just one little taste,\" Mama said with a smile." },
      { art: "😋", text: "Theo took one small sip. Mmm, warm and sweet!" },
      { art: "🥣💚", text: "\"I like it!\" he said, and ate it all up." },
      { art: "🌟", text: "Trying new things can be a happy surprise." }
    ]
  },
  {
    id: "the-rainy-day-fort",
    title: "The Rainy Day Fort",
    emoji: "🌧️",
    moral: "A little imagination turns any day into an adventure.",
    pages: [
      { art: "🌧️", text: "Pitter, patter. Rain tapped on the window all day." },
      { art: "😕", text: "\"We cannot play outside,\" sighed little Ava." },
      { art: "💡", text: "Then Papa smiled. \"Let's build a cozy fort!\"" },
      { art: "🛋️🧺", text: "They piled up cushions and a big soft sheet." },
      { art: "🏰", text: "\"It is a castle!\" Ava cheered inside the fort." },
      { art: "🔦📖", text: "They read brave stories by the flashlight glow." },
      { art: "🚀", text: "The fort became a ship, then a rocket too." },
      { art: "😄", text: "\"Rainy days are fun!\" Ava said with a grin." },
      { art: "🌈", text: "Imagination made the gray day bright and gold." }
    ]
  },
  {
    id: "the-friendly-night-light",
    title: "The Friendly Night Light",
    emoji: "🌃",
    moral: "The dark is cozy and safe, and you are not alone.",
    pages: [
      { art: "🌙", text: "Night came, and Sam's room grew soft and dark." },
      { art: "😟", text: "\"I do not like the dark,\" Sam said quietly." },
      { art: "🤗", text: "Mama sat close. \"The dark is cozy and kind.\"" },
      { art: "💡", text: "She clicked on a tiny, warm night light." },
      { art: "🧸", text: "\"Teddy is here. And I am right outside,\" she said." },
      { art: "⭐", text: "Out the window, the gentle stars said hello." },
      { art: "😌", text: "Sam breathed slow. The dark felt warm and safe." },
      { art: "😴", text: "He snuggled down with teddy, calm and brave." },
      { art: "🌃💛", text: "Goodnight, dark. Goodnight, stars. All is well." }
    ]
  },
  {
    id: "a-day-at-the-farm",
    title: "A Day at the Farm",
    emoji: "🚜",
    moral: "Asking and looking helps us learn new things.",
    pages: [
      { art: "🚜", text: "Lucy went to the farm on a sunny day." },
      { art: "🐄", text: "\"Moo!\" said the cow, big and brown and slow." },
      { art: "🐑", text: "\"What is that sound?\" Lucy asked. \"Baa!\" said the sheep." },
      { art: "🐔🥚", text: "The hens laid eggs in soft and snuggly straw." },
      { art: "🐷", text: "The pink pigs rolled and played in the mud." },
      { art: "🐴", text: "A tall horse let Lucy pat his soft nose." },
      { art: "🥕", text: "She fed the bunnies crunchy bits of carrot." },
      { art: "😄", text: "\"I learned so much!\" Lucy said with joy." },
      { art: "🌅🚜", text: "Curious days at the farm are the best days." }
    ]
  },
  {
    id: "the-litter-helpers",
    title: "The Litter Helpers",
    emoji: "♻️",
    moral: "We can all help keep the Earth clean and green.",
    pages: [
      { art: "🌳", text: "Max and Mia walked through the pretty park." },
      { art: "🗑️", text: "But oh! Litter lay upon the soft green grass." },
      { art: "😟", text: "\"Poor park,\" said Mia. \"This is not its home.\"" },
      { art: "🧤", text: "They put on gloves and grabbed a little bag." },
      { art: "🥤", text: "They picked up cans, cups, and paper, one by one." },
      { art: "♻️", text: "\"This can be used again!\" said Max, in the bin." },
      { art: "✨🌿", text: "Soon the park was clean and green once more." },
      { art: "🦋🌸", text: "The birds and bugs came back to play and sing." },
      { art: "🌍💚", text: "Helping the Earth made their hearts feel big." }
    ]
  },
  {
    id: "the-birthday-surprise",
    title: "The Birthday Surprise",
    emoji: "🎂",
    moral: "Giving to others is the sweetest gift of all.",
    pages: [
      { art: "🎂", text: "Tomorrow was Grandma's special birthday day." },
      { art: "🤔", text: "\"What can I give her?\" wondered little Rosa." },
      { art: "💡", text: "\"I will make a gift with my own two hands!\"" },
      { art: "🎨", text: "She painted a card with flowers and a sun." },
      { art: "🌼", text: "She picked some daisies, soft and yellow-white." },
      { art: "🎁", text: "She wrapped it up with a big red bow." },
      { art: "👵", text: "\"Surprise! Happy birthday, Grandma!\" Rosa cheered." },
      { art: "🥰", text: "Grandma hugged her tight. \"My favorite gift ever!\"" },
      { art: "💛", text: "Giving made Rosa's heart as warm as cake." }
    ]
  },
  {
    id: "waiting-for-the-cookies",
    title: "Waiting for the Cookies",
    emoji: "🍪",
    moral: "Good things come to those who wait with patience.",
    pages: [
      { art: "🍪", text: "Leo and Papa mixed dough for yummy cookies." },
      { art: "🔥", text: "Into the warm oven the cookies went." },
      { art: "⏰", text: "\"How long?\" asked Leo. \"Soon,\" said Papa kindly." },
      { art: "👀", text: "Leo peeked at the oven again and again." },
      { art: "😣", text: "\"I want one now!\" Leo wiggled and sighed." },
      { art: "🎶", text: "\"Let's sing while we wait,\" said Papa with a smile." },
      { art: "⏳", text: "They sang and tidied. Tick, tock, tick, tock." },
      { art: "🔔", text: "Ding! The timer rang. The cookies were done!" },
      { art: "😋🍪", text: "Warm and sweet! Waiting made them taste the best." }
    ]
  },
  {
    id: "the-tree-through-the-year",
    title: "The Tree Through the Year",
    emoji: "🌳",
    moral: "Nature changes with the seasons, and each one is special.",
    pages: [
      { art: "🌳", text: "By the house stood a tall and friendly tree." },
      { art: "🌸", text: "In spring, soft pink blossoms opened on its arms." },
      { art: "🌳☀️", text: "In summer, green leaves gave cool and shady spots." },
      { art: "🐦", text: "Birds sang and built their nests up in the branches." },
      { art: "🍂", text: "In fall, the leaves turned red and gold and brown." },
      { art: "🍁", text: "Down, down they twirled, like little dancing kites." },
      { art: "❄️", text: "In winter, soft white snow tucked the tree in." },
      { art: "🌨️🌳", text: "It rested, quiet, beneath the sleepy sky." },
      { art: "🌷", text: "Then spring came back, and the tree bloomed again!" }
    ]
  }
  ,
  {
    id: "visit-nani",
    title: "Visit Nani's House",
    emoji: "🏡",
    moral: "Visits with family are full of warmth and stories.",
    pages: [
      { art: "👧", text: "Aanya took the bus to Nani's cozy house by the mango tree." },
      { art: "🧑‍🍳", text: "Nani hummed as she kneaded dough and showed Aanya how to roll rotis." },
      { art: "🍪", text: "They stirred sweet chai and baked little cookies together." },
      { art: "📚", text: "Nani told stories from long ago, with big smiles and gentle hands." },
      { art: "🫶", text: "Aanya hugged Nani and learned a new recipe to try at home." },
      { art: "🏡❤️", text: "At bedtime, Aanya whispered, 'I love Nani's house.'" },
    ]
  },
  {
    id: "help-grandma-cook",
    title: "Help Grandma Cook",
    emoji: "👵",
    moral: "Helping in the kitchen teaches care and pride.",
    pages: [
      { art: "🥕", text: "Rohan washed carrots and counted them one by one." },
      { art: "🍲", text: "Grandma showed him how to stir slowly so nothing sticks." },
      { art: "👩‍🍳", text: "She let Rohan add a little spice and taste with a tiny spoon." },
      { art: "🍽️", text: "When the food was ready, they set the table together." },
      { art: "🤝", text: "Rohan felt proud to help — and Grandma smiled a big warm smile." },
      { art: "😋", text: "They ate the meal together and clapped for Rohan's helping hands." },
    ]
  },
  {
    id: "help-puppy-get-home",
    title: "Help Puppy Get Home",
    emoji: "🐶",
    moral: "Kind helpers bring others safely back to their families.",
    pages: [
      { art: "🐾", text: "Little Paws the puppy wandered away in the busy park." },
      { art: "👀", text: "Mira found tiny footprints and followed them with gentle steps." },
      { art: "🧑‍🤝‍🧑", text: "She asked friendly adults nearby, 'Has anyone seen a lost puppy?'" },
      { art: "🏠", text: "Together they read the collar tag and led Puppy down the street." },
      { art: "🐶🏡", text: "Puppy's family waited worriedly — then cheered with big hugs." },
      { art: "💛", text: "Mira felt happy that helping kept Puppy safe and loved." },
    ]
  }
];
