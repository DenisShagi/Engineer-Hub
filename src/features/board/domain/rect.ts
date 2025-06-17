import { Point } from "./point";

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function createRectFromPoint(start: Point, end: Point): Rect {
  return {
    x: Math.min(start.x, end.y),
    y: Math.min(start.y, end.y),
    width: Math.abs(start.x - end.x),
    height: Math.abs(start.y - end.y),
  };
}
