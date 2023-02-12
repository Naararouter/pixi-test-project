import * as PIXI from "pixi.js";
import { app } from "../app";
import { footmanSpritesheet } from "./Alliance/Footman/spritesheet";
import { CELL_SIZE, MapLevels, maps } from "../Map/Map";

interface BaseUnitProps {
  i?: number;
  j?: number;
  mapType?: MapLevels;
}
export class BaseUnit {
  private cell: PIXI.Graphics;
  private mapType: MapLevels;
  constructor({ i = 0, j = 0, mapType = MapLevels.LAND }: BaseUnitProps) {
    this.mapType = mapType;
    this.cell = new PIXI.Graphics();
    this.cell.lineStyle(1, 0x2bef2e, 1);
    this.cell.drawRect(1, 1, CELL_SIZE, CELL_SIZE);
    this.cell.visible = false;

    const sprite = new PIXI.AnimatedSprite(
      footmanSpritesheet.animations["footman-move-backward"]
    );
    sprite.animationSpeed = 0.16666;
    //sprite.play();
    sprite.height = 90;
    sprite.width = 66.5;
    sprite.y = -18;
    console.log(sprite.height, sprite.width);
    // sprite.height = 50 * 1.6;
    // sprite.width = 35 * 1.9;
    //sprite.x = 50;
    //sprite.y = -15;

    const container = new PIXI.Container();
    container.addChild(this.cell);
    container.addChild(sprite);
    container.y = i * CELL_SIZE;
    container.x = j * CELL_SIZE;
    maps[this.mapType][i][j] = this;
    container.interactive = true;
    container.on("pointerdown", this.handleClick);
    app.stage.addChild(container);
  }
  enableSelection = () => {
    this.cell.visible = true;
  };
  disableSelection = () => {
    this.cell.visible = true;
  };
  handleClick = () => {
    this.enableSelection();
  };
}
