import * as PIXI from "pixi.js";
import { CELL_SIZE } from "../Map/Map";

export class Selection {
  isMouseDown = false;
  rectangleGraphics: PIXI.Graphics = new PIXI.Graphics();
  rectangleData: [number, number, number, number] = [0, 0, 0, 0];
  constructor(container: PIXI.Container) {
    this.rectangleGraphics.zIndex = 2;
    container.addChild(this.rectangleGraphics);
    container.on("mousedown", this.handleMouseDown);
    container.on("mouseup", this.handleMouseUp);
    container.on("mousemove", this.handleMouseMove);
  }
  handleMouseDown = e => {
    console.log("down", ...this.getCell(e.globalY, e.globalX));
    this.rectangleData[0] = e.x;
    this.rectangleData[1] = e.y;
    this.isMouseDown = true;
  };
  handleMouseUp = e => {
    console.log("up", ...this.getCell(e.globalY, e.globalX));
    this.rectangleGraphics.clear();
    this.isMouseDown = false;
  };
  handleMouseMove = e => {
    if (this.isMouseDown) {
      this.rectangleGraphics.clear();
      this.rectangleGraphics.lineStyle(1, 0x2bef2e, 1);
      let [x1, y1] = this.rectangleData;
      let width = e.x - x1,
        height = e.y - y1;
      if (width < 0) {
        width = Math.abs(width);
        x1 = e.x;
      }
      if (height < 0) {
        height = Math.abs(height);
        y1 = e.y;
      }
      this.rectangleGraphics.drawRect(x1, y1, width, height);
    }
  };
  getCell(i: number, j: number) {
    return [Math.floor(i / CELL_SIZE), Math.floor(j / CELL_SIZE)];
  }
}
