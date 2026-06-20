# Sprout — A Learning Playground for Little Ones

> "Where curious kids grow." A finished, interactive, year's-worth learning product
> designed for a 4-year-old and a 2-year-old (and any child aged ~2–6).

## Who it's for
- **Primary:** A 4-year-old girl and a 2-year-old boy.
- **Design reality for this age:** They **cannot read fluently**. The product must be
  **audio-first**, **icon-driven**, **tap-friendly** (huge targets), with **instant,
  joyful feedback** and **no dead ends or fail states**. Adults set up; kids self-drive.

## Design principles (the non-negotiables)
1. **Audio-first.** Every prompt, label, and reward is spoken aloud (Web Speech API).
   A child who can't read can play 100% independently.
2. **No reading required to navigate.** Picture + color + sound. Big icons.
3. **No failure, only encouragement.** Wrong taps gently nudge ("Try again!"), never punish.
4. **Huge touch targets, forgiving hit areas.** Works great on a tablet.
5. **Short loops, big celebration.** Stars, confetti, mascot cheer after each win.
6. **Calm by default.** Colorful but not overstimulating; no ads, no links out, no chat.
7. **Parent-gated zones.** Settings/dashboard behind a simple adult gate.
8. **Offline-friendly.** No paid APIs, no external image dependencies. Art via emoji + SVG.

## Subjects covered (breadth)
English/Phonics · Math/Numbers · Shapes & Colors · Science & Nature (animals, body, weather)
· General Knowledge · Early Coding/Logic · Life Skills & Emotions · Music & Rhymes · Creativity.

## Formats (so if one doesn't click, another will — "something to fall upon")
- **Interactive web app** (the centerpiece): games, stories, songs, creative play.
- **Printable activity pack** (PDF/print HTML): coloring, tracing, dot-to-dot, mazes —
  screen-free fallback.
- **Parent guide**: what each activity teaches + how to extend it offline.

## Activity catalogue (mini-games, each a self-contained module)
| # | Activity | Subject | Format | Skill |
|---|----------|---------|--------|-------|
| 1 | ABC Phonics | English | Explore/Tap | Letter–sound–word |
| 2 | Letter Hunt | English | Find-it game | Letter recognition |
| 3 | Counting Critters | Math | Count & tap | Counting 1–20 |
| 4 | Number Match | Math | Matching | Digit ↔ quantity |
| 5 | Shapes & Colors | Math/Art | Sort/identify | Shapes, colors |
| 6 | Animal Safari | Science/GK | Explore + fact | Animals & sounds |
| 7 | Story Time | English/Life | Narrated stories | Listening, values |
| 8 | Memory Match | Cognition | Card flip | Memory, focus |
| 9 | Code a Path | Coding/Logic | Sequence puzzle | Sequencing, directions |
| 10 | Feelings | Life skills | Identify | Emotional literacy |
| 11 | Opposites | GK/Language | Match | Concepts (big/small...) |
| 12 | Sing Along | Music | Karaoke-style | Rhythm, rhymes |

## "A year's worth" of content
Depth via data, not just features: full A–Z phonics with words+facts, numbers 1–20,
30+ animals, 8+ shapes, 12+ colors, multiple narrated stories, several rhymes, dozens of
coding levels, emotions, opposites, memory decks. Daily "Today's Adventure" rotates a fresh
mix so there's a new path every day for a year.

## Tech & architecture
- **Vite + React + TypeScript**, no backend, runs locally (`npm run dev`).
- **AudioManager**: Web Speech API wrapper (speak/cancel, kid-friendly voice, rate).
- **Progress**: localStorage (stars, last-played, daily streak) — no accounts, no PII.
- **Plugin architecture**: each activity = a component + a manifest entry in a registry.
  Content lives in typed data modules (`src/content/*`) so it parallelizes cleanly.
- **Shared UI**: NarratedTile, StarBurst/confetti, Mascot (Sprout), ProgressBar, ParentGate.
- **Age adaptivity (my call):** *No hard age walls.* A soft "Younger / Older" toggle tunes
  difficulty (e.g., counting range, number of choices) so both kids use the same home.

## Safety & commercial readiness
- Zero data collection, zero external network calls, no third-party trackers.
- COPPA-friendly by construction. Parent gate on settings.
- Clean componentized code + content-as-data → easy to expand into a real product.

## Expert review → changes applied
The plan was reviewed by three expert personas (a child-development psychologist, a
pediatric speech/literacy + accessibility specialist, and a preschool-EdTech product
designer). Their unanimous, highest-impact recommendations were implemented:
- **Added a true 2-year-old cause-and-effect activity** ("Pop & Play": tap anything →
  delight, no right/wrong, refills forever) — every reviewer flagged this gap.
- **Replaced streak-pressure with an ethical "collecting" loop** — a **Garden** that
  grows a plant every time an activity is finished; missing a day costs nothing.
- **Added a wordless "Tap Sprout!" onboarding** — one guaranteed win teaches the core
  tap gesture to a non-reader, no tutorial text.
- Enforced **one-audio-stream (cancel-before-speak)**, **slower narration**, **captions**,
  **reduced-motion**, and **letter name vs. sound** separation (already in design).
- Known limitation noted by reviewers: Web Speech TTS is robotic and approximates
  phonemes; pre-recorded human audio is the top future upgrade (see Roadmap).

## Build order
1. Scaffold + core framework (audio, rewards, progress, home, parent gate).
2. Content data (parallel agents).
3. Activity modules across all subjects/formats.
4. Parent dashboard + printable pack + guide.
5. Verify build/dev, polish, README.

## Progress so far
- Core PWA architecture, home-screen registry, and parent-gated dashboard are fully in place.
- Added a broader activity library with **51 activities** spanning toddler-first play, letters and vocabulary, numbers and logic, games, world discovery, stories, feelings, family, and creative play.
- Family experiences are now included: Family Photos, Family Voices, Family Match, Family Editor, Pretend Home, and Request a Snack.
- Added the interactive drawing/tracing activity ("Trace & Learn") for nursery children (standing, sleeping, slanting lines, letters, numbers, shapes).
- Redesigned the "Lego Blocks" activity to be an interactive 3D block assembly board with Sandbox and Challenge modes.
- The app build passes locally with `npm run build`; the production preview works and the PWA install flow is verified.
- Content modules under `src/content/` fully support these activities, including stories, songs, vocabulary, and parent guidance.

## Current state (shipped)
- **51 activities** grouped on the home screen into: *Just for Tots, Letters & Words, Numbers & Logic, Games, Discover the World, Stories & Songs, Feelings & Me, Family & Home, Create.*
  - **Just for Tots:** Pop & Play, Peekaboo, Find the Object for non-readers.
  - **Letters & Words:** ABC Sounds, Letter Hunt, First Words, Hindi Words, Word Pop, Rhyming Pairs, Finish the Sound, Trace & Learn.
  - **Numbers & Logic:** Count With Me, How Many?, What's Next?, Code a Path, Lego Blocks (3D Assembly).
  - **Games:** Tic Tac Toe, Memory Match, Tap the Animals, Copy the Tune, Spot the Difference.
  - **Discover the World:** Animal Safari, Baby Animal Match, Animal Sound Match, Color Sorting, Means of Transport, Food Sort, Healthy vs Junk Food, Opposites, Community Helpers, Festival Match, Life Cycles.
  - **Stories & Songs:** Story Time, Sing Along, Music Maker.
  - **Feelings & Me:** Feelings, Emotion Match, Mirror Moves, Good Manners.
  - **Family & Home:** Family Photos, Family Voices, Family Match, Family Editor, Pretend Home, Request a Snack.
  - **Create:** Color In, Draw & Paint, Sticker Scene, Funny Voices.
- **Content depth:** A–Z phonics, numbers 1–20, dozens of animals, stories, songs, vocabulary, patterns, manners scenarios, and early coding levels.
- **Narration:** natural voice ranking, expressive prosody, slower speech toggle, captions, and a keep-alive mechanism so long story narration stays active.
- **Ethical loop:** the **Garden** grows a plant per completed activity — no streak pressure.
- **Parent zone (gated):** stats, settings, voice picker, printable pack, and a **Growth & Health Guide** with general guidance, weight/height ranges, milestones, and India-focused meal/snack ideas.
- **PWA:** installable and offline-capable with service worker, manifest, and maskable icons. `BASE_PATH` is configurable for GitHub Pages and custom deployments.

## Next priorities
- Improve voice quality and make narration sound more human.
- Add longer stories and richer story adventures.
- Expand toddler-specific experiences like sound imitation, peekaboo, object-finding, and family voice album.
- Add a parent content editor for family members, photos, sounds, and vocabulary.

## Deployment
- **GitHub Pages** via `.github/workflows/deploy.yml` (build with `BASE_PATH=/sprout/`,
  publish `dist/`). The deployed website **is** the PWA — installable from the browser.
- Also ships `netlify.toml` and `vercel.json` for one-click static hosting.

## Roadmap (next)
- Pre-recorded human narration (top upgrade over TTS).
- Localization (content-as-data is already i18n-ready).
- More games (matching pairs, simple maze, dot-to-dot on screen) and more stories/songs.

See **DESIGN.md** for architecture, **docs/PARENT_GUIDE.md** for the full health guide, and
**PROMPT.md** for a single prompt that regenerates this entire project.
