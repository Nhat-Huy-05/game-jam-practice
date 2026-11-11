// Main Game Manager
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.input = new Input(canvas);

    // Setup canvas size
    this.canvas.width = CONFIG.CANVAS_WIDTH;
    this.canvas.height = CONFIG.CANVAS_HEIGHT;

    // Scenes
    this.scenes = {
      menu: new MenuScene(this),
      game: new GameScene(this),
      gameOver: new GameOverScene(this),
    };

    this.currentScene = null;
    this.lastTime = 0;
    this.running = false;
  }

  start() {
    this.changeScene("menu");
    this.running = true;
    this.lastTime = performance.now();
    this.loop();
  }

  loop(currentTime = 0) {
    if (!this.running) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Update
    if (this.currentScene) {
      this.currentScene.handleInput(this.input);
      this.currentScene.update(deltaTime);
    }

    // Render
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.currentScene) {
      this.currentScene.render(this.ctx);
    }

    // Continue loop
    requestAnimationFrame((time) => this.loop(time));
  }

  changeScene(sceneName, data = null) {
    // Exit current scene
    if (this.currentScene) {
      this.currentScene.onExit();
    }

    // Enter new scene
    this.currentScene = this.scenes[sceneName];
    if (this.currentScene) {
      this.currentScene.onEnter(data);
    }
  }

  stop() {
    this.running = false;
  }
}
