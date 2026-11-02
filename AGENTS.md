<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace — Assignment 8 Client

Frontend client for a photography-studio marketplace: users browse, filter, book, and manage photo studio listings. Built as the Next.js App Router companion to a separate backend API (`NEXT_PUBLIC_API_URL`, default `http://localhost:8000`).

## Stack

- **Next.js 16.4.3** (App Router) + **React 19.3** + TypeScript (strict)
- **Tailwind CSS v4** (CSS-config via `src/app/globals.css`, no `tailwind.config.js`) with `@tailwindcss/turbopack`
- **shadcn/ui** components in `src/components/ui` (style: `radix-nova`, baseColor: neutral, icons: lucide) — add new primitives via `npx shadcn@latest add <name>`
- **better-auth 1.7** with MongoDB adapter — email/password + Google OAuth
- **react-hot-toast / sonner** for notifications; **recharts**, **swiper**, **embla-carousel** used in spots
- React Compiler is enabled (`babel-plugin-react-compiler` in devDependencies)

## Commands

```bash
npm run dev     # dev server (default http://localhost:3000)
npm run build   # production build
npm run start   # start production server
npm run lint    # eslint (eslint-config-next)
```

There is no test suite or formatting config; match the existing code style by hand.

## Structure

```
src/
├── app/
│   ├── page.tsx                 # Home (Banner, Catagories, FetuerdStudio, HowItWorks, HostGuarantee)
│   ├── (auth)/login/            # Login page (canonical — link to /login everywhere)
│   ├── (auth)/loging/           # Misspelled legacy path — page now only redirect('/login'); don't delete
│   ├── (auth)/register/         # Registration page
│   ├── studios/                 # All studios list
│   │   ├── page.tsx
│   │   └── [id]/page.tsx        # Studio detail
│   ├── studios/edit/[id]/       # Edit a listed studio
│   ├── add-studio/              # Create a new listing
│   ├── my-listings/             # User-owned listings
│   ├── my-bookings/             # User bookings
│   ├── dashboard/               # Dashboard
│   ├── about-us/, how-it-works/ # Static informational pages
│   ├── api/auth/[...all]/route.tsx  # better-auth catch-all route handler
│   ├── layout.tsx               # Root layout (Navbar + Footer wrap every page)
│   ├── loading.tsx, not-found.tsx
│   └── globals.css              # Tailwind v4 entry + theme variables
├── components/
│   ├── ui/                      # shadcn/ui primitives — do not hand-edit; regenerate with the CLI
│   ├── Shared/                  # Navar.tsx (Navbar), Footer, Providers (next-themes), RequireAuth, ThemeToggle
│   ├── Home/                    # Homepage sections
│   └── Studios/                 # StudioCard, FilterBar, BookingModal
├── hooks/                       # use-mobile, use-highlighted-code, types/index.ts
└── lib/                         # utils (cn), auth (better-auth server), auth-client, highlighter
```

## Key patterns & gotchas

- **Path alias:** `@/*` maps to `src/*` (e.g., `@/components/ui/button`).
- **Auth (better-auth):** server config lives in `src/lib/auth.ts` (MongoDB database `studioSpace`); browser usage imports `authClient` from `src/lib/auth-client.ts` (created with `better-auth/react`, `NEXT_PUBLIC_APP_URL`). The route handler at `src/app/api/auth/[...all]/route.tsx` exposes the session endpoints — do not rename or relocate it.
- **Auth guard:** private pages (`add-studio`, `my-listings`, `my-bookings`, `dashboard`, `studios/edit/[id]`) wrap their content in `<RequireAuth>` (`src/components/Shared/RequireAuth.tsx`), which redirects to `/login?redirect=...`. Use it for any new private page.
- **Data fetching:** most pages are client components (`'use client'`) that fetch the external backend with `fetch(\`${process.env.NEXT_PUBLIC_API_URL}/...\`)` in `useEffect`, handling both raw-array and `{ data: [...] }` responses. Follow this pattern for new pages; only `NEXT_PUBLIC_*` vars are reachable in the browser.
- **Images:** `next/image` remote patterns are allow-listed in `next.config.ts` (`i.pravatar.cc`, `images.unsplash.com`, `img.freepik.com`, `i.ibb.co`, `lh3.googleusercontent.com`). User-supplied image URLs are free-text, so add new hosts there when a crash says "hostname ... is not configured" — and restart the dev server (`next.config.ts` changes are not hot-reloaded).
- **Components.json:** `rsc: true`, aliases per above. UI primitives under `components/ui` are generated — prefer the shadcn CLI over manual edits.
- **Spelling quirks to preserve:** folders/routes `loging` (legacy login redirect), `FetuerdStudio.tsx`, `Catagories.tsx`, component `Navar.tsx`. Match existing paths when linking; don't "fix" them silently.
- Some existing comments are written in Bengali/Banglish; keep the style when editing those files.
- The root layout renders Providers (next-themes dark mode), Navbar, Footer, and a global sonner `<Toaster>` around every page — inner pages do **not** re-add them (toasts via sonner are already wired up).

## Environment (.env)

- `NEXT_PUBLIC_API_URL` — backend API base URL (browser-exposed)
- `NEXT_PUBLIC_APP_URL` — this app's own base URL (browser-exposed)
- `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — server-only, used by `src/lib/auth.ts`
