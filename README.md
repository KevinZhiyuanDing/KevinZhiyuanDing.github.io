## KevinZhiyuanDing.github.io

This repository contains the source code for Kevin Ding’s personal portfolio website, built as a clean and professional single-page site suitable for a software engineer.

### Preview locally

Because the site loads `data.json` with `fetch`, opening `index.html` directly (`file://`) will not work in most browsers. Serve the folder over HTTP instead.

From the repository root:

```bash
# Python 3
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

Alternatives:

```bash
# Node.js (if you have npx)
npx serve .

# VS Code / Cursor
# Right-click index.html → "Open with Live Server" (Live Server extension)
```

### Structure

- **`index.html`**: Semantic layout for the portfolio (header, navigation, about, experience, projects, skills, contact).
- **`styles.css`**: Centralized typography, spacing, and component styles (cards, grids, responsive behavior).
- **`data.json`**: Single source of truth for profile, experience, projects, and skills data.
- **`script.js`**: Small, focused render functions that fetch `data.json` and populate the DOM.

### Design & Code Principles

- **Separation of concerns**: Content (HTML), presentation (CSS), and data/behavior (JS) are clearly separated.
- **Data-driven rendering**: All profile, experience, project, and skill information lives in `data.json` and is rendered via pure functions for easier maintenance.
- **Semantic HTML**: Uses elements like `<header>`, `<main>`, `<section>`, and `<article>` for better accessibility and SEO.
- **Responsive design**: Layout scales cleanly from mobile to desktop using flexbox and CSS grid, without relying on heavy frameworks.
