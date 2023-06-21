export class Point {
  private x: number;
  private y: number;
  constructor();
  constructor(x: number, y: number);
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  distance(): number;
  distance(other: Point): number;
  distance(x: number, y: number): number;
  distance(pointOrX?: Point | number, y?: number): number {
    if (!(pointOrX || y)) {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    if (pointOrX instanceof Point) {
      return pointOrX.distance(this.x, this.y);
    }

    return Math.sqrt((this.x - (pointOrX as number)) ** 2 + (this.y - (y as number)) ** 2);
  }
}
