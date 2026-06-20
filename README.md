# Malek BEN YOUSSEF — Personal Portfolio

**Data & AI Engineer** · Live at [mbenyoussef.tech](https://mbenyoussef.tech)

---

## What this is

A single-page personal portfolio built to present my background, experience, and technical skills to recruiters and collaborators. The goal was to go beyond a résumé, showing how I think and what I've built, not just listing titles.

Sections: Home · About · Services · Skills · Experience (timeline) · Contact

---

## Tech stack

| Layer | What I used |
|---|---|
| Structure | Plain HTML5 (`index.html`, ~1040 lines) |
| Styling | Bootstrap 5 · Font Awesome · Bootstrap Icons · AOS (scroll animations) · custom CSS |
| Interactivity | Vanilla JS (IIFE in `scripts/main.js`) — no frameworks |
| Contact form | [Formspree](https://formspree.io) — async POST, no backend needed |
| Hosting | GitHub Pages (auto-deploys on push to `main`) |

All third-party assets are **vendored locally** — the site works offline with no CDN dependency.

---

## Project structure

```
malekex6.github.io/
├── index.html          # All content (single-page)
├── css/
│   ├── main.css        # Global styles, contact form, carousel, testimonials
│   ├── timeline.css    # Experience section only
│   ├── components.css  # Section-specific overrides (certs, hero badges, switcher)
│   └── ...             # Vendored: Bootstrap, Font Awesome, AOS, Bootstrap Icons
├── scripts/
│   ├── main.js         # AOS init, navbar, timeline in-view, contact form, lightbox
│   └── ...             # Vendored: Bootstrap Bundle, Masonry, BigPicture, PureCounter
├── images/             # Profile photo, skill logos, client logos
└── resume/             # PDF résumés (FR/EN switcher in hero)
```

---

## How to run it locally

No build step, no package manager.

**Option 1 — VS Code Live Server** (recommended):
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Open the folder in VS Code, right-click `index.html` → *Open with Live Server*

**Option 2 — direct file open**:
Just open `index.html` in any browser. Most features work; Formspree contact submission requires a network connection.

---

## How it deploys

Push to `main` → GitHub Pages serves the site automatically at [mbenyoussef.tech](https://mbenyoussef.tech). No CI pipeline needed; deployment is instant.

---

## Honest limitations

- No JavaScript framework — intentional for a static site, but means no component reuse
- Single HTML file means content and markup are coupled
- Contact form relies on a third-party service (Formspree); no self-hosted fallback
- No automated tests (valid for a static portfolio with no logic to unit-test)

---

## AI assistance

Parts of the CSS layout and JavaScript scroll behaviour were drafted with AI assistance (Claude Code). All suggestions were reviewed, tested in-browser, and adapted to fit the actual design intent. The content, structure decisions, and visual direction are entirely my own.

---

## License

MIT — see [LICENSE](LICENSE)
