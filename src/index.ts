import "./app";
import { BaseUnit } from "./Unit/baseUnit";
import { footmanSpritesheet } from "./Unit/Alliance/Footman/spritesheet";

await footmanSpritesheet.parse();
new BaseUnit({ i: 1, j: 4 });

const testChild = document.createElement("div");
testChild.innerText = "Hello World1231233132";
document.body.appendChild(testChild);
