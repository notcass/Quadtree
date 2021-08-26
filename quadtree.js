class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
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
      point.x >= this.x &&
      point.x <= this.x + this.w &&
      point.y >= this.y &&
      point.y <= this.y + this.h
    );
  }

  intersects(range) {
    if (
      this.x < range.x + range.w &&
      this.x + this.w > range.x &&
      this.y < range.y + range.h &&
      this.y + this.h > range.y
    ) {
      return true;
    }
    return false;
  }

  //prettier-ignore
  intersectsBadFirstAttempt(range) {
    // The problem with this was we were only checking if a corner of the range was inside the boundary
    // But that doesn't work when the boundary is completely inside the range
    let x = range.x > this.x && range.x < this.x + this.w || range.x + range.w > this.x && range.x + range.w < this.x + this.w;
    let y = range.y > this.y && range.y < this.y + this.h || range.y + range.h > this.y && range.y + range.h < this.y + this.h;

    return x || y;
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

  subdivide() {
    let { x, y, w, h } = this.boundary;

    let nw = new Rectangle(x, y, w / 2, h / 2);
    this.northwest = new Quadtree(nw, this.capacity);

    let ne = new Rectangle(x + w / 2, y, w / 2, h / 2);
    this.northeast = new Quadtree(ne, this.capacity);

    let sw = new Rectangle(x, y + h / 2, w / 2, h / 2);
    this.southwest = new Quadtree(sw, this.capacity);

    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southeast = new Quadtree(se, this.capacity);
    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) return;

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      return (
        this.northeast.insert(point) ||
        this.northwest.insert(point) ||
        this.southeast.insert(point) ||
        this.southwest.insert(point)
      );
    }
  }

  query(range, found) {
    if (!found) found = [];

    if (this.boundary.intersects(range)) {
      this.points.forEach((p) => {
        if (range.contains(p)) {
          found.push(p);
        }
      });

      if (this.divided) {
        this.northwest.query(range, found);
        this.northeast.query(range, found);
        this.southwest.query(range, found);
        this.southeast.query(range, found);
      }
    }

    return found;
  }

  showBoundaries() {
    this.boundary.show();
    if (this.divided) {
      this.northwest.showBoundaries();
      this.northeast.showBoundaries();
      this.southwest.showBoundaries();
      this.southeast.showBoundaries();
    }
  }

  showPoints() {
    stroke(255);
    strokeWeight(1);
    this.points.forEach((p) => {
      point(p.x, p.y);
    });

    if (this.divided) {
      this.northwest.showPoints();
      this.northeast.showPoints();
      this.southwest.showPoints();
      this.southeast.showPoints();
    }
  }
}
