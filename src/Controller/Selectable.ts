import * as PIXI from "pixi.js";
import { CELL_SIZE, MapLevels, maps } from "../Map/Map";
import { MapNodeEntity } from "../Map/MapNode";

export interface SelectableProps {
  i: number;
  j: number;
  mapType: MapLevels;
}

export class Selectable extends MapNodeEntity {
  protected cell: PIXI.Graphics;
  protected container: PIXI.Container;
  // TODO: migrate on tags system
  // protected type: SelectableTypes;
  protected mapType: MapLevels;

  constructor({ i, j, mapType }: SelectableProps) {
    super();
    this.mapType = mapType;
    //this.type = type;

    this.cell = new PIXI.Graphics();
    this.cell.rect(0, 0, CELL_SIZE, CELL_SIZE);
    this.cell.stroke({ width: 1, color: "#2bef2e" });
    this.cell.visible = false;

    this.container = new PIXI.Container();
    this.container.addChild(this.cell);
    this.container.y = i * CELL_SIZE;
    this.container.x = j * CELL_SIZE;

    // TODO: it can take more than one cell
    maps[this.mapType][i][j].setContent(this);
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
