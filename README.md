# GitHub Good First Issues

A React application built with Vite and TypeScript that helps developers find beginner-friendly GitHub issues, bookmark them, and track progress. Features mobile-responsive design with language filters, authentication via Supabase, and direct GitHub API integration.

## Features

- 🔍 Search and filter GitHub good first issues by language
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔖 Bookmark issues for later (requires authentication)
- 🎨 Terminal-inspired UI with dark theme
- 🔐 Supabase authentication with GitHub OAuth

## Tech Stack

- **React** + **Vite** — frontend framework and build tool
- **TypeScript** — strict typing throughout
- **Radix UI Themes** + **Tailwind CSS** — UI components and styling
- **Supabase** — authentication and bookmark storage
- **React Router** — client-side routing
- **GitHub REST API** — direct API integration (no proxy needed)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── EmptyState.tsx
│   ├── ErrorBoundary.tsx
│   ├── ErrorMessage.tsx
│   ├── Footer.tsx
│   ├── IssueCard.tsx
│   ├── IssuePagePagination.tsx
│   ├── LanguageSelect.tsx
│   ├── Pagination.tsx
│   ├── Sidebar.tsx
│   ├── SortSelect.tsx
│   ├── SpinnerElement.tsx
│   └── TopNavbar.tsx
├── hooks/               # Custom hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useTheme.ts
├── lib/                 # Utility functions
│   └── bookmarks.ts
├── pages/               # Route pages
│   ├── Bookmarks.tsx
│   ├── Home.tsx
│   ├── IssuesPage.tsx
│   └── Login.tsx
├── services/            # API and external services
│   ├── bookmarkService.ts
│   ├── githubService.ts
│   └── SupabaseClient.ts
├── types/               # TypeScript type definitions
│   ├── bookmarks.ts
│   ├── filters.ts
│   └── github.ts
├── App.tsx              # Main application component
├── index.css            # Global CSS styles
└── main.tsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm

### Installation

1. Clone the repo
2. Install NPM packages

   ```sh
   npm install
   ```

### Running the Development Server

```sh
npm run dev
```

This will start the Vite development server at `http://localhost:5173`.

### Building for Production

```sh
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.