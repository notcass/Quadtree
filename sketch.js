/// <reference path="libraries/p5.global-mode.d.ts" />
let boundary;
let qtree;
let points = [];

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(18);

  boundary = new RectangleThing(0, 0, 400, 400);
  qtree = new Quadtree(boundary, 4);

  // Lots of random points
  // for (let i = 0; i < 500; i++) {
  //   let p = new Point(random(width), random(height));
  //   qtree.insert(p);
  //   points.push(p);
  // }
}

function draw() {
  // Mouse control for points
  if (mouseIsPressed) {
    let m = new Point(mouseX, mouseY);
    qtree.insert(m);
  }

  // Random Points ever secs
  // if (frameCount % 60 == 0) {
  //   qtree = new Quadtree(boundary, 4);
  //   for (let i = 0; i < 500; i++) {
  //     let p = new Point(random(width), random(height));
  //     qtree.insert(p);
  //   }
  // }

  background(18);
  qtree.show();
}
