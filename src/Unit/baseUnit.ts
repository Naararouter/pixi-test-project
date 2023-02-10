import * as PIXI from "pixi.js";
import { app } from "../app";
import { footmanSpritesheet } from "./Alliance/Footman/spritesheet";

//interface BaseUnitProps {}
export class BaseUnit {
  private cell: PIXI.Graphics;
  constructor() {
    this.cell = new PIXI.Graphics();
    this.cell.lineStyle(1, 0x2bef2e, 1);
    this.cell.drawRect(1, 1, 58, 58);
    this.cell.visible = false;

    const sprite = new PIXI.AnimatedSprite(
      footmanSpritesheet.animations["footman-move-backward"]
    );
    sprite.animationSpeed = 0.16666;
    sprite.play();
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
    container.y = 50;
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
