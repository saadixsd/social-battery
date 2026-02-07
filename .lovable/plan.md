

# Parallax — NFC Badge Companion App

A premium, ultra-minimal mobile web app that lets users control their physical Parallax badge's social battery color through an elegant, clutter-free interface.

---

## Screen 1: Splash / Welcome
- App opens to a brief, elegant animated Parallax logo
- Fades into the NFC connection screen automatically
- Sets the tone: luxury, calm, premium

## Screen 2: NFC Connection
- Centered minimal text: **"Tap your Parallax badge"**
- Subtle pulsing ring animation inviting the user to hold their phone near the badge
- Uses real Web NFC API on supported devices (Chrome Android), with a graceful simulated tap experience on unsupported browsers (like iOS Safari)
- On successful tap/connection → smooth transition to the main control screen

## Screen 3: Main Control — The Core Experience
- **Large central badge rendering** — a digital replica of the physical badge that glows in the active color (green, yellow, or red) with soft ambient light effects
- **Smooth gradient slider** at the bottom — swipe seamlessly between green → yellow → red
- The badge visual updates in real-time as the slider moves, with fluid color transitions
- Minimal label beneath the badge showing the current state: "Open" / "Selective" / "Do Not Disturb"
- A subtle "Tap badge to update" prompt when the color has been changed

## Screen 4: Update Confirmation
- When the user taps the badge to sync the new color, a satisfying micro-animation plays (ripple/pulse effect)
- Brief confirmation: "Badge updated" with a gentle checkmark
- Returns to the main control screen

---

## Design & Feel
- **Ultra-clean Apple-level minimalism** — generous whitespace, no unnecessary UI elements
- **Soft gradients and ambient glow** effects around the badge visualization
- **Dark & light mode** following the system setting, with manual toggle available
- Premium typography (system fonts for speed and native feel)
- Smooth animations throughout — fade transitions, spring physics on the slider, subtle parallax depth effects
- No navigation bars, no hamburger menus, no tabs — just flowing screens

## PWA Setup
- Installable to home screen with custom app icon and splash screen
- Offline-capable so the app loads instantly
- Full-screen mode (no browser chrome) for an immersive native app experience

## What This App Will NOT Have
- No accounts, login, or sign-up
- No chat, AI, or social features
- No analytics dashboards
- No profiles or identity management
- No settings pages beyond the theme toggle

