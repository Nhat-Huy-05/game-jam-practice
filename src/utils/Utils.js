// Utility Functions
const Utils = {
  // Random number between min and max
  random(min, max) {
    return min + Math.random() * (max - min);
  },

  // Random integer between min and max (inclusive)
  randomInt(min, max) {
    return Math.floor(this.random(min, max + 1));
  },

  // Clamp value between min and max
  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  },

  // Linear interpolation
  lerp(start, end, t) {
    return start + (end - start) * t;
  },

  // Distance between two points
  distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },

  // Check if rectangles collide
  rectCollision(r1, r2) {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    );
  },

  // Check if circle collides with rectangle
  circleRectCollision(circle, rect) {
    const closestX = this.clamp(circle.x, rect.x, rect.x + rect.width);
    const closestY = this.clamp(circle.y, rect.y, rect.y + rect.height);

    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;

    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    return distanceSquared < circle.radius * circle.radius;
  },

  // Format score with leading zeros
  formatScore(score, digits = 6) {
    return score.toString().padStart(digits, "0");
  },

  // Save to localStorage
  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Could not save data:", e);
    }
  },

  // Load from localStorage
  loadData(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn("Could not load data:", e);
      return defaultValue;
    }
  },
};
