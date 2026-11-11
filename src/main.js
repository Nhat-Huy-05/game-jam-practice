// Entry Point
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const game = new Game(canvas);

  // Start the game
  game.start();

  // Expose game instance for debugging
  window.game = game;

  console.log("🎮 Block Breaker Remix - Game Started!");
  console.log("Made for IT Game Jam 2026 Practice");
});
