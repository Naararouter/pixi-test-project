import * as PIXI from "pixi.js";

export const app = new PIXI.Application({
  width: 640,
  height: 560,
  backgroundColor: "white",
});

document.body.appendChild(app.view as unknown as Node);
