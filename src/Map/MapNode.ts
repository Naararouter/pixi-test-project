export class MapNodeEntity {
  tags: Set<string> = new Set();
}

export type MapNodeContentType = MapNodeEntity | null;

export class MapNode {
  x: number; // X-coordinate on the grid
  y: number; // Y-coordinate on the grid
  g: number; // Cost from the start node
  h: number; // Heuristic cost to the goal
  f: number; // Total cost (g + h)
  parent: MapNode | null; // Parent node in the path
  private content: MapNodeContentType;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.parent = null;
    this.content = null;
  }

  setContent(content: MapNodeContentType) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }
}

export type PathNode = { x: number; y: number };
