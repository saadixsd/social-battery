# Social Battery

A minimal PWA that controls an NFC badge’s **social battery** color (green / yellow / red) from your phone. No accounts, no dashboards—just tap, pick a color, and sync.

**→ Judge / demo flow:** [docs/PARALLAX_JUDGE_DEMO.md](docs/PARALLAX_JUDGE_DEMO.md) — step-by-step product narrative, live demo script, and judge-safe technical summary.

---

## Summary

**Social Battery** is a mobile-first web app for a physical NFC “social battery” badge:

- **Splash** → **Tap badge** (NFC or simulated tap) → **Main screen**: pick **Green** (Open), **Yellow** (Selective), or **Red** (Do Not Disturb) with three buttons, then “Tap badge to update” to write the color to the badge via Web NFC (Chrome Android) or see a confirmation when unsupported.
- **Stack:** Vite, React 18, TypeScript, Tailwind, shadcn/ui (Radix), Framer Motion. Installable PWA with light/dark theme.

---

## Connecting the NFC chip (real hardware)

The app uses the **Web NFC API** to read and write NFC tags. Here’s how to use it with a real NFC badge/tag.

### What you need

1. **Android phone** (NFC is not available in iOS Safari).
2. **Chrome for Android** — open the app in Chrome (Web NFC only works there).
3. **NFC tag / badge** — any **NDEF**-compatible tag, e.g.:
   - NTAG213, NTAG215, NTAG216 (NXP)
   - Or generic “NFC stickers” / “NFC cards” that support NDEF

### Enable NFC

- **Android:** Settings → Connected devices → Connection preferences → **NFC** → turn **On**.
- Make sure **Chrome** has permission to use NFC if your OS asks.

### Use over HTTPS

- Web NFC only runs in **secure contexts**: **HTTPS** or **localhost**.
- For real devices: deploy the app (e.g. Vercel) and open the **https://** URL in Chrome on your Android phone.
- Don’t use `http://` from another device; it will not work.

### How the app uses the chip

1. **Connect (read)**  
   On the “Tap your badge” screen the app starts an NFC scan.  
   **Hold the back of your Android phone against the NFC tag.**  
   When the tag is read, the app moves to the main (product) screen.

2. **Update color (write)**  
   On the main screen, pick green / yellow / red, then tap **“Tap badge to update”**.  
   When the browser asks, **hold the phone to the tag again.**  
   The app writes a text NDEF record with the color (`"green"`, `"yellow"`, or `"red"`) to the tag.

### If you don’t have NFC (e.g. iPhone or desktop)

- On the “Tap your badge” screen, tap the **NFC icon** to use **simulate tap** and continue to the product screen.
- Writing color is not possible without Web NFC; the app still shows “Badge updated” for flow.

### Optional: custom badge hardware

- If your badge has its own **MCU + NFC chip** and an LED/display:
  - The **phone** writes the color to the tag (as above).
  - The **badge firmware** should read the NDEF text record from the tag (e.g. on boot or when the tag is presented) and set the LED to green / yellow / red based on the string.

---

## Run locally

```bash
npm i
npm run dev
```

---

## Deploy (public link for any device)

To get a **public URL** you can open on your phone, tablet, or any device:

1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
2. Click **Add New…** → **Project**.
3. Import **saadixsd/social-battery** from your GitHub repos.
4. Click **Deploy** (leave all defaults).
5. When it finishes, you’ll get a URL like **`https://social-battery-xxx.vercel.app`** — use that link on any device.

Vercel’s free tier is enough. Every push to `main` will auto-deploy a new version.

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

## Deploy to App Store (iOS)

The app is set up with **Capacitor** so you can build a native iOS app and submit it to the App Store.

**Requirements:** Mac with **Xcode** and an **Apple Developer** account ($99/year).

**First-time setup:**

```bash
npm i
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```

**Or use the shortcut:**

```bash
npm run ios
```

(This runs `build`, `cap sync ios`, and opens the project in Xcode.)

**In Xcode:**

1. Select your **Team** (Signing & Capabilities).
2. Set **Bundle Identifier** (e.g. `com.yourcompany.socialbattery`) if you changed `appId` in `capacitor.config.ts`.
3. Connect a device or choose a simulator and run (▶).
4. To submit to the App Store: **Product → Archive**, then **Distribute App → App Store Connect**.

**After code changes:**

```bash
npm run build
npx cap sync ios
```

Then run or archive again from Xcode.

**Config:** `capacitor.config.ts` — change `appId` to your own (e.g. `com.yourcompany.socialbattery`) before submitting.

---

## Scripts

| Command     | Description                |
|------------|----------------------------|
| `npm run dev`   | Start dev server           |
| `npm run build` | Production build           |
| `npm run preview` | Preview production build |
| `npm run lint`  | Run ESLint                 |
| `npm run test`  | Run Vitest                 |
| `npm run cap:sync` | Sync web build to native (iOS/Android) |
| `npm run cap:ios` | Open iOS project in Xcode |
| `npm run ios` | Build, sync, and open Xcode |
