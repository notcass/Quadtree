class Point {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.random = random();

    // Random vector
    // this.vel = createVector(random(-1, 1), random(-1, 1));

    // Consistent vector
    // this.vel = createVector(1, 1);

    // Two diff vectors
    if (this.random > 0.5) {
      this.vel = createVector(1, -1);
    } else {
      this.vel = createVector(1, 1);
    }

    // Four vectors
    // if (this.random < 0.25) {
    //   this.vel = createVector(-1, -1);
    // } else if (this.random < 0.5) {
    //   this.vel = createVector(-1, 1);
    // } else if (this.random < 0.75) {
    //   this.vel = createVector(1, -1);
    // } else if (this.random < 1) {
    //   this.vel = createVector(1, 1);
    // }

    this.acc = createVector(0, 0);
  }
}
Point.prototype.update = function () {
  this.pos.add(this.vel);
  this.edges();
};
Point.prototype.show = function () {
  stroke(0, 255, 255);
  point(this.pos.x, this.pos.y);
};

Point.prototype.edges = function () {
  if (this.pos.y <= 0) {
    this.pos.y = 1;
    this.vel.y *= -1;
  }
  if (this.pos.y >= height) {
    this.pos.y = height;
    this.vel.y *= -1;
  }
  if (this.pos.x >= width) {
    this.pos.x = width;
    this.vel.x *= -1;
  }
  if (this.pos.x <= 0) {
    this.pos.x = 1;
    this.vel.x *= -1;
  }
};
