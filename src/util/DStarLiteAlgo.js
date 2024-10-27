class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.g = Infinity;
      this.rhs = Infinity;
      this.key = [Infinity, Infinity];
      this.neighbors = [];
      this.isObstacle = false;
    }
  }
  
  class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    push(node) {
      this.queue.push(node);
      this.queue.sort((a, b) => {
        if (a.key[0] === b.key[0]) {
          return a.key[1] - b.key[1];
        }
        return a.key[0] - b.key[0];
      });
    }
  
    pop() {
      return this.queue.shift();
    }
  
    remove(node) {
      this.queue = this.queue.filter((n) => n !== node);
    }
  
    top() {
      return this.queue[0];
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  }
  
  class DStarLite {
    constructor(grid, start, goal) {
      this.grid = grid;
      this.start = this.getNode(start.x, start.y);
      this.goal = this.getNode(goal.x, goal.y);
      this.U = new PriorityQueue();
      this.km = 0;
      this.last = this.start;
      this.init();
    }
  
    init() {
      this.goal.rhs = 0;
      this.goal.key = this.calculateKey(this.goal);
      this.U.push(this.goal);
    }
  
    getNode(x, y) {
      if (!this.grid[y] || !this.grid[y][x]) return null;
      return this.grid[y][x];
    }
  
    calculateKey(node) {
      const min = Math.min(node.g, node.rhs);
      return [min + this.heuristic(this.start, node) + this.km, min];
    }
  
    heuristic(a, b) {
      // Use Chebyshev distance for grids with diagonal movement
      return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    }
  
    updateVertex(node) {
      if (node !== this.goal) {
        node.rhs = Math.min(
          ...node.neighbors
            .filter((s) => !s.isObstacle)
            .map((s) => s.g + this.cost(node, s))
        );
      }
      this.U.remove(node);
      if (node.g !== node.rhs) {
        node.key = this.calculateKey(node);
        this.U.push(node);
      }
    }
  
    cost(a, b) {
      if (a.isObstacle || b.isObstacle) return Infinity;

      // Determine if movement is diagonal
      const dx = Math.abs(a.x - b.x);
      const dy = Math.abs(a.y - b.y);
      if (dx === 1 && dy === 1) {
        return Math.SQRT2; // Cost of diagonal movement (~1.4142)
      } else if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
        return 1; // Cost of orthogonal movement
      } else {
        return Infinity; // Not adjacent nodes
      }
    }
  
    computeShortestPath() {
      while (
        !this.U.isEmpty() &&
        (this.U.top().key[0] < this.calculateKey(this.start)[0] ||
          this.start.rhs !== this.start.g)
      ) {
        const u = this.U.pop();
        const k_old = u.key;
        const k_new = this.calculateKey(u);
        if (k_old[0] < k_new[0]) {
          u.key = k_new;
          this.U.push(u);
        } else if (u.g > u.rhs) {
          u.g = u.rhs;
          u.neighbors.forEach((s) => this.updateVertex(s));
        } else {
          u.g = Infinity;
          this.updateVertex(u);
          u.neighbors.forEach((s) => this.updateVertex(s));
        }
      }
    }
  
    updateObstacles(obstacles) {
      this.km += this.heuristic(this.last, this.start);
      this.last = this.start;
  
      obstacles.forEach((obstacle) => {
        const node = this.getNode(obstacle.x, obstacle.y);
        if (node && !node.isObstacle) {
          node.isObstacle = true;
          this.updateVertex(node);
          node.neighbors.forEach((neighbor) => {
            this.updateVertex(neighbor);
          });
        }
      });
      this.computeShortestPath();
    }
  
    findPath() {
      this.computeShortestPath();
      let path = [];
      let current = this.start;
  
      if (current.g === Infinity) {
      console.log("No path found!");
        return null;
      }
  
      while (current !== this.goal) {
        path.push({ x: current.x, y: current.y });
        let min = Infinity;
        let next = null;
        current.neighbors.forEach((neighbor) => {
          if (!neighbor.isObstacle) {
            const cost = this.cost(current, neighbor) + neighbor.g;
            if (cost < min) {
              min = cost;
              next = neighbor;
            }
          }
        });
        if (next === null) {
        console.log("No path found!");
          return null;
        }
        current = next;
      }
      path.push({ x: this.goal.x, y: this.goal.y });
      return path;
    }
  
    printGrid(path = []) {
      const pathSet = new Set(path.map((p) => `${p.x},${p.y}`));
      for (let y = 0; y < this.grid.length; y++) {
        let row = "";
        for (let x = 0; x < this.grid[0].length; x++) {
          const node = this.grid[y][x];
          if (node === this.start) {
            row += "S ";
          } else if (node === this.goal) {
            row += "G ";
          } else if (node.isObstacle) {
            row += "X ";
          } else if (pathSet.has(`${x},${y}`)) {
            row += "* ";
          } else {
            row += ". ";
          }
        }
        console.log(row);
      }
      console.log("");
    }
  }
  
// Example usage:
  
// Create a grid
  const width = 5;
  const height = 5;
  let grid = [];
  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      grid[y][x] = new Node(x, y);
    }
  }
  
// Define neighbors
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const node = grid[y][x];
      const directions = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 },
        { x: x + 1, y: y + 1 },
        { x: x - 1, y: y + 1 },
        { x: x + 1, y: y - 1 },
        { x: x - 1, y: y - 1 },
      ];
      directions.forEach((dir) => {
        const neighbor = grid[dir.y] && grid[dir.y][dir.x];
        if (neighbor) {
          node.neighbors.push(neighbor);
        }
      });
    }
  }
  
// Initialize D* Lite
  const start = { x: 0, y: 0 };
  const goal = { x: 4, y: 4 };
  const dstar = new DStarLite(grid, start, goal);
  
// Find initial path
console.log("Initial path:");
  let path = dstar.findPath();
  dstar.printGrid(path);
  
// Update obstacles
  const obstacles = [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 3 },
  ];
  dstar.updateObstacles(obstacles);
  
// Find new path after obstacles
console.log("Updated path after adding obstacles:");
  path = dstar.findPath();
  dstar.printGrid(path);