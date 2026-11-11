// Main Game Scene
class GameScene extends Scene {
  constructor(game) {
    super(game);
    this.paddle = null;
    this.balls = [];
    this.bricks = [];
    this.powerUps = [];
    this.particles = new ParticleSystem();
    this.scoreSystem = new ScoreSystem();
    this.lives = CONFIG.INITIAL_LIVES;
    this.level = 1;
    this.paused = false;
    this.gameOver = false;
    this.activePowerUps = [];
  }

  onEnter() {
    this.initGame();
  }

  initGame() {
    const width = this.game.canvas.width;
    const height = this.game.canvas.height;

    // Create paddle
    this.paddle = new Paddle(width / 2 - CONFIG.PADDLE_WIDTH / 2, height - 50);

    // Create initial ball
    this.balls = [new Ball(width / 2, height - 70)];

    // Create bricks
    this.createBricks();

    // Reset systems
    this.powerUps = [];
    this.particles.clear();
    this.scoreSystem.reset();
    this.lives = CONFIG.INITIAL_LIVES;
    this.level = 1;
    this.paused = false;
    this.gameOver = false;
    this.activePowerUps = [];

    this.updateUI();
  }

  createBricks() {
    this.bricks = [];

    for (let row = 0; row < CONFIG.BRICK_ROWS; row++) {
      for (let col = 0; col < CONFIG.BRICK_COLS; col++) {
        const x =
          CONFIG.BRICK_OFFSET_LEFT +
          col * (CONFIG.BRICK_WIDTH + CONFIG.BRICK_PADDING);
        const y =
          CONFIG.BRICK_OFFSET_TOP +
          row * (CONFIG.BRICK_HEIGHT + CONFIG.BRICK_PADDING);

        // Determine brick type based on row
        let type = "NORMAL";
        if (row === 0) type = "BONUS";
        else if (row === 1) type = "MEGA";
        else if (row === 2 || row === 3) type = "STRONG";

        this.bricks.push(new Brick(x, y, type));
      }
    }
  }

  update(deltaTime) {
    if (this.paused || this.gameOver) return;

    // Update paddle
    this.paddle.update(this.game.canvas.width);

    // Update balls
    for (let i = this.balls.length - 1; i >= 0; i--) {
      const ball = this.balls[i];
      ball.update();

      // Check collisions
      this.checkBallCollisions(ball);

      // Check if ball fell off screen
      if (Physics.ballOffScreen(ball, this.game.canvas.height)) {
        this.balls.splice(i, 1);

        // If no balls left, lose a life
        if (this.balls.length === 0) {
          this.loseLife();
        }
      }
    }

    // Update power-ups
    this.updatePowerUps();

    // Update particles
    this.particles.update();

    // Update score system
    this.scoreSystem.update(deltaTime);

    // Update active power-ups timers
    this.updateActivePowerUps(deltaTime);

    // Check win condition
    if (this.checkLevelComplete()) {
      this.nextLevel();
    }

    this.updateUI();
  }

  checkBallCollisions(ball) {
    // Wall collisions
    if (
      Physics.ballWallCollision(
        ball,
        this.game.canvas.width,
        this.game.canvas.height,
      )
    ) {
      // Visual feedback
      this.particles.emit(ball.x, ball.y, "#ffffff", 5);
    }

    // Paddle collision
    if (Physics.ballPaddleCollision(ball, this.paddle)) {
      this.particles.emit(ball.x, ball.y, CONFIG.PADDLE_COLOR, 8);
    }

    // Brick collisions
    for (const brick of this.bricks) {
      if (brick.isDestroyed()) continue;

      if (Physics.ballBrickCollision(ball, brick)) {
        const powerUpType = brick.hit();
        const score = this.scoreSystem.addScore(brick.score);

        // Create particles
        this.particles.emit(
          brick.x + brick.width / 2,
          brick.y + brick.height / 2,
          brick.color,
          20,
        );

        // Spawn power-up if available
        if (powerUpType && brick.isDestroyed()) {
          this.spawnPowerUp(
            brick.x + brick.width / 2,
            brick.y + brick.height / 2,
            powerUpType,
          );
        }

        break; // Only one brick per frame
      }
    }
  }

  updatePowerUps() {
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      powerUp.update();

      // Check collision with paddle
      if (Physics.powerUpPaddleCollision(powerUp, this.paddle)) {
        this.activatePowerUp(powerUp.type);
        this.powerUps.splice(i, 1);
        this.particles.emit(powerUp.x, powerUp.y, powerUp.color, 15);
      }
      // Remove if off screen
      else if (powerUp.isOffScreen(this.game.canvas.height)) {
        this.powerUps.splice(i, 1);
      }
    }
  }

  spawnPowerUp(x, y, type) {
    this.powerUps.push(new PowerUp(x, y, type));
  }

  activatePowerUp(type) {
    switch (type) {
      case "MULTI_BALL":
        this.spawnExtraBalls();
        break;
      case "EXPAND_PADDLE":
        this.paddle.expand(1.5);
        this.activePowerUps.push({
          type: "EXPAND_PADDLE",
          timer: CONFIG.POWERUP_TYPES.EXPAND_PADDLE.duration,
        });
        break;
      case "SLOW_BALL":
        this.balls.forEach((ball) => {
          ball.velocity.multiply(0.6);
        });
        this.activePowerUps.push({
          type: "SLOW_BALL",
          timer: CONFIG.POWERUP_TYPES.SLOW_BALL.duration,
        });
        break;
    }
  }

  spawnExtraBalls() {
    const newBalls = [];
    this.balls.forEach((ball) => {
      if (ball.active) {
        const ball1 = new Ball(ball.x, ball.y);
        const ball2 = new Ball(ball.x, ball.y);

        ball1.velocity = ball.velocity.clone();
        ball1.velocity.x += Utils.random(-2, 2);
        ball1.active = true;

        ball2.velocity = ball.velocity.clone();
        ball2.velocity.x += Utils.random(-2, 2);
        ball2.active = true;

        newBalls.push(ball1, ball2);
      }
    });
    this.balls.push(...newBalls);
  }

  updateActivePowerUps(deltaTime) {
    for (let i = this.activePowerUps.length - 1; i >= 0; i--) {
      const powerUp = this.activePowerUps[i];
      powerUp.timer -= deltaTime;

      if (powerUp.timer <= 0) {
        // Deactivate power-up
        if (powerUp.type === "EXPAND_PADDLE") {
          this.paddle.resetSize();
        } else if (powerUp.type === "SLOW_BALL") {
          this.balls.forEach((ball) => {
            ball.velocity.multiply(1.67); // Restore speed
          });
        }
        this.activePowerUps.splice(i, 1);
      }
    }
  }

  loseLife() {
    this.lives--;

    if (this.lives <= 0) {
      this.gameOver = true;
      this.game.changeScene("gameOver", { score: this.scoreSystem.getScore() });
    } else {
      // Reset ball
      const width = this.game.canvas.width;
      const height = this.game.canvas.height;
      this.balls = [new Ball(width / 2, height - 70)];
      this.scoreSystem.resetCombo();
    }
  }

  checkLevelComplete() {
    return this.bricks.every((brick) => brick.isDestroyed());
  }

  nextLevel() {
    this.level++;
    this.createBricks();

    // Reset ball
    const width = this.game.canvas.width;
    const height = this.game.canvas.height;
    this.balls = [new Ball(width / 2, height - 70)];

    // Increase difficulty slightly
    this.balls.forEach((ball) => ball.increaseSpeed(0.5));
  }

  updateUI() {
    document.getElementById("score").textContent = Utils.formatScore(
      this.scoreSystem.getScore(),
    );
    document.getElementById("lives").textContent = this.lives;
    document.getElementById("level").textContent = this.level;
  }

  render(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Background
    ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
    ctx.fillRect(0, 0, width, height);

    // Render bricks
    this.bricks.forEach((brick) => brick.render(ctx));

    // Render paddle
    this.paddle.render(ctx);

    // Render balls
    this.balls.forEach((ball) => ball.render(ctx));

    // Render power-ups
    this.powerUps.forEach((powerUp) => powerUp.render(ctx));

    // Render particles
    this.particles.render(ctx);

    // Render combo indicator
    if (this.scoreSystem.getCombo() > 1) {
      ctx.save();
      ctx.fillStyle = "#ffd700";
      ctx.font = "bold 32px Arial";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(255, 215, 0, 0.5)";
      ctx.shadowBlur = 10;
      ctx.fillText(`COMBO x${this.scoreSystem.getCombo()}!`, width / 2, 50);
      ctx.restore();
    }

    // Launch hint
    if (this.balls.length === 1 && !this.balls[0].active) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Click or Press SPACE to launch!", width / 2, height / 2);
    }

    // Pause overlay
    if (this.paused) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", width / 2, height / 2);
      ctx.font = "24px Arial";
      ctx.fillText("Press ESC to resume", width / 2, height / 2 + 50);
    }
  }

  handleInput(input) {
    if (this.gameOver) return;

    // Toggle pause
    if (input.isKeyPressed("escape")) {
      this.paused = !this.paused;
      // Prevent key repeat
      input.keys["escape"] = false;
    }

    if (this.paused) return;

    // Move paddle
    this.paddle.moveTo(input.getMouseX());

    // Launch ball
    if (
      (input.isMouseDown() || input.isKeyPressed(" ")) &&
      this.balls.length > 0 &&
      !this.balls[0].active
    ) {
      this.balls[0].launch(-Math.PI / 4 + Utils.random(-0.3, 0.3));
    }
  }
}
