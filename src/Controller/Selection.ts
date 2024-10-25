import { Container, Graphics, FederatedMouseEvent } from "pixi.js";
import { CELL_SIZE, MapLevels, maps } from "../Map/Map";
import { Selectable } from "./Selectable";

export class Selection {
  private isMouseDown = false;
  private rectangleGraphics: Graphics = new Graphics();
  private rectangleData: [number, number, number, number] = [0, 0, 0, 0];
  private selected: Selectable[] = [];

  constructor(container: Container) {
    this.rectangleGraphics.zIndex = 2;
    console.log("rectangleGraphics", this.rectangleGraphics);
    container.addChild(this.rectangleGraphics);
    container.on("mousedown", this.handleMouseDown);
    container.on("mouseup", this.handleMouseUp);
    container.on("mousemove", this.handleMouseMove);
  }
  handleMouseDown = (e: FederatedMouseEvent) => {
    console.log("down", ...this.getCell(e.globalY, e.globalX));
    this.rectangleData[0] = e.globalX;
    this.rectangleData[1] = e.globalY;
    this.isMouseDown = true;
  };

  handleMouseUp = (e: FederatedMouseEvent) => {
    console.log(
      "up",
      ...this.getCell(e.globalY, e.globalX),
      this.rectangleGraphics
    );
    this.clear();
    this.rectangleGraphics.clear();
    this.isMouseDown = false;
    const [startX, startY] = this.rectangleData;

    const [startI, startJ] = this.getCell(startY, startX);
    const [endI, endJ] = this.getCell(e.globalY, e.globalX);

    const minI = Math.min(startI, endI);
    const maxI = Math.max(startI, endI);
    const minJ = Math.min(startJ, endJ);
    const maxJ = Math.max(startJ, endJ);

    for (let i = minI; i <= maxI; i++) {
      for (let j = minJ; j <= maxJ; j++) {
        const selectable = maps[MapLevels.LAND][i][j];
        if (selectable) {
          selectable.enableSelection();
          this.selected.push(selectable);
        }
      }
    }
  };

  handleMouseMove = (e: FederatedMouseEvent) => {
    if (this.isMouseDown) {
      this.rectangleGraphics.clear();
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
      this.rectangleGraphics.rect(x1, y1, width, height);
      this.rectangleGraphics.stroke({ width: 1, color: "#2bef2e" });
    }
  };
  getCell(i: number, j: number) {
    return [Math.floor(i / CELL_SIZE), Math.floor(j / CELL_SIZE)];
  }
  clear() {
    this.selected.forEach(i => {
      i.disableSelection();
    });
    this.selected = [];
  }
}
