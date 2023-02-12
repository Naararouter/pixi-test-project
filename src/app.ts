import * as PIXI from "pixi.js";
import { Selection } from "./Controller/Selection";
import { CELL_SIZE, CURRENT_MAP_CELL_AMOUNT } from "./Map/Map";

const MAP_WIDTH = CELL_SIZE * CURRENT_MAP_CELL_AMOUNT;
const MAP_HEIGHT = CELL_SIZE * CURRENT_MAP_CELL_AMOUNT;

export const app = new PIXI.Application({
  width: MAP_WIDTH,
  height: MAP_HEIGHT,
  backgroundColor: "white",
});

app.renderer.events.cursorStyles.default =
  "url('./assets/cursor/humans_64.png') 6 2, auto";

new Selection(app.stage);

// DRAW DEBUG MAP
var mapBorder = new PIXI.Graphics();
mapBorder.lineStyle(2, 0x000000);
mapBorder.drawRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
mapBorder.interactive = true;
mapBorder.zIndex = 0;

// -- DRAW INNER CELLS
for (let i = 0; i < CURRENT_MAP_CELL_AMOUNT; i++) {
  for (let j = 0; j < CURRENT_MAP_CELL_AMOUNT; j++) {
    var cell = new PIXI.Graphics();
    cell.interactive = true;
    cell.beginFill(0xffffff);
    cell.lineStyle(2, 0x000000);
    cell.drawRect(CELL_SIZE * i, CELL_SIZE * j, CELL_SIZE, CELL_SIZE);
    mapBorder.addChild(cell);
  }
}

app.stage.addChild(mapBorder);
app.stage.sortChildren();
//---

document.body.appendChild(app.view as unknown as Node);
