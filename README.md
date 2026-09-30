# ⚡ CodLingo

> **Learn to code ** — Streaks, flashcards, quizzes, and game drills for 10 programming languages.

![CodLingo Banner](https://img.shields.io/badge/CodLingo-Learn%20to%20Code-%2358CC02?style=for-the-badge&logo=lightning&logoColor=white)
![React](https://img.shields.io/badge/React-19-%2361DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-%23646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-%23FFD700?style=for-the-badge)

---

## 🎯 What is CodLingo?

CodLingo is a **gamified coding education app** . Learn programming through interactive flashcards, 4-option quizzes, and game drills — with daily streaks, XP, gems, and a leaderboard system to keep you motivated every single day.

---

## ✨ Features

### 🧠 Learn
| Feature | Description |
|---|---|
| 📚 **10 Learning Tracks** | C, Python, C++, Java, SQL, NoSQL, HTML, CSS, DSA, Aptitude |
| 🃏 **3D Flip Flashcards** | Space to flip, arrow keys to navigate, mnemonic hints |
| 🔢 **4-Option Quiz Mode** | Multiple choice inside every flashcard |
| 🎮 **Game Drills** | Predict Output, Spot the Bug, Fill the Blank, Code Scramble |
| 📊 **2,500+ Questions** | 250+ questions per section, procedurally generated |

### 🔥 Streaks & Gamification
| Feature | Description |
|---|---|
| 🔥 **Daily Streaks** | Log in every day to keep your streak alive |
| 🛡️ **Streak Freezes** | Buy from the shop to protect your streak |
| 💎 **Gems Currency** | Earn gems by completing lessons and daily goals |
| ❤️ **Hearts System** | Lose hearts on wrong answers, refill from shop |
| 🏆 **XP & Daily Goals** | Track daily XP progress towards your goal |

### 👤 Accounts
| Feature | Description |
|---|---|
| 🎭 **8 Coding Mascots** | Clingy Crab, Python Viper, Code Ninja, Robo Coder... |
| 👥 **Multi-Profile** | Create and switch between local profiles |
| 💾 **Progress Saved** | All streaks, XP, and card progress persist in localStorage |

### 🛒 Shop & Extras
| Feature | Description |
|---|---|
| 🏪 **Duolingo Shop** | Buy streak freezes (200💎) and heart refills (100💎) |
| 🗺️ **Winding Course Path** | Serpentine roadmap with animated pulsing level nodes |
| 🦀 **Animated Mascot** | SVG Crab mascot with happy, cheering, sad, flame moods |
| 🔊 **Sound Effects** | Web Audio API synthesizer (offline, no files needed) |

---

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Animations**: CSS keyframes + canvas-confetti
- **Audio**: Web Audio API (fully offline synthesizer)
- **Storage**: localStorage (browser-based persistence)

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/sakshipadiyar06-debug/codlingo.git
cd codlingo

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📚 Learning Tracks

| Track | Emoji | Topics Covered | Questions |
|-------|-------|----------------|-----------|
| C | 🦀 | Pointers, Memory, Arrays, Strings, Operators | 250+ |
| Python | 🐍 | Lists, Dicts, Comprehensions, OOP, Decorators | 250+ |
| C++ | ⚡ | STL, Templates, OOP, Memory Management | 250+ |
| Java | ☕ | JVM, Collections, Threads, Spring basics | 250+ |
| SQL | 🗄️ | Joins, Aggregates, Subqueries, Indexing | 250+ |
| NoSQL | 🍃 | MongoDB, Redis, Cassandra, Document Models | 250+ |
| HTML5 | 🌐 | Semantics, Forms, Accessibility, Canvas | 250+ |
| CSS3 | 🎨 | Flexbox, Grid, Animations, Variables | 250+ |
| DSA | 🧮 | Arrays, Linked Lists, Trees, DP, Graphs | 250+ |
| Aptitude | 🧠 | Work-Rate, Speed-Distance, Probability, Logic | 250+ |

---

## 🎮 Game Drill Types

1. **Predict Output** — What does this code print?
2. **Spot the Bug** — Find the error in the snippet
3. **Fill the Blank** — Complete the missing code
4. **Code Scramble** — Arrange the shuffled lines in correct order

---

## 📁 Project Structure

```
codlingo/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx         # User accounts & profile switching
│   │   ├── CoursePath.jsx        # Winding course roadmap
│   │   ├── DailyLoginModal.jsx   # Streak calendar & daily bonus
│   │   ├── DevTimeTraveler.jsx   # Dev testing tools
│   │   ├── FlashcardViewer.jsx   # 3D flashcard + quiz mode
│   │   ├── GameDrillModal.jsx    # 4-type game drill session
│   │   ├── Header.jsx            # Sticky header with stats
│   │   ├── LanguageSelectorModal.jsx
│   │   ├── Mascot.jsx            # Animated SVG crab mascot
│   │   └── ShopModal.jsx         # Gems shop
│   ├── data/
│   │   ├── aptitudeCurriculum.js # Aptitude questions
│   │   ├── dsaCurriculum.js      # DSA questions
│   │   ├── languagesData.js      # Language metadata
│   │   └── massiveDataset.js     # 2,500+ question generator
│   ├── utils/
│   │   ├── audio.js              # Web Audio synthesizer
│   │   ├── authManager.js        # Multi-profile auth
│   │   └── streakManager.js      # Daily streak logic
│   ├── App.jsx                   # Main app orchestrator
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more questions to any track
- Add new game drill types
- Improve UI/UX
- Add new programming language tracks

```bash
# Fork the repo, then:
git checkout -b feature/my-feature
git commit -m "Add my feature"
git push origin feature/my-feature
# Open a Pull Request!
```

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙌 Made with ❤️ by

**Sakshi Padiyar** — [@sakshipadiyar06-debug](https://github.com/sakshipadiyar06-debug)

> *"The best way to learn programming is to code every single day."*

---

<div align="center">
  <strong>⚡ CodLingo — Code a little every day. Master it over time. ⚡</strong>
</div>
