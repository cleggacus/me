import { Heap } from "../heap";

type AStarNode = {
    x: number,
    y: number,
    parent: AStarNode | null,
    closed: boolean,
    open: boolean,
    distance: number,
    heuristic: number, 
}

export type AStarNextState = "complete" | "invalid" | "continue";

export class AStar {
    public obstaclePositions: [number, number][];
    public obstacleSet: boolean[];

    private width;
    private height;

    private start: {
        x: number,
        y: number,
    }

    private goal: {
        x: number,
        y: number,
    }

    private priorityQueue: Heap<AStarNode>;
    private nodes: AStarNode[];

    public constructor(width: number = 1, height: number = 1) {
        this.width = width;
        this.height = height;

        this.obstacleSet = (new Array(width * height)).fill(false);
        this.obstaclePositions = [];

        this.nodes = new Array(width*height);

        this.start = {
            x: 0,
            y: 0,
        };

        this.goal = {
            x: width - 1,
            y: height - 1,
        };

        this.priorityQueue = new Heap<AStarNode>((a, b) => {
            const costA = a.distance + a.heuristic;
            const costB = b.distance + b.heuristic;

            return costA < costB ? -1 : costA > costB ? 1 : 0;
        });

        this.intialize();
    }

    public size() {
        return [this.width, this.height]
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.nodes.length = width * height;
        this.intialize();
    }

    public intialize() {
        this.goal = {
            x: this.width - 1,
            y: this.height - 1,
        };

        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                const i = y * this.width + x;

                this.nodes[i] = {
                    x,
                    y,
                    parent: null,
                    closed: false,
                    open: false,
                    distance: 0,
                    heuristic: this.heuristic(x, y),
                }
            }
        }

        const startNode = this.node(this.start.x, this.start.y);

        if(!startNode) {
            throw new Error("Invalid start position");
        }

        this.priorityQueue.clear();
        this.priorityQueue.add(startNode);
    }

    public setObstacleMap(obstacleSet: boolean[]) {
        this.obstacleSet = obstacleSet;
        this.obstaclePositions = [];

        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                const i = y * this.width + x;

                if(this.obstacleSet[i]) {
                    this.obstaclePositions.push([x, y]);
                }
            }
        }

    }

    public path(): [number, number][] {
        let current = this.priorityQueue.peek();

        if(!current) {
            return []
        }

        let path: [number, number][] = [[current.x, current.y]];

        while(current.parent != null) {
            current = current.parent;
            path.unshift([current.x, current.y]);
        }

        return path;
    }

    public obstacles(): [number, number][] {
        return this.obstaclePositions;
    }

    public open(): [number, number][] {
        return this.priorityQueue.elements()
            .map(node => [node.x, node.y])
    }

    public closed(): [number, number][] {
        let closed: [number, number][] = [];

        for(const node of this.nodes) {
            if(node.closed) closed.push([node.x, node.y]);
        }

        return closed;
    }

    public next(): AStarNextState {
        const current = this.priorityQueue.remove();

        if(!current) {
            return "invalid";
        }

        current.open = false;

        if(current.x == this.goal.x && current.y == this.goal.y) {
            this.priorityQueue.clear();
            this.priorityQueue.add(current);

            return "complete";
        }

        const neighbours = this.neighbours(current.x, current.y);

        for(const neighbour of neighbours) {
            if (!neighbour || neighbour.closed || neighbour.open) {
                continue;
            }

            const isDiagonal = current.x != neighbour.x && current.y != neighbour.y;
            const distanceBetween = isDiagonal ? Math.SQRT2 : 1;

            const distance = current.distance + distanceBetween;

            neighbour.distance = distance;
            neighbour.parent = current;
            neighbour.open = true;

            this.priorityQueue.add(neighbour);
        }

        current.closed = true;

        return "continue";
    }

    private heuristic(x: number, y: number) {
        const D = 1;
        const D2 = Math.SQRT2;

        const dx = Math.abs(x - this.goal.x);
        const dy = Math.abs(y - this.goal.y);

        return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
    }

    private neighbours(x: number, y: number) {
        return [
            this.node(x-1, y-1),
            this.node(x,   y-1),
            this.node(x+1, y-1),
            this.node(x-1, y),
            this.node(x+1, y),
            this.node(x-1, y+1),
            this.node(x,   y+1),
            this.node(x+1, y+1),
        ]
    }

    private node(x: number, y: number) {
        if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }

        const i = y * this.width + x;

        if(this.obstacleSet[i]) {
            return null;
        }

        return this.nodes[i];
    }
}
