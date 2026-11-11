// Score & Combo System
class ScoreSystem {
  constructor() {
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.highScore = Utils.loadData("blockBreakerHighScore", 0);
  }

  addScore(points) {
    // Add combo multiplier
    const multiplier = 1 + this.combo * 0.1;
    const finalScore = Math.floor(points * multiplier);
    this.score += finalScore;

    // Update combo
    this.combo++;
    this.comboTimer = CONFIG.COMBO_TIMEOUT;

    // Update high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      Utils.saveData("blockBreakerHighScore", this.highScore);
    }

    return finalScore;
  }

  resetCombo() {
    this.combo = 0;
    this.comboTimer = 0;
  }

  update(deltaTime) {
    if (this.comboTimer > 0) {
      this.comboTimer -= deltaTime;
      if (this.comboTimer <= 0) {
        this.resetCombo();
      }
    }
  }

  reset() {
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
  }

  getScore() {
    return this.score;
  }

  getCombo() {
    return this.combo;
  }

  getHighScore() {
    return this.highScore;
  }
}
