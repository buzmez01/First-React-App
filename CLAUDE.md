# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React learning project containing multiple mini-apps built progressively to teach React concepts. The user is a .NET/WinForms developer learning React — use WinForms analogies when explaining concepts.

## Commands

- `npm run dev` — Start Vite dev server (default: http://localhost:5173)
- `npm run build` — Production build to `dist/`
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## Architecture

- **Vite + React 19** (JavaScript, not TypeScript — intentional for learning)
- Entry: `index.html` → `src/main.jsx` → `src/App.jsx`
- `src/App.jsx` — Main hub with navigation between projects
- `src/projects/` — Each learning project in its own folder with `.jsx` + `.css`
  - `TodoApp/` — State, events, list rendering
  - `WeatherApp/` — useEffect, fetch API (Open-Meteo, no API key needed)
- `src/index.css` — Global styles and navigation
- Each project component is self-contained with its own CSS

## Conventions

- Language: Turkish for UI text, comments, and user-facing strings
- CSS: Plain CSS per-component (no CSS modules, no Tailwind)
- State: useState only (no external state management)
- API: Open-Meteo for weather data (free, no key required)
