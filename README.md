# Social Battery

A minimal PWA that controls an NFC badge’s **social battery** color (green / yellow / red) from your phone. No accounts, no dashboards—just tap, pick a color, and sync.

---

## Summary

**Social Battery** is a mobile-first web app for a physical NFC “social battery” badge:

- **Splash** → **Tap badge** (NFC or simulated tap) → **Main screen**: pick **Green** (Open), **Yellow** (Selective), or **Red** (Do Not Disturb) with three buttons, then “Tap badge to update” to write the color to the badge via Web NFC (Chrome Android) or see a confirmation when unsupported.
- **Stack:** Vite, React 18, TypeScript, Tailwind, shadcn/ui (Radix), Framer Motion. Installable PWA with light/dark theme.

---

## Run locally

```bash
npm i
npm run dev
```

---

## GitHub (SSH)

**Remote (already added):** `git@github.com:saadixsd/social-battery.git`

1. **Create the repo on GitHub** (if it doesn’t exist): [github.com/new](https://github.com/new) → name: `social-battery` → set to **Private** → Create (don’t add README/license).
2. **SSH access:** Ensure your SSH key is added in GitHub → **Settings** → **SSH and GPG keys**. First time: `ssh-keyscan github.com >> ~/.ssh/known_hosts`.
3. **Push:**
   ```bash
   git push -u origin main
   ```

**Clone (fresh machine):**
```bash
git clone git@github.com:saadixsd/social-battery.git
cd social-battery
npm i && npm run dev
```

---

## Scripts

| Command     | Description                |
|------------|----------------------------|
| `npm run dev`   | Start dev server           |
| `npm run build` | Production build           |
| `npm run preview` | Preview production build |
| `npm run lint`  | Run ESLint                 |
| `npm run test`  | Run Vitest                 |
