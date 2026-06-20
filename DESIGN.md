# Sprout — Design Document

> Architecture and design rationale for **Sprout**, an audio-first, offline-capable
> learning playground (PWA) for children ages 2–6.

## 1. Goals & constraints

| Goal | Why | How it shows up |
|------|-----|-----------------|
| Non-readers can play solo | Users are 2–6 yrs old | Everything is spoken (Web Speech API); navigation is picture/color/sound |
| No failure states | Protect confidence at this age | Wrong taps gently nudge; many activities have no "wrong" at all |
| Works anywhere, offline | Tablets, phones, planes, no Wi‑Fi | PWA + service worker; **zero** backend, zero external network calls |
| Privacy by construction | Kids' product, COPPA-friendly | No accounts, no PII, no trackers; progress in `localStorage` only |
| Easy to extend | "A year's worth" of content | Content-as-data + a plugin **registry** of activities |
| Cheap to run | Commercial readiness | Static site; art is emoji + inline SVG (no image hosting) |

## 2. Tech stack

- **Vite + React 18 + TypeScript** — fast dev, tiny static build, strong typing.
- **Web Speech API** — narration (TTS) with a custom voice-ranking layer for naturalness.
- **Web Audio API** — earcons (tap/success/oops chimes) and musical notes (Music Maker, Copy the Tune).
- **MediaRecorder API** — Funny Voices (record → play back with pitch/rate effects).
- **`vite-plugin-pwa` (Workbox)** — manifest, service worker, offline precache, auto-update.
- **`localStorage`** — progress + settings persistence. No database.

## 3. High-level architecture

```
index.html
 └─ main.tsx → <AppProvider> (context: state, settings, audio) → <App>
      ├─ Onboarding (wordless "Tap Sprout!" first-run)
      ├─ Home (activities grouped by section, "Today's Adventure")
      ├─ Activity view → registry.getActivity(id).Component
      ├─ Garden (collected plants — the reward loop)
      └─ Parent zone (gated): ParentDashboard → GrowthGuide
```

### 3.1 Activity registry (plugin pattern)
`src/lib/registry.tsx` is the single source of truth. Each activity is one entry:

```ts
interface ActivityMeta {
  id: string;          // stable key, also used for progress + localStorage
  title: string;       // shown to parents
  emoji: string;       // the kid-facing "icon"
  subject: string;
  group: string;       // home-screen section (GROUP_ORDER controls order)
  color: string;       // tile accent class
  blurb: string;       // parent guide description
  Component: ComponentType<{ onBack: () => void }>;
}
```

Adding an activity = create a component + add one registry row. The home screen renders
sections from `activitiesByGroup()`; nothing else needs to change.

### 3.2 Content as data
All teachable content lives in typed modules under `src/content/` (`letters`, `numbers`,
`animals`, `shapes`, `stories`, `songs`, `firstWords`, `colorPics`, `manners`,
`parentGuide`, …). This keeps logic and content separate, makes parallel authoring easy,
and is localization-ready (swap the data, keep the components).

### 3.3 Shared engines
- **`RoundQuiz`** — a generic multiple-choice engine (prompt → options → gentle feedback →
  win). Powers Letter Hunt, Number Match, Shapes & Colors, Feelings, Opposites, Good Manners.
- **`ActivityShell`** — common chrome: home button, spoken prompt + replay, progress dots.
- **`WinScreen`** — celebration; awards stars and grows a Garden plant (idempotent per mount).

### 3.4 Audio subsystem (`src/lib/audio.ts`)
- Single audio stream: **cancel-before-speak** so prompts never overlap.
- **Voice ranking** prefers neural/natural/network voices (Google, Microsoft Aria/Jenny,
  Apple Samantha/Siri) and penalizes robotic/compact voices.
- **Prosody**: light text "humanizing" (punctuation for intonation) + an `expressive` mode
  (varied pitch/rate) for cheers.
- **Keep-alive** heartbeat to stop Chrome cutting off long story narration.
- Earcons + `playNote(freq)` for music; these bypass the narration mute toggle by design.

### 3.5 State & progress (`src/lib/progress.ts`, `AppContext`)
`ProgressState` = `{ stars, plays, lastPlayedDate, streak, badges, garden[], onboarded, settings }`,
persisted to `localStorage`. `AppContext` exposes `speak / speakSequence / stopSpeech /
cheer / oops / tap / award / updateSettings / completeOnboarding / reset` plus a derived
`ageMode` ("younger" 2–3 / "older" 4–6) used to tune difficulty.

## 4. UX principles in code
- **Huge targets**, forgiving hit areas, big rounded tiles.
- **Reduced motion** toggle (also respects `prefers-reduced-motion`).
- **Captions** under spoken prompts for parents/early readers.
- **Parent gate** (simple math question) protects settings, the guide, and reset.
- **Calm**: no ads, no outbound links, no chat, no leaderboards.

## 5. PWA & deployment
- `vite.config.ts` reads `BASE_PATH` (default `/`). The deploy workflow sets it to the repo
  subpath (e.g. `/sprout/`) so assets, the SW `scope`, manifest `start_url/scope`, and
  `navigateFallback` all resolve correctly. `index.html` uses `%BASE_URL%` for the touch icon.
- **GitHub Pages**: `.github/workflows/deploy.yml` builds and publishes `dist/` via the
  official Pages actions. The deployed site is installable as a PWA on laptop/phone.
- Also includes `netlify.toml` / `vercel.json` for one-click static hosting.

## 6. Accessibility & safety
- Audio-first; large fonts; high-contrast, friendly palette.
- COPPA-friendly: no data leaves the device; nothing is collected.
- Health content (Growth & Health Guide) is clearly labeled **general guidance, not medical
  advice**, with a prompt to consult a pediatrician.

## 7. Testing & quality gates
- `tsc --noEmit` (strict, `noUnusedLocals/Parameters`) + `vite build` must pass.
- Manual smoke pass of new activities in dev (`npm run dev`, also exposed on the network).

## 8. Known limitations / future work
- TTS quality varies by device/browser; pre-recorded human audio is the top upgrade.
- No analytics by design — product decisions rely on direct observation.
- Localization pending (architecture already supports it).

## Progress so far
- The app now includes the core PWA structure, home screen grouping, audio-first narration, parent-gated settings, and a Garden-style reward loop.
- The activity registry and content system now support **51 activities** across 9 categories, including family-focused, toddler-first experiences, and tracing/drawing.
- Local build verification passes; the PWA deployment configuration is ready for GitHub Pages, Netlify, and Vercel.

## Next improvements
- Humanize the voice narration further and add a wider range of longer stories.
- Continue expanding family-focused and toddler-focused features such as family relationships, real photo mode, community helper matching, and gesture/sound imitation games.
- Add a parent editor for customizable family members, photos, sounds, vocabulary, and story personalization.
