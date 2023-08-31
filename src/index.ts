import "./app";
import { BaseUnit } from "./Unit/baseUnit";
import { footmanSpritesheet } from "./Unit/Alliance/Footman/spritesheet";
import { MapLevels } from "./Map/Map";

await footmanSpritesheet.parse();
new BaseUnit({ i: 1, j: 4, mapType: MapLevels.LAND });
new BaseUnit({ i: 1, j: 5, mapType: MapLevels.LAND });

const testChild = document.createElement("div");
testChild.innerText = "Hello World1231233132";
document.body.appendChild(testChild);
