// Simple 2D Vector Math
class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const mag = this.magnitude();
    if (mag > 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }

  setMagnitude(mag) {
    this.normalize();
    this.multiply(mag);
    return this;
  }

  limit(max) {
    const mag = this.magnitude();
    if (mag > max) {
      this.setMagnitude(max);
    }
    return this;
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }

  static random(min, max) {
    const angle = Math.random() * Math.PI * 2;
    const mag = min + Math.random() * (max - min);
    return new Vector2D(Math.cos(angle) * mag, Math.sin(angle) * mag);
  }
}
