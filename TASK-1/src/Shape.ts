import { Point } from "./point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  abstract getType(): string;

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color: string = "green", filled: boolean = true) {
    if (points.length < 3) {
      throw new Error("Provide at least 3 points");
    }

    this.points = points;
    this.color = color;
    this.filled = filled;
  }

  toString(): string {
    const stringifiedPoints = this.points.map((point) => point.toString()).join(", ");
    const filled = this.filled ? "filled" : "not filled";

    return `A Shape with color of ${this.color} and ${filled}. Points: ${stringifiedPoints}.`;
  }

  getPerimeter(): number {
    return this.points.reduce((prev, curr, index, arr) => prev + curr.distance(arr[index + 1] || arr[0]), 0);
  }
}
