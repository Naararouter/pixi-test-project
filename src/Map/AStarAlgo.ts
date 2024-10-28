import { MapNode, MapNodeEntity, PathNode } from "./MapNode";

export class AStarPathfinder {
  grid: MapNode[][]; // 2D array of Nodes
  openList: MapNode[]; // Nodes to be evaluated
  closedList: MapNode[]; // Nodes already evaluated

  constructor(grid: MapNode[][]) {
    this.grid = grid;
    this.openList = [];
    this.closedList = [];
  }

  heuristic(a: MapNode, b: MapNode): number {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    const F = Math.SQRT2 - 1;
    return dx < dy ? F * dx + dy : F * dy + dx;
  }

  findPath(start: MapNode, goal: MapNode): PathNode[] | null {
    this.resetNodes();
    this.openList = [];
    this.closedList = [];

    this.openList.push(start);

    while (this.openList.length > 0) {
      // Sort the open list by f value (lowest first)
      this.openList.sort((a, b) => a.f - b.f);

      // Get the node with the lowest f value
      const currentNode = this.openList.shift() as MapNode;
      this.closedList.push(currentNode);

      // Check if we reached the goal
      if (currentNode === goal) {
        // Reconstruct the path from goal to start
        return this.reconstructPath(currentNode);
      }

      // Get neighbors of the current node
      const neighbors = this.getNeighbors(currentNode);

      for (const neighbor of neighbors) {
        if (neighbor.getContent() || this.closedList.includes(neighbor)) {
          continue; // Skip if not walkable or already evaluated
        }

        const tentativeG = currentNode.g + this.distance(currentNode, neighbor);

        const inOpenList = this.openList.includes(neighbor);

        if (!inOpenList || tentativeG < neighbor.g) {
          // Update neighbor's costs and parent
          neighbor.g = tentativeG;
          neighbor.h = this.heuristic(neighbor, goal);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = currentNode;

          if (!inOpenList) {
            this.openList.push(neighbor);
          }
        }
      }
    }

    // No path found
    return null;
  }

  reconstructPath(node: MapNode): PathNode[] {
    const path: PathNode[] = [];
    let current: MapNode | null = node;
    while (current !== null) {
      path.unshift({ x: current.x, y: current.y });
      current = current.parent;
    }
    return path;
  }

  getNeighbors(node: MapNode): MapNode[] {
    const neighbors: MapNode[] = [];
    const { x, y } = node;
    const directions = [
      { dx: -1, dy: -1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 1 },
      { dx: 0, dy: 1 },
      { dx: 1, dy: 1 },
    ];

    for (const dir of directions) {
      const nx = x + dir.dx;
      const ny = y + dir.dy;

      if (this.isWalkable(nx, ny)) {
        // README: no need to check this according to the original behavior
        // Check for passing through the corner of an obstacle
        // if (Math.abs(dir.dx) === 1 && Math.abs(dir.dy) === 1) {
        //   if (!this.isWalkable(x + dir.dx, y) || !this.isWalkable(x, y + dir.dy)) {
        //     continue;
        //   }
        // }
        neighbors.push(this.grid[ny][nx]);
      }
    }
    return neighbors;
  }

  isWalkable(x: number, y: number): boolean {
    // Check if (x, y) is within grid bounds and walkable
    return (
      y >= 0 &&
      y < this.grid.length &&
      x >= 0 &&
      x < this.grid[0].length &&
      !this.grid[y][x].getContent()
    );
  }

  distance(a: MapNode, b: MapNode): number {
    // Return the cost to move from node a to node b
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    if (dx === 1 && dy === 1) {
      return Math.SQRT2; // Diagonal movement cost (~1.4142)
    } else {
      return 1; // Orthogonal movement cost
    }
  }

  resetNodes() {
    for (const row of this.grid) {
      for (const node of row) {
        node.g = 0;
        node.h = 0;
        node.f = 0;
        node.parent = null;
      }
    }
  }
}

// Example usage:

// Create a grid
console.log("algo --- start");
const width = 10;
const height = 10;
const grid: MapNode[][] = [];

for (let y = 0; y < height; y++) {
  grid[y] = [];
  for (let x = 0; x < width; x++) {
    grid[y][x] = new MapNode(x, y);
  }
}
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
console.log("algo --- end");

export function printGrid(
  grid: MapNode[][],
  path: PathNode[] | null = null,
  startNode: MapNode,
  goalNode: MapNode
) {
  const pathSet = new Set(path?.map(p => `${p.x},${p.y}`));
  for (let y = 0; y < grid.length; y++) {
    let row = "";
    for (let x = 0; x < grid[0].length; x++) {
      const node = grid[y][x];
      if (node === startNode) {
        row += "S ";
      } else if (node === goalNode) {
        row += "G ";
      } else if (node.getContent()) {
        row += "X ";
      } else if (pathSet.has(`${x},${y}`)) {
        row += "* ";
      } else {
        row += ". ";
      }
    }
    console.log(row);
  }
}
