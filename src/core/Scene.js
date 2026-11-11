// Base Scene Class
class Scene {
  constructor(game) {
    this.game = game;
  }

  onEnter() {
    // Called when scene becomes active
  }

  onExit() {
    // Called when scene is left
  }

  update(deltaTime) {
    // Update scene logic
  }

  render(ctx) {
    // Render scene
  }

  handleInput(input) {
    // Handle input
  }
}
