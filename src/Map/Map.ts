import { Selectable } from "../Controller/Selectable";

export enum MapLevels {
  WATER = "WATER",
  LAND = "LAND",
  AIR = "AIR",
}
export const CELL_SIZE = 58;
export const CURRENT_MAP_CELL_AMOUNT = 10;

type MapItem = Selectable | "";
export const maps: Record<MapLevels, MapItem[][]> = {
  [MapLevels.WATER]: [],
  [MapLevels.LAND]: [],
  [MapLevels.AIR]: [],
};
// @ts-ignore
window.maps = maps;

for (const mapLevel in MapLevels) {
  const level = maps[mapLevel as MapLevels];
  for (let i = 0; i < CURRENT_MAP_CELL_AMOUNT; i++) {
    level[i] = [];
    for (let j = 0; j < CURRENT_MAP_CELL_AMOUNT; j++) {
      level[i][j] = "";
    }
  }
}
