# Dark Mode Extension

A minimal Chrome extension that toggles dark mode on any webpage with a single click. Uses CSS `invert` + `hue-rotate` filters — no external dependencies, no permissions beyond the active tab.

<p align="center">
  <img src="docs/demo.svg" alt="Demo showing the extension toggling dark mode" width="480"/>
</p>

## Features

- **One-click activation** — dark mode enables automatically when you open the extension
- **Intensity slider** — fine-tune the effect from 0–100% in real time
- **Adaptive icon** — toolbar lightbulb switches between lit and dark to reflect current state
- Works on any webpage

## Load Locally

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked** and select this folder

The extension icon will appear in the Chrome toolbar.

## Usage

- **Click the icon** — dark mode enables on the current tab automatically
- **Intensity slider** — drag to adjust strength while dark mode is active
- **Click "Dark Mode: ON"** — turns dark mode off

> The extension requires `activeTab` and `scripting` permissions, granted automatically when loaded unpacked. It will not work on `chrome://` pages or the Chrome Web Store.

## Testing

Tests cover the CSS injection functions (`toggleDarkMode` and `setDarkModeIntensity`) using [Jest](https://jestjs.io/) with a jsdom environment — no browser required.

**Install dependencies:**

```bash
npm install
```

**Run tests:**

```bash
npm test
```
