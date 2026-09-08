# Elite Player Academy — Funnel

VSL → Application Quiz → Booking → Post-Booking funnel for **Elite Player Academy / KY Training** (Kian Yari), built on Sweep's standard funnel architecture (Vite + React + React Router SPA on Vercel).

Brand, copy, testimonials, and quiz schema were pulled from the client's existing production site (eliteplayeracademy.com) and Sweep OS call insights, then rebuilt on Sweep's standard stack with Sweep OS event tracking wired in.

## Stack

- Vite + React + TypeScript + React Router
- Deploys to Vercel (`vercel.json` SPA rewrite included)
- Sweep OS funnel tracking (`src/lib/sweepTracking.ts`)

## Local dev

```bash
npm install
npm run dev
```

## Env vars

Copy `.env.example` to `.env` and fill in:

| Var | Status |
|-----|--------|
| `VITE_API_BASE_URL` | Set (Sweep OS default) |
| `VITE_FUNNEL_ID` | Set — `af2f3b22-0ab4-40c1-8ba0-5240df806677` |
| `VITE_BOOKING_EMBED_URL` | **Not set** — needs Kian's Calendly (or other scheduler) link |
| `VITE_META_PIXEL_ID` | **Not set** |
| `VITE_CLARITY_PROJECT_ID` | **Not set** |

## Known blockers before this goes live

1. **VSL / post-booking videos won't play off eliteplayeracademy.com.** The Vimeo embeds (`src/data/videos.ts`) are domain-restricted in Vimeo's privacy settings — confirmed by testing locally (`player.vimeo.com` returns "Sorry, we're having a little trouble"). Kian needs to add the new funnel's domain (and `localhost` for dev) to the allowed embed domains in Vimeo's video privacy settings, or re-host the video.
2. **No booking calendar wired yet.** `/booking` shows a graceful fallback until `VITE_BOOKING_EMBED_URL` is set.
3. **No real founder headshot found** among the site's scraped image assets — Kian only appears as a video frame inside the VSL. The two images originally guessed as "founder photos" were actually match-action shots of other athletes (Jesús Barea) and have been re-labeled as decorative background texture only. Supply a real headshot for `ExclusiveProgram`/`FounderManifesto` if a literal founder portrait is wanted there.
4. **Meta Pixel + CAPI, Microsoft Clarity** not yet wired — no IDs/tokens provided yet.
5. Sweep OS event names (`src/lib/sweepTracking.ts` → `EVENTS`) are custom-defined for this funnel per Kian's instruction — mirror them into the Sweep OS Funnels → Steps tab exactly: `page_view`, `vsl_play`, `quiz_start`, `quiz_step`, `form_submit`, `booking_page_view`, `schedule`, `post_booking_view`.
