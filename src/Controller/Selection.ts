import { Container, Graphics, FederatedMouseEvent } from "pixi.js";
import { aStarLandPathfinder, CELL_SIZE, MapLevels, maps } from "../Map/Map";
import { Selectable } from "./Selectable";
import { printGrid } from "../Map/AStarAlgo";

export class Selection {
  private isMouseDown = false;
  private rectangleGraphics: Graphics = new Graphics();
  private rectangleData: [number, number, number, number] = [0, 0, 0, 0];
  private selected: Selectable[] = [];

  constructor(
    container: Container,
    runMoveAnimation: (x: number, y: number) => void
  ) {
    this.rectangleGraphics.zIndex = 2;
    console.log("rectangleGraphics", this.rectangleGraphics);
    container.addChild(this.rectangleGraphics);
    container.on("mousedown", this.handleMouseDown);
    container.on("mouseup", this.handleMouseUp);
    container.on("mousemove", this.handleMouseMove);

    container.on("rightdown", event => {
      event.stopPropagation();
      // TODO: only if selected is unit
      runMoveAnimation(event.globalX, event.globalY);
      const [targetY, targetX] = this.getCell(event.globalY, event.globalX);
      console.log("rightdown", targetX, targetY);

      // POC
      if (this.selected.length > 0) {
        const first = this.selected[0];
        const container = first.getContainer();
        const [initY, initX] = this.getCell(container.y, container.x);
        const initNode = maps[MapLevels.LAND][initY][initX];
        // TODO: test hack
        initNode.setContent(null);
        const goalNode = maps[MapLevels.LAND][targetY][targetX];
        console.log({ initX, initY, initNode, goalNode });
        const path = aStarLandPathfinder.findPath(initNode, goalNode);

        printGrid(maps[MapLevels.LAND], path, initNode, goalNode);
      }
    });
    // TODO: handle different types of selectables
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
        const content = maps[MapLevels.LAND][i][j].getContent();
        if (content instanceof Selectable) {
          content.enableSelection();
          this.selected.push(content);
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
