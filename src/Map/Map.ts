export enum MapLevels {
  WATER = "WATER",
  LAND = "LAND",
  AIR = "AIR",
}
export const CELL_SIZE = 58;
export const CURRENT_MAP_CELL_AMOUNT = 10;

export const maps: Record<MapLevels, any[][]> = {
  [MapLevels.WATER]: [],
  [MapLevels.LAND]: [],
  [MapLevels.AIR]: [],
};
window.maps = maps;

for (const mapLevel in MapLevels) {
  const level = maps[mapLevel];
  for (let i = 0; i < CURRENT_MAP_CELL_AMOUNT; i++) {
    level[i] = [];
    for (let j = 0; j < CURRENT_MAP_CELL_AMOUNT; j++) {
      level[i][j] = "";
    }
  }
}

export class Map {
  matrix = [];
  constructor(model: string[][]) {}
}
