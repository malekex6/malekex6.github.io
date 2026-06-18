# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page personal portfolio for Malek BEN YOUSSEF (Data & AI Engineer), hosted on GitHub Pages at `malekex6.github.io`. No build system, no package manager, no server — all files are served directly.

## Development

Open `index.html` directly in a browser, or use VS Code's Live Server extension (configured in `.vscode/settings.json`). There are no build, lint, or test commands.

Deploy by pushing to the `main` branch; GitHub Pages serves automatically.

## Architecture

The site is a single `index.html` file (~1040 lines) with all content sections inline:
- **Home** (hero with role badges, resume switcher, social links)
- **About** (education, certifications grid, testimonials)
- **Services** (service cards)
- **Skills** (tech logo carousel)
- **Experience** (`#timeline` — alternating left/right cards with scroll-reveal)
- **Contact** (form submitted via Formspree)

### CSS split

| File | Scope |
|---|---|
| `css/main.css` | Global styles, contact form, testimonials, carousel, loader |
| `css/timeline.css` | Timeline section only (`.experience`, `.content`, `.role`, etc.) |
| `<style>` block in `<head>` | Section-specific overrides: certifications, hero badges, resume switcher, responsive breakpoints for those components |

When adding styles for a new component: if it's self-contained to one section, use the `<style>` block in `<head>`; for globally reused patterns, use `css/main.css`.

### JavaScript (`scripts/main.js`)

Single IIFE wrapping:
- AOS initialization (scroll animations, disabled on mobile)
- Navbar sticky behavior and scroll-to-top visibility
- Timeline in-view detection — adds/removes `.in-view` class using `callbackFunc()` and a scroll listener; CSS transitions in `timeline.css` react to that class
- Contact form — async Formspree POST with inline validation; status messages written to `#contact-status`
- Masonry grid and BigPicture lightbox (wired to `.grid` and `[data-bigpicture]` elements)

Inline `<script>` tags at the bottom of `index.html` handle:
- Custom smooth-scroll for `#about` anchor with breakpoint-aware offsets
- Resume switcher open/close toggling (`.resume-switcher.is-open`)

### Third-party assets (all vendored locally)

`scripts/`: AOS, Bootstrap Bundle, Masonry, imagesLoaded, BigPicture, PureCounter  
`css/`: Bootstrap, Bootstrap Icons, Font Awesome, AOS

### Key patterns

- **Timeline animation**: `.experience` starts `opacity: 0; transform: translateY(40px)`. JS adds `.in-view` → CSS transitions to visible. Per-card delay controlled by `--reveal-delay` CSS custom property set inline.
- **Resume switcher**: Two instances (hero section and timeline section). Both use `.resume-switcher--home` variant on the hero for sideways expansion. Shared toggle logic in inline `<script>`.
- **Contact form**: Formspree endpoint `https://formspree.io/f/xredalpv`. On error, the status message includes a mailto fallback link.
- **Skills carousel**: Pure CSS infinite scroll animation (`@keyframes scroll`) with duplicated slide items for seamless looping.
- **`container-narrow`**: Custom max-width container (`max-width: 1024px`) used for most content sections instead of Bootstrap's default.
