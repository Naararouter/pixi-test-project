import * as PIXI from "pixi.js";
import { app } from "../app";
import { footmanSpritesheet } from "./Alliance/Footman/spritesheet";
import { Selectable, SelectableProps } from "../Controller/Selectable";

type BaseUnitProps = SelectableProps;
export class BaseUnit extends Selectable {
  constructor(props: BaseUnitProps) {
    super(props);

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

    this.container.addChild(sprite);
    app.stage.addChild(this.container);
  }
}
