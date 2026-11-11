// Main Menu Scene
class MenuScene extends Scene {
  constructor(game) {
    super(game);
    this.title = "BLOCK BREAKER";
    this.subtitle = "REMIX";
    this.startPrompt = "Click or Press SPACE to Start";
    this.highScore = Utils.loadData("blockBreakerHighScore", 0);
    this.pulseAlpha = 0;
    this.pulseDirection = 1;
  }

  onEnter() {
    this.highScore = Utils.loadData("blockBreakerHighScore", 0);
  }

  update(deltaTime) {
    // Animate start prompt
    this.pulseAlpha += this.pulseDirection * deltaTime * 0.002;
    if (this.pulseAlpha >= 1) {
      this.pulseAlpha = 1;
      this.pulseDirection = -1;
    } else if (this.pulseAlpha <= 0.3) {
      this.pulseAlpha = 0.3;
      this.pulseDirection = 1;
    }
  }

  render(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Background
    ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.save();
    ctx.shadowColor = "rgba(78, 205, 196, 0.5)";
    ctx.shadowBlur = 20;

    ctx.fillStyle = "#4ecdc4";
    ctx.font = "bold 72px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.title, width / 2, height / 2 - 80);

    ctx.fillStyle = "#ff6b6b";
    ctx.font = "bold 48px Arial";
    ctx.fillText(this.subtitle, width / 2, height / 2 - 20);

    ctx.restore();

    // High Score
    if (this.highScore > 0) {
      ctx.fillStyle = "#ffd700";
      ctx.font = "bold 24px Arial";
      ctx.fillText(
        `High Score: ${Utils.formatScore(this.highScore)}`,
        width / 2,
        height / 2 + 40,
      );
    }

    // Start prompt
    ctx.save();
    ctx.globalAlpha = this.pulseAlpha;
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.fillText(this.startPrompt, width / 2, height / 2 + 100);
    ctx.restore();

    // Instructions
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "16px Arial";
    ctx.fillText("Move: Mouse / Touch", width / 2, height - 80);
    ctx.fillText("Launch Ball: Click / Space", width / 2, height - 60);
    ctx.fillText("Pause: ESC", width / 2, height - 40);

    // Credits
    ctx.font = "14px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("Made for IT Game Jam 2026 Practice", width / 2, height - 15);
  }

  handleInput(input) {
    if (input.isMouseDown() || input.isKeyPressed(" ")) {
      this.game.changeScene("game");
    }
  }
}
