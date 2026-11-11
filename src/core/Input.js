// Input Handler
class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.keys = {};

    this.setupListeners();
  }

  setupListeners() {
    // Mouse events
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.canvas.addEventListener("mousedown", () => {
      this.mouseDown = true;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.mouseDown = false;
    });

    // Touch events for mobile
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.mouseX = touch.clientX - rect.left;
      this.mouseY = touch.clientY - rect.top;
    });

    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.mouseDown = true;
    });

    this.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.mouseDown = false;
    });

    // Keyboard events
    window.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  isKeyPressed(key) {
    return this.keys[key.toLowerCase()] || false;
  }

  getMouseX() {
    return this.mouseX;
  }

  getMouseY() {
    return this.mouseY;
  }

  isMouseDown() {
    return this.mouseDown;
  }
}
