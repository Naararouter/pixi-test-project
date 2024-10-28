import { MapNode, MapNodeEntity } from "./MapNode";
import { AStarPathfinder, printGrid } from "./AStarAlgo";

export enum MapLevels {
  WATER = "WATER",
  LAND = "LAND",
  AIR = "AIR",
}
export const CELL_SIZE = 58;
export const CURRENT_MAP_CELL_AMOUNT = 10;

export const maps: Record<MapLevels, MapNode[][]> = {
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
      level[i][j] = new MapNode(j, i);
    }
  }
}

// ----
console.log("map --- start");
const grid = maps[MapLevels.LAND];
console.log({ grid });
// Define obstacles
const obstacles = [
  { x: 4, y: 1 },
  // { x: 4, y: 4 },
  // { x: 4, y: 5 },
  // { x: 4, y: 6 },
  // { x: 5, y: 6 },
  // { x: 6, y: 6 },
];

for (const obs of obstacles) {
  const mapNode = grid[obs.y][obs.x];
  mapNode.setContent(new MapNodeEntity());
}

// Set start and goal nodes
const startNode = grid[1][5];
const goalNode = grid[6][5];

// Create A* instance
const astar = new AStarPathfinder(grid);

// Find path
const path = astar.findPath(startNode, goalNode);

// Print the grid with the path
printGrid(grid, path, startNode, goalNode);
console.log("map --- end");
// ----

export const aStarLandPathfinder = new AStarPathfinder(maps[MapLevels.LAND]);
