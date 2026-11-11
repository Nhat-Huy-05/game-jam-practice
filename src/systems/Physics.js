// Physics & Collision System
class Physics {
  // Check ball collision with paddle
  static ballPaddleCollision(ball, paddle) {
    if (
      !Utils.circleRectCollision(
        { x: ball.x, y: ball.y, radius: ball.radius },
        {
          x: paddle.x,
          y: paddle.y,
          width: paddle.width,
          height: paddle.height,
        },
      )
    ) {
      return false;
    }

    // Calculate bounce angle based on hit position
    const hitPos = (ball.x - paddle.x) / paddle.width; // 0 to 1
    const bounceAngle = Utils.lerp(-Math.PI * 0.75, -Math.PI * 0.25, hitPos);

    const speed = ball.velocity.magnitude();
    ball.velocity.x = Math.cos(bounceAngle) * speed;
    ball.velocity.y = Math.sin(bounceAngle) * speed;

    // Ensure ball is above paddle
    ball.y = paddle.y - ball.radius;

    return true;
  }

  // Check ball collision with brick
  static ballBrickCollision(ball, brick) {
    if (
      !Utils.circleRectCollision(
        { x: ball.x, y: ball.y, radius: ball.radius },
        { x: brick.x, y: brick.y, width: brick.width, height: brick.height },
      )
    ) {
      return false;
    }

    // Determine which side was hit
    const ballPrevX = ball.x - ball.velocity.x;
    const ballPrevY = ball.y - ball.velocity.y;

    const brickCenterX = brick.x + brick.width / 2;
    const brickCenterY = brick.y + brick.height / 2;

    const dx = ball.x - brickCenterX;
    const dy = ball.y - brickCenterY;

    // Calculate overlap on each axis
    const overlapX = brick.width / 2 + ball.radius - Math.abs(dx);
    const overlapY = brick.height / 2 + ball.radius - Math.abs(dy);

    // Bounce on the axis with less overlap
    if (overlapX < overlapY) {
      ball.velocity.x *= -1;
      ball.x += ball.velocity.x > 0 ? overlapX : -overlapX;
    } else {
      ball.velocity.y *= -1;
      ball.y += ball.velocity.y > 0 ? overlapY : -overlapY;
    }

    return true;
  }

  // Check ball collision with walls
  static ballWallCollision(ball, canvasWidth, canvasHeight) {
    let collided = false;

    // Left wall
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.velocity.x *= -1;
      collided = true;
    }

    // Right wall
    if (ball.x + ball.radius > canvasWidth) {
      ball.x = canvasWidth - ball.radius;
      ball.velocity.x *= -1;
      collided = true;
    }

    // Top wall
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.velocity.y *= -1;
      collided = true;
    }

    return collided;
  }

  // Check if ball fell off screen
  static ballOffScreen(ball, canvasHeight) {
    return ball.y - ball.radius > canvasHeight;
  }

  // Check power-up collision with paddle
  static powerUpPaddleCollision(powerUp, paddle) {
    return Utils.rectCollision(
      { x: powerUp.x, y: powerUp.y, width: powerUp.size, height: powerUp.size },
      { x: paddle.x, y: paddle.y, width: paddle.width, height: paddle.height },
    );
  }
}
