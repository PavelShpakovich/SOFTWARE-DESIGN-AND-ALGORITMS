import { Point } from "./Point";
import { Shape } from "./Shape";

export class Triangle extends Shape {
  constructor(point1: Point, point2: Point, point3: Point);
  constructor(point1: Point, point2: Point, point3: Point, color: string, filled: boolean);
  constructor(point1: Point, point2: Point, point3: Point, color?: string, filled?: boolean) {
    if (color && filled !== undefined) {
      super([point1, point2, point3], color, filled);
    } else {
      super([point1, point2, point3]);
    }
  }

  toString(): string {
    const stringifiedPoints = this.points.map((point, i) => `v${i + 1}=${point.toString()}`).join(",");
    return `Triangle[${stringifiedPoints}]`;
  }

  getType(): string {
    const uniqueSides = this.points.reduce((prev, curr, i, arr) => {
      return prev.add(parseFloat(curr.distance(arr[i + 1] || arr[0]).toFixed(1)));
    }, new Set());

    switch (uniqueSides.size) {
      case 3:
        return "scalene triangle";
      case 2:
        return "isosceles triangle";
      default:
        return "equilateral triangle";
    }
  }
}
