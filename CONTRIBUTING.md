# Contributing to github-gfi

First off — thank you for taking the time to contribute! 🎉  
This document covers everything you need to go from zero to a merged pull request.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Project Overview](#project-overview)
- [How to Contribute](#how-to-contribute)
- [Good First Issues](#good-first-issues)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

---

## Code of Conduct

By participating in this project, you agree to keep interactions respectful and constructive. Harassment, discrimination, or abusive behavior of any kind will not be tolerated. Please be kind — we were all beginners once.

---

## Project Overview

**github-gfi** is a GitHub Good First Issues explorer built with:

- **React** + **Vite** — frontend framework and build tool
- **TypeScript** — strict typing throughout
- **Tailwind CSS** — utility-first styling
- **GitHub REST API** — data source (via `src/services/githubService.ts`)

The goal is to make it easy for developers — especially newcomers to open source — to find beginner-friendly issues across GitHub.

---

## How to Contribute

There are many ways to help, regardless of your experience level:

- Fix bugs or UI issues
- Improve mobile responsiveness
- Add new features (see [open issues](https://github.com/theAnshul01/github-gfi/issues))
- Write or improve tests
- Improve documentation or the README
- Refactor components for readability and maintainability

---

## Good First Issues

Looking for a place to start? Here are well-scoped tasks that are great for first-time contributors:

### 🐛 Fixes & Refactors

| Task | Description | Skill Level |
|---|---|---|
| **Mobile responsiveness** | The Navbar, filters, and cards break on small screens. Use Tailwind's `sm:` / `md:` breakpoints to fix them. | Beginner |
| **Skeleton loading states** | Replace blank states with animated skeleton placeholders while issues are loading. | Beginner |
| **Extract `IssueCard` component** | The issue card UI is likely inline in `App.tsx`. Move it into `src/components/IssueCard.tsx`. | Beginner |
| **Extract `FilterBar` component** | Group the search input and `LanguageSelect` into a dedicated `src/components/FilterBar.tsx`. | Beginner |
| **Extract `Header` component** | Move the page header/navbar out of `App.tsx` into `src/components/Header.tsx`. | Beginner |
| **Add a constants file** | Move hardcoded values (language list, items per page, API base URL) into `src/constants.ts`. | Beginner |
| **Improve error handling UI** | Show a user-friendly error message when the GitHub API fails or rate-limits the request. | Beginner–Intermediate |
| **Add empty state UI** | Show a helpful message and illustration when no issues match the search/filter. | Beginner |

### ✨ Enhancements

| Task | Description | Skill Level |
|---|---|---|
| **GitHub token input** | Add an optional personal access token input to raise the GitHub API rate limit from 60 to 5000 req/hr. | Intermediate |
| **Sort options** | Add a sort dropdown (Newest, Most commented, Recently updated). | Intermediate |
| **Additional filters** | Add filters for labels (e.g. `help wanted`) or minimum repo stars. | Intermediate |
| **Shareable URL state** | Sync all filters (search, language, page) to URL query params so results are shareable. | Intermediate |
| **Bookmark/save issues** | Allow users to save issues locally with `localStorage` for later reference. | Intermediate |
| **Add unit tests** | Set up Vitest + React Testing Library and add tests for `LanguageSelect`, `Pagination`, and `githubService`. | Intermediate |
| **Add GitHub Actions CI** | Add a workflow that runs `tsc`, `eslint`, and tests on every pull request. | Intermediate |
| **Error boundary** | Wrap the app in a React `ErrorBoundary` to gracefully catch runtime errors. | Intermediate |
| **PWA support** | Add a `vite-plugin-pwa` manifest so the app is installable on mobile. | Advanced |

---

## Development Setup

### Prerequisites

- **Node.js** v20 or later
- **npm** (comes with Node)
- A [GitHub personal access token](https://github.com/settings/tokens) is optional but recommended to avoid hitting API rate limits during development.

### Steps

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/github-gfi.git
cd github-gfi

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Useful Commands

```bash
# Type-check the project
npm run build

# Lint the codebase
npx eslint src/
```

---

## Project Structure

```
src/
├── components/
│   ├── LanguageSelect.tsx   # Language filter dropdown
│   └── Pagination.tsx       # Page navigation controls
├── hooks/
│   ├── useDebounce.ts       # Debounces the search input
│   └── useTheme.ts          # Light/dark theme toggle logic
├── services/
│   └── githubService.ts     # All GitHub API calls live here
├── types/
│   ├── filters.ts           # Types for filter state
│   └── github.ts            # Types for GitHub API responses
├── App.tsx                  # Main application component
├── index.css                # Global styles
└── main.tsx                 # App entry point
```

**Key conventions to follow:**

- All API calls go in `src/services/githubService.ts` — never fetch directly inside a component.
- All reusable UI pieces go in `src/components/`.
- All custom hooks go in `src/hooks/`.
- All TypeScript types go in `src/types/`.

---

## Coding Standards

### TypeScript

- Use strict types — avoid `any`.
- Define types/interfaces in `src/types/` and import them where needed.
- Use `interface` for object shapes and `type` for unions or aliases.

### React

- Use functional components with hooks only — no class components.
- Keep components focused: one responsibility per component.
- Avoid putting data fetching logic directly in JSX — use the `githubService` or a custom hook instead.

### Tailwind CSS

- Use Tailwind utility classes for all styling.
- Use responsive prefixes (`sm:`, `md:`, `lg:`) — **do not write custom CSS for layout**.
- Avoid arbitrary values (`w-[347px]`) unless absolutely necessary.

### General

- Keep functions small and well-named.
- Prefer descriptive variable names over short ones.
- No commented-out code in pull requests.
- Make sure `npm run build` completes without errors before submitting.

---

## Submitting a Pull Request

1. **Create a branch** from `main` with a descriptive name:
   ```bash
   git checkout -b fix/mobile-navbar
   # or
   git checkout -b feat/github-token-input
   ```

2. **Make your changes**, following the coding standards above.

3. **Verify your work:**
   ```bash
   npm run build   # must pass with no errors
   npx eslint src/ # must pass with no errors
   ```

4. **Commit** with a clear, concise message:
   ```bash
   git commit -m "fix: make Navbar and filters responsive on mobile"
   ```
   We loosely follow [Conventional Commits](https://www.conventionalcommits.org/):  
   `fix:` for bug fixes, `feat:` for new features, `refactor:` for restructuring, `docs:` for documentation.

5. **Push** and open a Pull Request against the `main` branch:
   ```bash
   git push origin fix/mobile-navbar
   ```

6. In your PR description, include:
   - What the change does and why
   - Screenshots or a screen recording for any UI changes
   - A reference to the related issue (e.g. `Closes #12`)

A maintainer will review your PR and may leave feedback. Please respond to review comments and push updates as needed — don't open a new PR for the same fix.

---

## Reporting Bugs

Found a bug? Please [open an issue](https://github.com/theAnshul01/github-gfi/issues/new) and include:

- A clear title and description of the problem
- Steps to reproduce it
- What you expected to happen vs. what actually happened
- Your browser, OS, and screen size (especially for UI bugs)
- A screenshot or screen recording if possible

---

## Suggesting Enhancements

Have an idea? [Open an issue](https://github.com/theAnshul01/github-gfi/issues/new) and describe:

- The problem your idea solves, or the value it adds
- Your proposed solution
- Any alternatives you considered

Feature discussions are welcome before you start coding — it helps avoid duplicated effort and ensures the idea fits the project's direction.

---

## Questions?

If you're stuck or unsure about anything, open an issue with the `question` label. We're happy to help!

Happy contributing 🚀
