# Regeneration Prompt

Paste the prompt below into a capable coding agent to regenerate **Sprout** from scratch as
it currently exists. It is intentionally exhaustive so the rebuild matches this repository.

---

## PROMPT

> Build a finished, production-quality, **offline-capable PWA** called **Sprout — A Learning
> Playground for Little Ones**: an **audio-first, interactive learning playground for children
> ages 2–6** (designed originally for a 4-year-old girl and a 2-year-old boy). Optimize for
> non-readers: everything is **spoken aloud**, navigation is by **picture + color + sound**,
> there are **no fail states**, and touch targets are huge. No backend, no accounts, no PII,
> no external network calls, no ads, no outbound links.
>
> **Stack:** Vite + React 18 + TypeScript (strict). Audio via the **Web Speech API**
> (narration) and **Web Audio API** (earcons + musical notes). **MediaRecorder** for a record
> activity. PWA via **`vite-plugin-pwa`** (Workbox: manifest, service worker, offline
> precache, autoUpdate). Persist progress/settings in **`localStorage`** only. Art is **emoji
> + inline SVG** (no image hosting).
>
> **Architecture:**
> - A central **activity registry** (`src/lib/registry.tsx`): each activity is one entry
>   `{ id, title, emoji, subject, group, color, blurb, Component }`. The home screen renders
>   sections from a `GROUP_ORDER` list via `activitiesByGroup()`.
> - **Content-as-data** under `src/content/*` (typed modules), separate from logic.
> - Shared engines: a generic **`RoundQuiz`** (prompt → options → gentle feedback → win),
>   **`ActivityShell`** (home button, spoken prompt + replay, progress dots), **`WinScreen`**
>   (confetti, awards stars, grows a Garden plant).
> - **`AppContext`** exposes `speak / speakSequence / stopSpeech / cheer / oops / tap / award /
>   updateSettings / completeOnboarding / reset` and a derived `ageMode` ("younger" 2–3 /
>   "older" 4–6) that tunes difficulty.
> - **Audio manager** (`src/lib/audio.ts`): single stream (cancel-before-speak), a
>   **voice-ranking** function preferring neural/natural voices (Google, Microsoft Aria/Jenny,
>   Apple Samantha/Siri) over robotic ones, light prosody "humanizing", an `expressive` mode
>   for cheers, a Chrome **keep-alive** so long narration isn't cut off, plus `chimeTap`,
>   success/oops chimes, and `playNote(freq)` for music.
>
> **Ethical design:** replace streak pressure with a **Garden** that grows one plant per
> finished activity (missing a day costs nothing). Add a wordless **"Tap Sprout!" onboarding**
> (one guaranteed first win). A **Parent Zone** behind a simple math **parent gate** holds
> stats, settings (child name, age level, narration on/off, slower speech, reduced motion,
> narrator-voice picker), a printable pack link, a reset, and a **Growth & Health Guide**.
>
> **Activities (~24), grouped on the home screen:**
> - *Just for Tots:* **Pop & Play** (tap anything → delight, no right/wrong, refills forever).
> - *Letters & Words:* **ABC Phonics** (letter name/sound/word), **Letter Hunt**, **First Words**
>   (vocabulary by category).
> - *Numbers & Logic:* **Counting Critters** (tap to count), **Number Match** (digit↔quantity),
>   **Shapes & Colors**, **Patterns** (complete the pattern), **Code a Path** (sequence arrows
>   to guide a friend home — multiple levels).
> - *Games:* **Tic Tac Toe** (🐱 vs a friendly *beatable* computer that only blocks ~60% of the
>   time, or 2-player pass-and-play; highlight the winning line), **Memory Match** (card flip),
>   **Tap the Animals** (whack-a-mole, 30s round, younger gets longer pops), **Copy the Tune**
>   (Simon-style musical memory on 4 colored pads; 4 notes for younger, 6 for older).
> - *Discover the World:* **Animal Safari** (sounds, facts, habitat filter).
> - *Stories & Songs:* **Story Time** (warm narrated emoji stories) and **Sing Along** (rhymes).
> - *Feelings & Me:* **Feelings**, **Opposites**, **Good Manners** (choose the polite response).
> - *Create:* **Draw Pad** (finger paint + emoji stamps), **Sticker Scene**, **Color-In**
>   (tap-to-fill SVG pictures), **Music Maker** (xylophone: free play + auto "Twinkle"),
>   **Funny Voices** (record your voice, replay as chipmunk/mouse/bee/wobble/sleepy/monster/
>   giant/whale — 9 effects via playbackRate).
>
> **Content depth ("a year's worth"):** full A–Z phonics (name + sound + word + emoji), numbers
> 1–20, 30+ animals (emoji/sound/fact/habitat), 8+ shapes & 12+ colors, **32 narrated stories**
> (6–9 emoji pages each, simple warm sentences, a kid-friendly moral; themes incl. kindness,
> sharing, courage, manners, trying new food, rainy-day imagination, the dark, a farm trip,
> recycling, a birthday surprise, patience, the four seasons), **16 public-domain nursery
> rhymes**, first-words vocabulary (10 categories), **15 coloring pictures**, manners scenarios,
> patterns, and coding levels. Add a daily **"Today's Adventure"** that rotates a fresh mix.
>
> **Growth & Health Guide** (parent-gated screen + `docs/PARENT_GUIDE.md` + `src/content/
> parentGuide.ts`): approximate weight/height ranges for ages 2–6 (girls & boys), developmental
> milestones (movement/language/social/thinking), **India-focused** breakfast/lunch/dinner
> ideas, healthy snack ideas, eating tips, and daily health habits. Open with a clear
> **"general guidance, not medical advice — consult your pediatrician"** disclaimer.
>
> **PWA & deployment:** `vite.config.ts` reads `BASE_PATH` (default `/`) and applies it to the
> Vite `base`, the manifest `start_url`/`scope`, and Workbox `navigateFallback`; use
> `%BASE_URL%` for the apple-touch-icon in `index.html`; reference public assets through
> `import.meta.env.BASE_URL`. Generate maskable PWA icons (192/512). Provide
> `.github/workflows/deploy.yml` to build (`BASE_PATH=/<repo>/`) and publish `dist/` to
> **GitHub Pages**, plus `netlify.toml` and `vercel.json`. Include a **printable activity pack**
> (`public/printables/activity-pack.html`: tracing, counting, shapes, coloring, dot-to-dot,
> maze, parent guide).
>
> **Accessibility & quality:** reduced-motion toggle (also honor `prefers-reduced-motion`),
> captions under prompts, big fonts, friendly high-contrast palette. Keep TypeScript strict
> with `noUnusedLocals`/`noUnusedParameters`; `tsc --noEmit && vite build` must pass clean.
>
> **Docs:** write `PLAN.md` (vision, principles, catalogue, current state, roadmap),
> `DESIGN.md` (architecture & rationale), `docs/PARENT_GUIDE.md` (the health guide), this
> `PROMPT.md`, and a thorough `README.md` (features, run/build, PWA install steps for
> laptop/iPhone/Android, and hosting instructions).
>
> Deliver a polished, kid-delightful, finished product. Run the dev server, verify the build,
> and smoke-test the new activities end-to-end.

---

### Tips for an even closer match
- Have the agent author bulk content (stories, songs, vocabulary) via parallel sub-agents.
- Run an "expert review" pass (child-development, speech/literacy + accessibility, preschool
  EdTech) and apply the highest-impact changes (this is how Pop & Play, the Garden, and the
  wordless onboarding were added).
