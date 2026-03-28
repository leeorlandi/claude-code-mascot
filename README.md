# claude-code-mascot

A pixel-art Web Component. Drop it in. It floats, blinks, and waves.
No framework. No build step. One tag.

```html
<script src="dist/claude-mascot.js"></script>
<claude-mascot></claude-mascot>
```

---

## states

| | state | what's happening |
|---|---|---|
| <img src="assets/mascot-open.svg" width="80"> | **default** | floating. eyes open. arm waves every ~3 blinks. |
| <img src="assets/mascot-squint.svg" width="80"> | **blink** | squints `> <` for a beat. happens on a 4s cycle. |
| <img src="assets/mascot-wave.svg" width="80"> | **wave** | right arm lifts and settles. fires once, then idles. |

---

## attributes

Turn things off:

```html
<claude-mascot no-float></claude-mascot>
<claude-mascot no-blink></claude-mascot>
<claude-mascot no-wave></claude-mascot>
<claude-mascot no-animate></claude-mascot>
```

Tune timing:

```html
<claude-mascot blink-interval="8"></claude-mascot>
<claude-mascot wave-interval="20"></claude-mascot>
<claude-mascot float-duration="5"></claude-mascot>
```

Style it:

```html
<claude-mascot size="120" color="#ff6b6b"></claude-mascot>
```

All attributes are live — update them at runtime and the mascot responds immediately.

Full reference:

| attribute | default | description |
|---|---|---|
| `size` | `90` | width in px |
| `color` | `#c8614e` | body fill color |
| `no-float` | — | disables float animation |
| `no-blink` | — | disables blink cycle |
| `no-wave` | — | disables arm wave |
| `no-animate` | — | disables everything |
| `blink-interval` | `4` | blink cycle in seconds |
| `wave-interval` | `12` | wave cycle in seconds |
| `float-duration` | `3.2` | float period in seconds |
| `label` | — | aria-label for accessibility |

---

## install

**CDN — no install, just paste:**

```html
<script src="https://cdn.jsdelivr.net/gh/leeorlandi/claude-code-mascot@main/dist/claude-mascot.js"></script>
<claude-mascot></claude-mascot>
```

**Download:**
Grab `dist/claude-mascot.js` from this repo and serve it yourself.

**npm:**

```
npm install claude-code-mascot
```

```js
import 'claude-code-mascot';
```

---

## framework notes

**React** — import once anywhere in your app, use the tag in JSX:

```jsx
import 'claude-code-mascot';

export function MyComponent() {
  return <claude-mascot size="90" />;
}
```

**Vue** — tell the compiler it's a custom element:

```js
// vite.config.js
vue({
  template: {
    compilerOptions: {
      isCustomElement: tag => tag === 'claude-mascot'
    }
  }
})
```

**Vanilla HTML** — just the script tag. That's it.

---

## adding animations

New effects go in `src/animations.js` as named exports:

```js
export const BOUNCE = {
  name: 'mascot-bounce',
  keyframes: `
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-20px); }
  `,
  defaultDuration: '0.4s',
  defaultTimingFn: 'cubic-bezier(.36,.07,.19,.97)',
  defaultIterationCount: '3',
};
```

Then: add the export, add an attribute to `observedAttributes` in `mascot.js`, add one branch in `_buildStyles()`. Nothing else changes.

---

## run the demo

```
open demo/index.html
```

No server needed.

---

## license

MIT — [leeorlandi](https://github.com/leeorlandi)
