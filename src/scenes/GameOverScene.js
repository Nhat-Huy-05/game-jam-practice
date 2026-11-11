// Game Over Scene
class GameOverScene extends Scene {
  constructor(game) {
    super(game);
    this.score = 0;
    this.highScore = 0;
    this.isNewHighScore = false;
    this.pulseAlpha = 0;
    this.pulseDirection = 1;
  }

  onEnter(data = {}) {
    this.score = data.score || 0;
    this.highScore = Utils.loadData("blockBreakerHighScore", 0);
    this.isNewHighScore = this.score >= this.highScore;
  }

  update(deltaTime) {
    // Animate prompt
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

    // Game Over title
    ctx.save();
    ctx.shadowColor = "rgba(255, 107, 107, 0.5)";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#ff6b6b";
    ctx.font = "bold 64px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER", width / 2, height / 2 - 120);
    ctx.restore();

    // New high score
    if (this.isNewHighScore) {
      ctx.save();
      ctx.shadowColor = "rgba(255, 215, 0, 0.5)";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#ffd700";
      ctx.font = "bold 36px Arial";
      ctx.fillText("★ NEW HIGH SCORE! ★", width / 2, height / 2 - 60);
      ctx.restore();
    }

    // Score
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Arial";
    ctx.fillText("Your Score", width / 2, height / 2 - 10);

    ctx.fillStyle = "#4ecdc4";
    ctx.font = "bold 48px Arial";
    ctx.fillText(Utils.formatScore(this.score), width / 2, height / 2 + 40);

    // High Score
    if (!this.isNewHighScore && this.highScore > 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "24px Arial";
      ctx.fillText(
        `High Score: ${Utils.formatScore(this.highScore)}`,
        width / 2,
        height / 2 + 90,
      );
    }

    // Continue prompt
    ctx.save();
    ctx.globalAlpha = this.pulseAlpha;
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.fillText(
      "Click or Press SPACE to play again",
      width / 2,
      height / 2 + 140,
    );
    ctx.fillText("Press ESC for menu", width / 2, height / 2 + 170);
    ctx.restore();
  }

  handleInput(input) {
    if (input.isMouseDown() || input.isKeyPressed(" ")) {
      this.game.changeScene("game");
    }

    if (input.isKeyPressed("escape")) {
      this.game.changeScene("menu");
    }
  }
}
