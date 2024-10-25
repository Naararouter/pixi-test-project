import "./WSClient";
import { BaseUnit } from "./Unit/baseUnit";

import { Application, Graphics, Container } from "pixi.js";
import { Selection } from "./Controller/Selection";
import { MapLevels, CELL_SIZE, CURRENT_MAP_CELL_AMOUNT } from "./Map/Map";
import { loadFootmanSpritesheet } from "./Unit/Alliance/Footman/spritesheet";
const MAP_WIDTH = CELL_SIZE * CURRENT_MAP_CELL_AMOUNT;
const MAP_HEIGHT = CELL_SIZE * CURRENT_MAP_CELL_AMOUNT;

const app = new Application();

(async () => {
  await app.init({
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    backgroundColor: "white",
  });

  app.renderer.events.cursorStyles.default =
    "url('./assets/cursor/humans_64.png') 6 2, auto";

  console.log("stage", app.stage);
  new Selection(app.stage);
  app.stage.eventMode = "static";

  // Create a container for the map
  const mapContainer = new Container();
  mapContainer.zIndex = 0;

  // Create and add the border to the container
  const mapBorder = new Graphics();
  mapBorder.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
  mapBorder.stroke({ width: 2, color: "black" });
  mapContainer.addChild(mapBorder);

  // -- DRAW INNER CELLS
  for (let i = 0; i < CURRENT_MAP_CELL_AMOUNT; i++) {
    for (let j = 0; j < CURRENT_MAP_CELL_AMOUNT; j++) {
      const cell = new Graphics();
      cell.rect(CELL_SIZE * i, CELL_SIZE * j, CELL_SIZE, CELL_SIZE);
      cell.fill(0xffffff);
      cell.stroke({ width: 2, color: "black" });
      mapContainer.addChild(cell);
    }
  }

  // Add the map container to the stage
  app.stage.addChild(mapContainer);
  app.stage.sortChildren();

  document.body.appendChild(app.canvas);

  // --- CALLBACK STARTS HERE
  await loadFootmanSpritesheet();
  const unit1 = new BaseUnit({ i: 1, j: 4, mapType: MapLevels.LAND });
  const unit2 = new BaseUnit({ i: 1, j: 5, mapType: MapLevels.LAND });

  app.stage.addChild(unit1.getContainer());
  app.stage.addChild(unit2.getContainer());

  const testChild = document.createElement("div");
  testChild.innerText = "Hello World1231233132";
  document.body.appendChild(testChild);
})();
