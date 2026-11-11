// Brick Entity
class Brick {
  constructor(x, y, type = "NORMAL") {
    this.x = x;
    this.y = y;
    this.width = CONFIG.BRICK_WIDTH;
    this.height = CONFIG.BRICK_HEIGHT;

    const brickType = CONFIG.BRICK_TYPES[type];
    this.maxHits = brickType.hits;
    this.hits = brickType.hits;
    this.score = brickType.score;
    this.color = brickType.color;
    this.powerUpChance = brickType.powerUpChance || 0.2;
    this.type = type;

    this.destroyed = false;
  }

  hit() {
    this.hits--;
    if (this.hits <= 0) {
      this.destroyed = true;

      // Check if power-up should spawn
      if (Math.random() < this.powerUpChance) {
        return this.getRandomPowerUp();
      }
    }
    return null;
  }

  getRandomPowerUp() {
    const types = Object.keys(CONFIG.POWERUP_TYPES);
    const randomType = types[Utils.randomInt(0, types.length - 1)];
    return randomType;
  }

  render(ctx) {
    if (this.destroyed) return;

    // Brick shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(this.x + 2, this.y + 2, this.width, this.height);

    // Brick background
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Damage indicator (darker if hit)
    if (this.hits < this.maxHits) {
      const alpha = 0.3 * (1 - this.hits / this.maxHits);
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Brick border
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Highlight
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height / 3);

    // Hit counter for strong bricks
    if (this.maxHits > 1) {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        this.hits,
        this.x + this.width / 2,
        this.y + this.height / 2,
      );
    }
  }

  isDestroyed() {
    return this.destroyed;
  }
}
