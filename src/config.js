// Game Configuration
const CONFIG = {
  // Canvas
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,

  // Paddle
  PADDLE_WIDTH: 100,
  PADDLE_HEIGHT: 15,
  PADDLE_SPEED: 8,
  PADDLE_COLOR: "#4ecdc4",

  // Ball
  BALL_RADIUS: 8,
  BALL_SPEED: 5,
  BALL_MAX_SPEED: 12,
  BALL_COLOR: "#ffffff",

  // Bricks
  BRICK_ROWS: 6,
  BRICK_COLS: 10,
  BRICK_WIDTH: 70,
  BRICK_HEIGHT: 25,
  BRICK_PADDING: 5,
  BRICK_OFFSET_TOP: 80,
  BRICK_OFFSET_LEFT: 35,

  // Brick Types
  BRICK_TYPES: {
    NORMAL: { hits: 1, score: 10, color: "#ff6b6b" },
    STRONG: { hits: 2, score: 25, color: "#ffa07a" },
    MEGA: { hits: 3, score: 50, color: "#ffff00" },
    BONUS: { hits: 1, score: 100, color: "#00ff00", powerUpChance: 0.7 },
  },

  // Game Rules
  INITIAL_LIVES: 3,
  COMBO_TIMEOUT: 2000, // ms
  COMBO_MULTIPLIER: 1.5,

  // Power-ups
  POWERUP_SIZE: 20,
  POWERUP_SPEED: 2,
  POWERUP_TYPES: {
    MULTI_BALL: { color: "#ff00ff", duration: 0 },
    EXPAND_PADDLE: { color: "#00ffff", duration: 10000 },
    SLOW_BALL: { color: "#ffff00", duration: 8000 },
  },

  // Particles
  PARTICLE_COUNT: 15,
  PARTICLE_LIFETIME: 30,

  // Colors
  COLORS: {
    BACKGROUND: "#1a1a2e",
    TEXT: "#ffffff",
    TEXT_SHADOW: "rgba(0, 0, 0, 0.5)",
  },
};
