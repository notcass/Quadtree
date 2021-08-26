/// <reference path="libraries/p5.global-mode.d.ts" />
let boundary;
let qtree;
let range;
let points = [];
let boxFlag = true;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(18);
  reset();
}
function reset() {
  boundary = new Rectangle(0, 0, 400, 400);
  qtree = new Quadtree(boundary, 4);

  // Lots of random points
  // for (let i = 0; i < 100; i++) {
  //   let p = new Point(random(width), random(height));
  //   qtree.insert(p);
  // }

  // Random Gaussian
  for (let i = 0; i < 350; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }

  // Points for testing range
  //x: 197 - 304
  //y: 210 - 285
  // qtree.insert(new Point(220, 220));
  // qtree.insert(new Point(230, 270));
  // qtree.insert(new Point(290, 242));
  // qtree.insert(new Point(245, 215));
  // qtree.insert(new Point(225, 256));

  // Range
  range = new Rectangle(197, 210, 107, 75);
  qtree.query(range, points);
  console.log(points);
}

function draw() {
  background(18);

  // Mouse control for points
  // if (mouseIsPressed) {
  //   let m = new Point(mouseX, mouseY);
  //   qtree.insert(m);
  // }

  if (boxFlag) qtree.showBoundaries();
  qtree.showPoints();

  // Range Rect & Testing
  stroke(0, 255, 0);
  strokeWeight(1);
  noFill();
  rect(range.x, range.y, range.w, range.h);
  // range.x = mouseX;
  // range.y = mouseY;
}

function keyPressed() {
  if (key === 'r') reset();
  if (key === '1') {
    points = [];
    qtree.resetPointSize();
    qtree.query(range, points);
    console.log(`%cpoints in box: ${points.length}`, `font-size: 24px`);
  }
  if (key === 'b') boxFlag = !boxFlag;
}

function mousePressed() {
  let p = new Point(mouseX, mouseY);
  qtree.insert(p);
}
