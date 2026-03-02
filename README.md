# GitHub Repository Explorer

This is a React application built with Vite and TypeScript that allows users to search for GitHub repositories.

## Project Structure

A brief overview of the project's structure:

```
.
├── .idx/
│   ├── dev.nix        # Environment configuration for Firebase Studio
│   └── mcp.json       # Firebase MCP configuration
├── public/
│   ├── github.png
│   └── github.svg
├── src/
│   ├── components/
│   │   ├── LanguageSelect.tsx # Component for language selection
│   │   └── Pagination.tsx     # Component for pagination
│   ├── hooks/
│   │   ├── useDebounce.ts     # Custom hook for debouncing input
│   │   └── useTheme.ts        # Custom hook for theme management
│   ├── services/
│   │   └── githubService.ts   # Service for interacting with the GitHub API
│   ├── types/
│   │   ├── filters.ts         # TypeScript types for filters
│   │   └── github.ts          # TypeScript types for GitHub API responses
│   ├── App.tsx                # Main application component
│   ├── index.css              # Global CSS styles
│   └── main.tsx               # Application entry point
├── .eslintrc.cjs            # ESLint configuration
├── index.html               # Main HTML file
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript compiler configuration
└── vite.config.ts           # Vite configuration
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v20 or later)
*   npm

### Installation

1.  Clone the repo
2.  Install NPM packages

    ```sh
    npm install
    ```

### Running the Development Server

```sh
npm run dev
```

This will start the Vite development server, and you can view the application in your browser.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Roadmap

See our [ROADMAP.md](ROADMAP.md) to see the direction of the project.
