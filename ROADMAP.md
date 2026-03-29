# Roadmap

This document outlines the planned direction for **github-gfi** — what's being worked on now, what's coming next, and what's on the longer-term horizon.

> **Last updated:** March 2026  
> Have an idea? [Open an issue](https://github.com/theAnshul01/github-gfi/issues/new) to discuss it.

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Shipped |
| 🔨 | In progress |
| 📅 | Scheduled |
| 💡 | Planned (unscheduled) |
| 🔭 | Long-term / exploratory |

---

## ✅ Already Shipped

- GitHub Good First Issues explorer with search and language filter
- Pagination
- Light/dark theme toggle (`useTheme` hook)
- Debounced search input (`useDebounce` hook)
- Deployed on Vercel
- Weekend 1 - Graceful Error handling and Sort Options

---

## 📅 Weekend 1 — March 7–8, 2026 (Shipped ✅)

Focus: **User experience polish and resilient error states**

### 🔴 Graceful Error Handling

Right now, if the GitHub API fails — due to network issues, rate limiting, or a bad response — the app likely shows a blank screen or crashes silently. This sprint will fix that.

**Planned work:**
- Display a user-friendly error message component when `githubService.ts` throws
- Handle the GitHub API rate limit (HTTP 403) specifically: show a clear message explaining the limit and optionally prompt the user to provide a Personal Access Token
- Add an `ErrorBoundary` component to catch unexpected runtime errors without crashing the whole page
- Show a "No results found" empty state with a helpful message when search/filter returns zero issues

**Files likely touched:** `App.tsx`, `githubService.ts`, `src/components/ErrorMessage.tsx` (new), `src/components/EmptyState.tsx` (new)

---

### 🔃 Sort Options

Allow users to sort issues beyond the default GitHub ordering so they can surface the most relevant ones faster.

**Planned sort options:**
- Newest (default)
- Oldest
- Most commented
- Recently updated

**Planned work:**
- Add a `SortSelect.tsx` component alongside `LanguageSelect`
- Extend `src/types/filters.ts` with a `SortOption` type
- Pass the sort parameter through to the GitHub API call in `githubService.ts`

**Files likely touched:** `App.tsx`, `githubService.ts`, `src/types/filters.ts`, `src/components/SortSelect.tsx` (new)

---

## ✅ Weekend 2 — March 14–15, 2026 (Shipped ✅)

Focus: **Persistence and auth**

### 🔖 Bookmark Issues (with Supabase Auth)

Let users save interesting issues so they can come back to them later. This will be built on top of a lightweight Supabase backend so bookmarks persist across devices and sessions — not just in `localStorage`.

**Planned work:**

**Auth (Supabase)**
- Set up a Supabase project with GitHub OAuth (fits the audience — developers already have GitHub accounts)
- Add a `useAuth` hook wrapping Supabase's auth client
- Add a login/logout button to the header
- Keep the app fully usable without logging in — auth is opt-in

**Bookmarks**
- Create a `bookmarks` table in Supabase: `(id, user_id, issue_url, issue_title, repo_name, saved_at)`
- Add a `useBookmarks` hook with `addBookmark`, `removeBookmark`, and `isBookmarked` helpers
- Add a bookmark toggle icon button on each issue card
- Add a "Saved Issues" view or filter to browse bookmarked issues
- Unauthenticated users get a prompt to log in when they try to bookmark

**Files likely touched:** `App.tsx`, `src/hooks/useAuth.ts` (new), `src/hooks/useBookmarks.ts` (new), `src/services/supabaseClient.ts` (new), `src/components/IssueCard.tsx` (new/extracted), `src/components/Header.tsx` (new/extracted)

> **Alternative (simpler):** If Supabase integration is out of scope, bookmarks will fall back to `localStorage` with no auth requirement. The `useBookmarks` hook API stays the same — only the persistence layer changes.

---

## 💡 Planned (Unscheduled)

These are confirmed directional goals without a specific sprint date yet.

| Feature | Description |
|---|---|
| **Tests** | Set up **Vitest** + **React Testing Library** for unit and component tests; add GitHub Actions CI workflow |
| **Shareable URLs** | Sync search, language, sort, and page to URL query params so results are bookmarkable and shareable |
| **Mobile responsiveness** | Full Tailwind responsive pass across Navbar, FilterBar, issue cards, and Pagination |
| **GitHub token input** | Let users paste a PAT to raise the API rate limit from 60 → 5,000 req/hr |
| **Skeleton loaders** | Animated placeholders while issues are fetching, instead of a blank content area |
| **Additional filters** | Filter by label (`help wanted`), minimum repo stars, or issue age |
| **Keyboard navigation** | Full keyboard accessibility for filters, pagination, and bookmarks |

---

## 🔭 Long-Term / Exploratory

These are ideas worth tracking but not yet committed to.

- **PWA support** — Make the app installable on mobile via `vite-plugin-pwa`
- **Notifications** — Notify users when a bookmarked issue gets a new comment or is closed
- **Trending issues** — Surface issues that are gaining attention quickly
- **Browser extension** — Embed GFI suggestions directly on GitHub repository pages

---

## How to Get Involved

Every item on this roadmap is an opportunity to contribute. If you want to work on something:

1. Check the [open issues](https://github.com/theAnshul01/github-gfi/issues) — it may already be tracked
2. If not, open a new issue describing what you'd like to build
3. Comment on the issue to let others know you're working on it
4. Follow the steps in [CONTRIBUTING.md](./CONTRIBUTING.md) to set up and submit your PR

No contribution is too small. Documentation fixes, UI tweaks, and test coverage all move the project forward. 🚀
