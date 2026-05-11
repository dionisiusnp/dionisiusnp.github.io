Build a modern interactive landing page for an IT community using ONLY static technologies (HTML, TailwindCSS via CDN, and Vanilla JavaScript or Alpine.js). The site must be deployable on GitHub Pages.

## Core Requirements

### 1. Landing Page Structure (Single Page)

Sections:

* Hero (headline, subheadline, CTA)
* About + Value (3 cards)
* Activity + Project + Cheat Sheet Preview
* CTA + Footer

Design:

* Dark mode
* Minimalist
* Smooth scrolling
* Subtle animations (fade, glow, hover)

---

### 2. AI Orchestration Node System (CENTERPIECE)

Create an interactive node-based visualization using SVG or HTML Canvas.

#### Nodes:

* Center node: "ALIRIA"
* Surrounding nodes:

  * Mentor
  * Project
  * Marketing
  * Partner

#### Behavior:

* Nodes connected with animated glowing lines
* Idle animation (floating / pulsing)
* Click "ALIRIA":
  → activate all connections
* Click one node:
  → highlight selected node
  → fade others
  → animate connection path

#### On Node Click:

Open a SIDE PANEL (or modal) that shows contextual cheat sheet content based on the selected node.

Mapping:

* Mentor → learning cheat sheet
* Project → development cheat sheet
* Marketing → content/tools cheat sheet
* Partner → collaboration/workflow cheat sheet

---

### 3. Cheat Sheet System (Static JSON Based)

Create a separate page: `/cheatsheet.html`

Use a local JSON file:
`/data/cheatsheet.json`

Structure example:
[
{
"category": "Laravel",
"type": "project",
"command": "php artisan migrate",
"description": "Run database migrations"
}
]

Features:

* Search input (real-time filtering)
* Filter by category
* Filter by type (mentor/project/marketing/partner)
* Copy-to-clipboard button
* Highlight common commands

---

### 4. Cheat Sheet Preview (Landing Page)

Inside Activity section:

* Show 3–5 sample commands
* Add button:
  "Open Full Cheat Sheet →"

---

### 5. UI/UX Style

* Futuristic AI system feel
* Soft glow effects
* Glassmorphism panels
* Smooth transitions
* Node connections feel like "data flow"

---

### 6. File Structure

* index.html
* cheatsheet.html
* /data/cheatsheet.json
* /js/orchestration.js
* /js/cheatsheet.js
* /styles (optional if needed)

---

### 7. Output Expectation

Generate:

* Complete HTML pages
* Tailwind-based UI
* Working node interaction system
* JSON-based cheat sheet filtering system
* Clean and readable JavaScript

---

Goal:
Create an interactive community website where users can explore the ecosystem through an AI-like node orchestration system and access useful developer cheat sheets.
