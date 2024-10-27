import * as PIXI from "pixi.js";
import { CELL_SIZE, MapLevels, maps } from "../Map/Map";

export enum SelectableTypes {
  UNIT = "UNIT",
  BUILDING = "BUILDING",
}

export interface SelectableProps {
  i: number;
  j: number;
  mapType: MapLevels;
  type: SelectableTypes;
}

export class Selectable {
  protected cell: PIXI.Graphics;
  protected container: PIXI.Container;
  protected type: SelectableTypes;
  protected mapType: MapLevels;

  constructor({ i, j, mapType, type }: SelectableProps) {
    this.mapType = mapType;
    this.type = type;

    this.cell = new PIXI.Graphics();
    this.cell.rect(0, 0, CELL_SIZE, CELL_SIZE);
    this.cell.stroke({ width: 1, color: "#2bef2e" });
    this.cell.visible = false;

    this.container = new PIXI.Container();
    this.container.addChild(this.cell);
    this.container.y = i * CELL_SIZE;
    this.container.x = j * CELL_SIZE;

    // TODO: it can take more than one cell
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
