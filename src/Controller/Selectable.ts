import * as PIXI from "pixi.js";
import { CELL_SIZE, MapLevels, maps } from "../Map/Map";

export interface SelectableProps {
  i: number;
  j: number;
  mapType: MapLevels;
}

export class Selectable {
  protected cell: PIXI.Graphics;
  protected container: PIXI.Container;
  protected mapType: MapLevels;
  constructor({ i, j, mapType }: SelectableProps) {
    this.mapType = mapType;

    this.cell = new PIXI.Graphics();
    this.cell.rect(0, 0, CELL_SIZE, CELL_SIZE);
    this.cell.stroke({ width: 1, color: "#2bef2e" });
    this.cell.visible = false;

    this.container = new PIXI.Container();
    this.container.addChild(this.cell);
    this.container.y = i * CELL_SIZE;
    this.container.x = j * CELL_SIZE;

    maps[this.mapType][i][j] = this;
  }
  enableSelection = () => {
    this.cell.visible = true;
  };
  disableSelection = () => {
    this.cell.visible = false;
  };
  getContainer = () => {
    return this.container;
  };
}
