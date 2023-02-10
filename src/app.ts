import * as PIXI from "pixi.js";
import { Selection } from "./Controller/Selection";

export const app = new PIXI.Application({
  width: 640,
  height: 560,
  backgroundColor: "white",
});

app.renderer.events.cursorStyles.default =
  "url('./assets/cursor/humans_64.png'),auto";

new Selection(app.stage);

var graphics = new PIXI.Graphics();
graphics.beginFill(0xffffff);
// set the line style to have a width of 5 and set the color to red
graphics.lineStyle(2, 0x000000);
// draw a rectangle
graphics.drawRect(0, 0, 500, 500);
graphics.interactive = true;
graphics.zIndex = 0;
app.stage.addChild(graphics);
app.stage.sortChildren();
//---

document.body.appendChild(app.view as unknown as Node);
