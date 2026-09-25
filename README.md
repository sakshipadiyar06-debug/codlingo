# 🦀 CLingo — Duolingo for C Programming

A gamified, interactive Duolingo-styled web application for learning the **C Programming Language** through interactive **3D Flashcards** and **Game Drills**, complete with **Daily Logins**, **Streaks**, **Streak Freezes**, and **Hearts**.

---

## 🌟 Key Features

### 1. 🔥 Daily Login & Streak System
- **Streak Maintenance**: Tracks consecutive daily logins with visual flame indicators.
- **7-Day Rolling Calendar Strip**: Duolingo-style calendar showing completed days, today's status, and active days.
- **Daily Login Bonus**: Claim bonus Gems (+20 💎) on your first check-in every day.
- **Streak Freeze (🛡️)**: Equip freezes from the Shop to protect your streak if you miss a day.
- **Time Traveler Debug Dock**: Fast-forward to tomorrow (+1 Day) or simulate missing a day to immediately test how streaks and freezes behave.

### 2. 🎴 Flashcards "Learn Mode"
- **3D Card Flip**: Tap the card or press `Space` to smoothly flip between Question and Explanation.
- **Rich C Explanations**: Mnemonic rules, memory layouts, and syntax tips for C concepts.
- **Spaced Repetition**: Rate each card as *"Still Learning"* (Orange) or *"Mastered!"* (Green, +15 XP).

### 3. 🎮 Duolingo-Style "Game Drill Mode"
- **Predict the Output**: Determine what pointers, loops, or `printf` calls will output.
- **Spot the Bug**: Click directly on the buggy line of C code (missing `&` in `scanf`, dangling pointers, wild dereferences).
- **Fill in the Blank**: Drag or tap the missing C keywords.
- **Code Scramble / Word Bank**: Reassemble C statements into valid compiling order.
- **Duolingo Feedback Drawer**: Iconic green sheet (*"Nicely done!"*) or red sheet with correct answers, accompanied by Web Audio sound effects.

### 4. 🛒 Duolingo Shop & Economy
- **Hearts System (❤️)**: 5 lives. Wrong answers deduct hearts.
- **Gems System (💎)**: Earn gems by completing lessons and daily streaks.
- **Shop Items**: Buy **Streak Freezes** (200 💎), **Full Heart Refills** (100 💎), or cosmetic crowns.

---

## 🚀 Running the App Locally

The app is currently running live at:
```
http://127.0.0.1:5173/
```

To run it anytime manually:
```powershell
cd C:\Users\AKSHAYA\.gemini\antigravity\scratch\duolingo-c
npm.cmd run dev
```

To build for production:
```powershell
npm.cmd run build
```
