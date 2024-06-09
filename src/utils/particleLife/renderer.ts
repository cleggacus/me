import { ParticleLife } from "./algorithm";

export type ParticlePallete = {
    types: string[],
}

export const defaultPallete: ParticlePallete = {
    types: [
        "#f00",
        "#0f0",
        "#00f",
        "#ff0",
        "#f0f",
        "#0ff",
    ]
}

export class ParticleRenderer {
    private canvas: OffscreenCanvas | null;
    private ctx: OffscreenCanvasRenderingContext2D | null;
    private pallete: ParticlePallete;

    public constructor() {
        this.canvas = null;
        this.ctx = null;
        this.pallete = defaultPallete;
    }

    public setPallete(pallete: ParticlePallete) {
        this.pallete = pallete;
    }

    public render(particleLife: ParticleLife) {
        if(!this.ctx || !this.canvas) return;

        const particles = particleLife.getParticles();

        const radius = 4;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(const particle of particles) {
            const color = particle.type >= this.pallete.types.length ?
                "#000" : this.pallete.types[particle.type];

            this.ctx.fillStyle = color;

            this.ctx.beginPath();
            this.ctx.arc(
                particle.position.x, 
                particle.position.y,
                radius,
                0, 2 * Math.PI
            );
            this.ctx.fill();
            this.ctx.closePath();
        }
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
