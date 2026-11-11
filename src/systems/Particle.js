// Particle System for Visual Effects
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.velocity = Vector2D.random(1, 4);
    this.life = CONFIG.PARTICLE_LIFETIME;
    this.maxLife = CONFIG.PARTICLE_LIFETIME;
    this.size = Utils.random(2, 6);
    this.color = color;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.multiply(0.95); // Friction
    this.life--;
  }

  render(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }

  isDead() {
    return this.life <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(x, y, color, count = CONFIG.PARTICLE_COUNT) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  render(ctx) {
    this.particles.forEach((particle) => particle.render(ctx));
  }

  clear() {
    this.particles = [];
  }
}
