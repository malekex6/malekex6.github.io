# /typewriter-hero

Add a typewriter role-cycling animation to the hero section's `hero-role-badge`.
The badge currently shows "Data & AI Engineer" as static text. This skill replaces it
with a smooth typewriter effect that cycles through multiple roles.

## Roles to cycle (in order)

1. Data & AI Engineer
2. ML Engineer
3. GCP Architect
4. NLP Specialist

## Implementation steps

### Step 1 — Update the HTML (`index.html`)

Find the static badge:
```html
<div class="hero-role-badge">Data & AI Engineer</div>
```

Replace it with a wrapper that holds a `<span>` the JS will write into, plus a blinking cursor:
```html
<div class="hero-role-badge">
  <span id="hero-typewriter"></span><span class="tw-cursor" aria-hidden="true">|</span>
</div>
```

### Step 2 — Add CSS to the `<style>` block in `<head>` (after existing rules)

Add these rules at the end of the existing `<style>` block, before the closing `</style>`:
```css
/* Typewriter cursor blink */
.tw-cursor {
  display: inline-block;
  color: #0b55c6;
  font-weight: 300;
  animation: tw-blink 0.75s step-end infinite;
  margin-left: 1px;
}
@keyframes tw-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

### Step 3 — Add the typewriter JS at the bottom of `index.html`

Locate the existing inline `<script>` block near the bottom of `<body>` (the one that handles smooth-scroll and resume-switcher toggling). Add the typewriter logic **before** the closing `</script>` tag of that block:

```js
// Typewriter role animation
(function() {
  var roles = ['Data & AI Engineer', 'ML Engineer', 'GCP Architect', 'NLP Specialist'];
  var el = document.getElementById('hero-typewriter');
  if (!el) return;
  var roleIdx = 0, charIdx = 0, erasing = false, pauseTicks = 0;

  function tick() {
    var role = roles[roleIdx];
    if (!erasing) {
      charIdx++;
      el.textContent = role.slice(0, charIdx);
      if (charIdx === role.length) {
        if (pauseTicks < 18) { pauseTicks++; setTimeout(tick, 100); return; }
        pauseTicks = 0; erasing = true;
      }
      setTimeout(tick, 80);
    } else {
      charIdx--;
      el.textContent = role.slice(0, charIdx);
      if (charIdx === 0) {
        erasing = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 350);
        return;
      }
      setTimeout(tick, 45);
    }
  }

  // Start after AOS fade-in delay (hero-stack is delayed 100ms + duration 500ms)
  setTimeout(tick, 700);
})();
```

## Verification checklist

After making the changes, open `index.html` in a browser and confirm:
- [ ] The badge starts empty and types out "Data & AI Engineer" character by character
- [ ] A blue blinking `|` cursor is visible to the right of the text
- [ ] After a pause, the text erases backwards
- [ ] The next role ("ML Engineer") is typed in
- [ ] All four roles cycle seamlessly and loop back to the first
- [ ] The animation does not interfere with the AOS fade-in (the badge still fades in correctly)
- [ ] On mobile the badge wraps gracefully (the cursor stays inline)
- [ ] `prefers-reduced-motion` — optionally, wrap the `setTimeout(tick, 700)` call:
  ```js
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(tick, 700);
  else el.textContent = roles[0];
  ```

## Notes

- No extra dependencies — pure vanilla JS + CSS.
- The `erasing` speed (45 ms/char) is faster than typing (80 ms/char) for a natural feel.
- The 18-tick pause (≈1.8 s) gives visitors time to read the full role before it erases.
- `charIdx` never goes below 0 or above `role.length`, so no out-of-bounds risk.
- If the badge ever shows the wrong initial text after a hard refresh, it's because the JS
  hasn't run yet — the `setTimeout(tick, 700)` delay handles this gracefully.
