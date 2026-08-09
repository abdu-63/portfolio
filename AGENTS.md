# AGENTS.md

Guide for AI coding agents working in this repository.

## Project Overview

A one-page portfolio website for **Abdu**, styled after Apple's design language. It showcases featured projects (manual list) plus all public GitHub repositories (fetched live from the GitHub API). The site is bilingual (FR/EN) with a light/dark theme toggle.

**Tech stack:**
- **React 19** + **TypeScript** (~strict)
- **Vite 8** (build tool, dev server)
- **framer-motion** (spring animations)
- **oxlint** (linter)
- Deployed to **GitHub Pages** under the `/portfolio/` base path

**Architecture:** Simple context-based SPA. `ThemeProvider` and `I18nProvider` wrap the app; section components render static content. All styling is in a single global CSS file (`src/index.css`) using CSS custom properties for theming. No CSS framework, no routing library, no test framework.

## Directory Structure

```
.
├── index.html               # HTML entry (lang="fr", title)
├── vite.config.ts           # base: '/portfolio/' for gh-pages
├── package.json             # scripts: dev, build, lint, preview, deploy
├── public/
│   └── photo-de-profil.jpg  # avatar image (referenced via BASE_URL)
└── src/
    ├── main.tsx             # React root (StrictMode)
    ├── App.tsx              # Composes providers + sections
    ├── index.css            # ALL styles (global, CSS variables, responsive, reduced-motion)
    ├── i18n.tsx             # I18nProvider, useLang, t() helper
    ├── theme.tsx            # ThemeProvider, useTheme (light/dark)
    ├── data/
    │   └── projects.ts      # FeaturedProject type, featuredProjects, githubUsername, excludedRepos, profile
    └── components/
        ├── Navbar.tsx       # Sticky translucent nav + FR/EN + theme toggles
        ├── Hero.tsx         # Avatar, title, subtitle, CTAs
        ├── Projects.tsx     # Featured cards (spring) + GitHub API repo list
        ├── About.tsx        # Bio + skills tags
        └── Contact.tsx      # Email + GitHub links
```

## Build, Lint, Test Commands

There is **no test framework** in this project.

```bash
npm run dev       # Start Vite dev server (HMR). URL shown in output, typically http://localhost:5173/portfolio/
npm run build     # Typecheck (tsc -b) + production build → dist/. Must end with "✓ built".
npm run preview   # Serve the production build locally.
npm run lint      # oxlint. Expect "0 errors" (3 benign fast-refresh warnings are normal).
npm run deploy    # Build + push dist/ to gh-pages branch (requires gh-pages installed).
```

Typecheck is bundled into `npm run build` (`tsc -b`). There is no separate typecheck script.

## Code Conventions

- **Language:** All UI copy is bilingual. Use the `t(fr, en, lang)` helper for any user-facing string. Never hardcode a single-language string in JSX.
- **Naming:** Components are PascalCase files in `src/components/` with default exports. Hooks/contexts use `useX` naming (`useLang`, `useTheme`). Types are PascalCase interfaces.
- **Styling:** Add styles as plain CSS classes in `src/index.css` — do NOT create per-component CSS files or inline styles. Use CSS custom properties (`--bg`, `--text`, `--accent`, etc.) so light/dark theming works automatically.
- **Data:** All content data lives in `src/data/projects.ts`. Add/edit featured projects there, not in components.
- **Comments:** Do not add code comments unless asked.
- **Accessibility:** Respect `prefers-reduced-motion` (already handled globally in CSS). Use semantic elements and `aria-label` on icon-only buttons.

## Key Abstractions

- **`I18nProvider` / `useLang()`** (`src/i18n.tsx`): Provides `{ lang, setLang }`. `Lang = "fr" | "en"`. Persists to `localStorage`. Use `t(fr, en, lang)` for strings.
- **`ThemeProvider` / `useTheme()`** (`src/theme.tsx`): Provides `{ theme, toggle }`. `Theme = "light" | "dark"`. Sets `document.documentElement.dataset.theme`, which drives CSS variables. Persists to `localStorage`.
- **`FeaturedProject`** (`src/data/projects.ts`): `{ name, repo, description: {fr, en}, tags[], github, live? }`. The `repo` field must match the GitHub repo name — it's used to dedupe against the auto-fetched list.
- **`excludedRepos`**: Array of repo names to hide from the auto-fetched "All my repositories" list (forks, school/old projects).
- **`profile`**: `{ name, email, avatar }`. `avatar` uses `import.meta.env.BASE_URL` — always keep this pattern so the path works under the `/portfolio/` base.
- **`Projects.tsx` fetch**: Fetches `https://api.github.com/users/abdu-63/repos`, filters out forks, featured repos, and `excludedRepos`. Has `loading` and `error` states.

## Common Pitfalls

- **Base path (`/portfolio/`):** `vite.config.ts` sets `base: '/portfolio/'`. Any asset referenced by an absolute path (e.g. `/photo-de-profil.jpg`) will 404 in production. Always use `import.meta.env.BASE_URL` for static assets in `public/`.
- **GitHub API rate limit:** The repo fetch is **unauthenticated** (~60 req/hr). Don't add retry loops or refetch on every render. The `error` state already handles failures — keep it.
- **Bilingual content:** Forgetting `t()` on a new string breaks the FR/EN toggle for that text. Always wrap user-facing strings.
- **Theme via CSS variables:** New colors must use the CSS variables (or be added to both `:root` and `:root[data-theme="dark"]` blocks), or they won't adapt to dark mode.
- **`repo` field mismatch:** If a featured project's `repo` name doesn't exactly match its GitHub repo name, it will appear twice (once as featured, once in the auto list).
- **StrictMode double-effect:** `main.tsx` uses `<StrictMode>`, so effects run twice in dev. The `cancelled` flag in the fetch effect handles this — don't remove it.
- **No tests:** Don't assume a test runner exists. Verification is `npm run build` + `npm run lint` + manual browser check.