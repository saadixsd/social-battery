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

## GitHub

**Repo (public):** [github.com/saadixsd/social-battery](https://github.com/saadixsd/social-battery)

**Push (run each line separately):**

If you use **SSH** and already have a key added in GitHub → Settings → SSH and GPG keys:
```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
git push -u origin main
```

If you get **Permission denied (publickey)**, use **HTTPS** instead:
```bash
git remote set-url origin https://github.com/saadixsd/social-battery.git
git push -u origin main
```
(GitHub will ask for your username and a personal access token instead of your password.)

**Clone:**
```bash
git clone https://github.com/saadixsd/social-battery.git
cd social-battery
npm i
npm run dev
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
