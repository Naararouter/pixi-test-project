import * as PIXI from "pixi.js";

export class Selection {
  isMouseDown = false;

  rectangleGraphics: PIXI.Graphics = new PIXI.Graphics();
  rectangleData: [number, number, number, number] = [0, 0, 0, 0];
  constructor(container: PIXI.Container) {
    this.rectangleGraphics.zIndex = 2;
    container.addChild(this.rectangleGraphics);
    container.on("mousedown", e => {
      console.log("down");
      this.rectangleData[0] = e.x;
      this.rectangleData[1] = e.y;
      this.isMouseDown = true;
    });
    container.on("mouseup", e => {
      console.log("up");
      this.rectangleGraphics.clear();
      this.isMouseDown = false;
    });
    container.on("mousemove", e => {
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
    });
  }
}
