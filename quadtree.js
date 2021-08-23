class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class RectangleThing {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show() {
    stroke(255);
    strokeWeight(2);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }

  contains(point) {
    return (
      point.x > this.x &&
      point.x < this.x + this.w &&
      point.y > this.y &&
      point.y < this.y + this.h
    );
  }
}

//=====================================
class Quadtree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }
  show() {
    this.boundary.show();
    if (this.divided) {
      this.northwest.show();
      this.northeast.show();
      this.southwest.show();
      this.southeast.show();
    }
    this.points.forEach((p) => {
      point(p.x, p.y);
    });
  }

  subdivide() {
    let { x, y, w, h } = this.boundary;

    let nw = new RectangleThing(x, y, w / 2, h / 2);
    this.northwest = new Quadtree(nw, this.capacity);

    let ne = new RectangleThing(x + w / 2, y, w / 2, h / 2);
    this.northeast = new Quadtree(ne, this.capacity);

    let sw = new RectangleThing(x, y + h / 2, w / 2, h / 2);
    this.southwest = new Quadtree(sw, this.capacity);

    let se = new RectangleThing(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southeast = new Quadtree(se, this.capacity);
    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) return;

    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      this.northeast.insert(point);
      this.northwest.insert(point);
      this.southeast.insert(point);
      this.southwest.insert(point);
    }
  }
}
