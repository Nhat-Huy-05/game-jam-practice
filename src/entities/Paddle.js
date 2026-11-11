// Paddle Entity
class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = CONFIG.PADDLE_WIDTH;
    this.height = CONFIG.PADDLE_HEIGHT;
    this.speed = CONFIG.PADDLE_SPEED;
    this.color = CONFIG.PADDLE_COLOR;
    this.targetX = x;
    this.normalWidth = CONFIG.PADDLE_WIDTH;
  }

  moveTo(x) {
    this.targetX = x - this.width / 2;
  }

  update(canvasWidth) {
    // Smooth movement
    const dx = this.targetX - this.x;
    this.x += dx * 0.2;

    // Keep paddle on screen
    this.x = Utils.clamp(this.x, 0, canvasWidth - this.width);
  }

  render(ctx) {
    // Paddle shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(this.x + 2, this.y + 2, this.width, this.height);

    // Paddle
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x,
      this.y + this.height,
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, this.darkenColor(this.color, 0.3));
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Paddle highlight
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(this.x, this.y, this.width, this.height / 3);
  }

  expand(multiplier = 1.5) {
    this.width = this.normalWidth * multiplier;
  }

  resetSize() {
    this.width = this.normalWidth;
  }

  darkenColor(color, amount) {
    // Simple color darkening
    const num = parseInt(color.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - amount * 255);
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amount * 255);
    const b = Math.max(0, (num & 0x0000ff) - amount * 255);
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  }
}
