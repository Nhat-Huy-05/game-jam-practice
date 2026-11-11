// Ball Entity
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = CONFIG.BALL_RADIUS;
    this.velocity = new Vector2D(0, 0);
    this.speed = CONFIG.BALL_SPEED;
    this.color = CONFIG.BALL_COLOR;
    this.active = false;
  }

  launch(angle = -Math.PI / 4) {
    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;
    this.active = true;
  }

  update() {
    if (this.active) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      // Limit max speed
      this.velocity.limit(CONFIG.BALL_MAX_SPEED);
    }
  }

  render(ctx) {
    // Ball shadow
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.arc(this.x + 2, this.y + 2, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Ball
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Ball highlight
    const gradient = ctx.createRadialGradient(
      this.x - this.radius / 3,
      this.y - this.radius / 3,
      0,
      this.x,
      this.y,
      this.radius,
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.active = false;
  }

  increaseSpeed(amount = 0.5) {
    this.speed += amount;
    this.velocity.setMagnitude(this.speed);
  }
}
