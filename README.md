# 🎮 Block Breaker Remix

A modern take on the classic brick breaker game, built as practice for IT Game Jam 2026.

## 🎯 Game Features

- **Classic Gameplay**: Break bricks with a ball and paddle
- **Multiple Brick Types**: Normal, Strong, Mega, and Bonus bricks
- **Power-ups System**: Multi-ball, expanded paddle, and slow-motion
- **Combo System**: Chain hits for score multipliers
- **Progressive Difficulty**: Levels get harder as you advance
- **Particle Effects**: Satisfying visual feedback
- **High Score**: Track your best performance
- **Responsive Controls**: Mouse, touch, and keyboard support

## 🎮 Controls

- **Mouse/Touch**: Move paddle
- **Click/Space**: Launch ball
- **ESC**: Pause/Resume game

## 🏗️ Tech Stack

- Pure JavaScript (ES6+)
- HTML5 Canvas API
- No external dependencies

## 📁 Project Structure

```
game-jam-practice/
├── index.html          # Entry point
├── README.md           # This file
├── src/
│   ├── main.js        # Game initialization
│   ├── config.js      # Game configuration
│   ├── core/          # Core game systems
│   ├── entities/      # Game entities (Ball, Paddle, Brick, PowerUp)
│   ├── systems/       # Game systems (Physics, Particles, Score)
│   ├── scenes/        # Game scenes (Menu, Game, GameOver)
│   └── utils/         # Utility functions
└── styles/
    └── main.css       # Styling
```

## 🚀 How to Run

1. Open `index.html` in a modern web browser
2. Or use a local server:

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (if you have http-server)
   npx http-server
   ```

3. Navigate to `http://localhost:8000`

## 🎨 Game Design Highlights

### Brick Types

- **Normal** (Red): 1 hit, 10 points
- **Strong** (Orange): 2 hits, 25 points
- **Mega** (Yellow): 3 hits, 50 points
- **Bonus** (Green): 1 hit, 100 points + high power-up chance

### Power-ups

- **×2**: Multi-ball - Doubles your active balls
- **▬**: Expand Paddle - Increases paddle size temporarily
- **⌚**: Slow Ball - Reduces ball speed temporarily

### Scoring

- Base score from breaking bricks
- Combo multiplier (increases with consecutive hits)
- Combo resets after 2 seconds of no hits

## 🎯 Development Philosophy

This game was built following these principles:

- **Simple but complete**: Focus on core mechanics done well
- **Fast iteration**: Get to playable quickly
- **Visual polish**: Simple effects that feel satisfying
- **Clean code**: Easy to understand and extend

## 📝 Future Enhancements (Optional)

- [ ] Sound effects and music
- [ ] More power-up types
- [ ] Boss levels with special patterns
- [ ] Mobile-optimized UI
- [ ] Leaderboard integration
- [ ] Level editor

## 👨‍💻 Development Notes

**Development Time**: ~6 hours target
**Purpose**: Practice for IT Game Jam 2026 with AI assistance
**AI Assistant**: Claude Sonnet 4.5 via Kiro IDE

---

Made with ❤️ for IT Game Jam 2026 Practice
