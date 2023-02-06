import * as PIXI from "pixi.js";
import { app } from "../app";
import { footmanSpritesheet } from "./Alliance/Footman/spritesheet";

//interface BaseUnitProps {}
export class BaseUnit {
  constructor() {
    const rect = new PIXI.Graphics();
    rect.lineStyle(1, 0x2bef2e, 1);
    rect.drawRect(1, 1, 58, 58);

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
    container.addChild(rect);
    container.addChild(sprite);
    container.y = 50;
    app.stage.addChild(container);
  }
}
