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
  range = new Rectangle(100, 210, 75, 75);

  // Random Gaussian points
  for (let i = 0; i < 350; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }
}

function draw() {
  background(18);

  if (boxFlag) qtree.showBoundaries();
  qtree.showPoints();

  // Drawing Range
  stroke(0, 255, 0);
  strokeWeight(1);
  noFill();
  rect(range.x, range.y, range.w, range.h);
  range.x = mouseX;
  range.y = mouseY;

  // Highlighting points in range
  points = qtree.query(range);
  points.forEach((p) => {
    strokeWeight(4);
    stroke(0, 255, 100);
    point(p.x, p.y);
  });
}

function keyPressed() {
  if (key === 'r') reset();
  if (key === 'b') boxFlag = !boxFlag;
}
