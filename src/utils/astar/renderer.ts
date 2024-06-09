import { AStar } from "./algorithm";

export type AStarPallete = {
    obstacle: string,
    closed: string,
    open: string,
    path: string,
}

export const defaultPallete: AStarPallete = {
    obstacle: "#444",
    closed: "#888",
    open: "#bbb",
    path: "#000",
}

export class AStarRenderer {
    private canvas: OffscreenCanvas | null;
    private ctx: OffscreenCanvasRenderingContext2D | null;
    private pallete: AStarPallete;

    public constructor() {
        this.canvas = null;
        this.ctx = null;
        this.pallete = defaultPallete;
    }

    public setPallete(pallete: AStarPallete) {
        this.pallete = pallete;
    }

    public render(aStar: AStar) {
        if(!this.ctx || !this.canvas) return;

        const items: [[number, number][], string][] = [
            [aStar.open(), this.pallete.open],
            [aStar.closed(), this.pallete.closed],
            [aStar.obstacles(), this.pallete.obstacle],
        ];

        const [gridWidth, gridHeight] = aStar.size();

        const cellWidth = this.canvas.width / gridWidth;
        const cellHeight = this.canvas.height / gridHeight;
        const dotRadius = Math.min(cellHeight, cellWidth) * 0.15;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(const [positions, color] of items) {
            this.ctx.fillStyle = color;

            for(const [x, y] of positions) {
                const renderX = x * cellWidth + cellWidth / 2;
                const renderY = y * cellHeight + cellHeight / 2;

                this.ctx.beginPath();
                this.ctx.arc(renderX, renderY, dotRadius, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.closePath();
            }
        }

        const path = aStar.path();

        this.ctx.strokeStyle = this.pallete.path;
        this.ctx.lineWidth = dotRadius * 2;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        this.ctx.beginPath();

        let start = true;

        for(const [x, y] of path) {
            const renderX = x * cellWidth + cellWidth / 2;
            const renderY = y * cellHeight + cellHeight / 2;

            if(start) {
                start = false
                this.ctx.moveTo(renderX, renderY)
            } else {
                this.ctx.lineTo(renderX, renderY)
            }
        }

        this.ctx.stroke();
        this.ctx.closePath();

    }

    public resize(width: number, height: number) {
        if(!this.canvas) return;

        this.canvas.width = width;
        this.canvas.height = height;
    }

    public setCanvas(canvas: OffscreenCanvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
}
