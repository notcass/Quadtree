/// <reference path="libraries/p5.global-mode.d.ts" />
/**
 *    ==== Quadtree ====
 *  from coding train
 *  I stopped near the end of part 1 to mess around
 */
const CAPACITY = 2;
let boundary;
let qtree;
let points = [];
let drawTreeFlag = true;
let movePointFlag = true;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(18);

  boundary = new Rectangle(0, 0, 400, 400);
  qtree = new Quadtree(boundary, CAPACITY);

  // Lots of random points
  // for (let i = 0; i < 900; i++) {
  //   points.push(new Point(random(width), random(height)));
  // }

  // Structured Points
  // for (let y = 0; y < height; y += height / 20) {
  //   for (let x = 0; x < width; x += width / 40) {
  //     points.push(new Point(x, y));
  //   }
  // }
}

function draw() {
  background(18);

  // Mouse control for points
  if (mouseIsPressed) {
    let m = new Point(mouseX, mouseY);
    points.push(m);
  }

  // Draw points and Tree
  qtree = new Quadtree(boundary, CAPACITY);
  points.forEach((p) => {
    qtree.insert(p);
    if (movePointFlag) p.update();
    p.show();
  });
  if (drawTreeFlag) qtree.show();
}

function keyPressed() {
  if (key === 'q') isLooping() ? noLoop() : loop();
  if (key === 'w') redraw();
  if (key === 'r') {
    qtree = new Quadtree(boundary, CAPACITY);
    points = new Array();
  }
  if (key === 'd') {
    drawTreeFlag = !drawTreeFlag;
  }
  if (key === 'p') movePointFlag = !movePointFlag;
}
