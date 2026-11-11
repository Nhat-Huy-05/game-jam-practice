// Power-Up Entity
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.size = CONFIG.POWERUP_SIZE;
    this.type = type;
    this.speed = CONFIG.POWERUP_SPEED;

    const powerUpType = CONFIG.POWERUP_TYPES[type];
    this.color = powerUpType.color;
    this.duration = powerUpType.duration;

    this.active = true;
  }

  update() {
    this.y += this.speed;
  }

  render(ctx) {
    if (!this.active) return;

    // Power-up glow
    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;

    // Power-up box
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // Border
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.size, this.size);

    ctx.restore();

    // Icon/Symbol based on type
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let symbol = "?";
    if (this.type === "MULTI_BALL") symbol = "×2";
    else if (this.type === "EXPAND_PADDLE") symbol = "▬";
    else if (this.type === "SLOW_BALL") symbol = "⌚";

    ctx.fillText(symbol, this.x + this.size / 2, this.y + this.size / 2);
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }

  deactivate() {
    this.active = false;
  }
}
