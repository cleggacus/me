import Vec2 from "./vec2";

class Particle {
    public position: Vec2;
    public velocity: Vec2;
    public type: number;
    public mass: number;

    public constructor() {
        this.position = new Vec2(0, 0);
        this.velocity = new Vec2(0, 0);
        this.type = 0;
        this.mass = 1;
    }

    public update(deltaTime: number, particleLife: ParticleLife) {
        const [width, height] = particleLife.getSize();
        const k = particleLife.getK();
        const forces = particleLife.getForces();
        const minDistances = particleLife.getMinDistances();
        const radii = particleLife.getRadii();
        const friction = particleLife.getFriction();

        let totalForce = new Vec2(0, 0);

        for(const particle of particleLife.getParticles()) {
            if(particle == this) {
                continue;
            }

            const distance = Vec2.sub(particle.position, this.position);

            if(Math.abs(distance.y) > height / 2) {
                distance.y *= -1;
            }

            if(Math.abs(distance.x) > width / 2) {
                distance.x *= -1;
            }

            const displacement = distance.mag();
            const direction = Vec2.normalize(distance);
            const minDistance = minDistances[this.type][particle.type];
            const radius = radii[this.type][particle.type];

            if(displacement < minDistance) {
                const amount = Math.abs(forces[this.type][particle.type]) * -3;
                const displacementNormalized = displacement / minDistance

                totalForce.x += direction.x * amount * displacementNormalized * k;
                totalForce.y += direction.y * amount * displacementNormalized * k;
            }

            if(displacement < radius) {
                const amount = forces[this.type][particle.type];
                const displacementNormalized = displacement / radius

                totalForce.x += direction.x * amount * displacementNormalized * k;
                totalForce.y += direction.y * amount * displacementNormalized * k;
            }
        }

        totalForce.x /= this.mass;
        totalForce.y /= this.mass;

        this.velocity = Vec2.add(this.velocity, totalForce);

        const distance = this.velocity.copy();
        distance.x *= deltaTime;
        distance.y *= deltaTime;

        this.position.add(distance);

        this.position.add(new Vec2(width, height));
        this.position.mod(new Vec2(width, height));

        this.velocity.x *= friction;
        this.velocity.y *= friction;
    }
}

export class ParticleLife {
    private radii: number[][];
    private forces: number[][];
    private minDistances: number[][];
    private particles: Particle[];
    private width: number;
    private height: number;
    private typeCount: number;
    private k: number;
    private friction: number;

    public constructor() {
        this.friction = 0.7;
        this.k = 0.05;
        this.typeCount = 6;
        this.forces = [];
        this.minDistances = [];
        this.radii = [];
        this.particles = [];
        this.width = 0;
        this.height = 0;
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.initialize();
    }

    public getSize() {
        return [this.width, this.height]
    }

    public getK() {
        return this.k;
    }

    public getFriction() {
        return this.friction;
    }

    public getParticles() {
        return this.particles;
    }

    public getRadii() {
        return this.radii;
    }

    public getMinDistances() {
        return this.minDistances;
    }

    public getForces() {
        return this.forces;
    }

    public initialize() {
        this.particles = [];

        for(let i = 0; i < 600; i++) {
            const particle = new Particle();

            particle.type = Math.floor(Math.random() * this.typeCount);

            particle.position = new Vec2(
                Math.random() * this.width,
                Math.random() * this.height,
            );

            this.particles.push(particle);
        }

        this.forces = new Array(this.typeCount);
        this.radii = new Array(this.typeCount);
        this.minDistances = new Array(this.typeCount);

        for(let i = 0; i < this.typeCount; i++) {
            this.forces[i] = new Array(this.typeCount);
            this.radii[i] = new Array(this.typeCount);
            this.minDistances[i] = new Array(this.typeCount);

            for(let j = 0; j < this.typeCount; j++) {
                this.forces[i][j] = Math.random() * 0.7 + 0.3;

                if(Math.random() < 0.5) {
                    this.forces[i][j] *= -1;
                }

                this.minDistances[i][j] = Math.random() * 15 + 10;
                this.radii[i][j] = Math.random() * 60 + 35;
            }
        }
    }

    public update(deltaTime: number) {
        for(const particle of this.particles) {
            particle.update(deltaTime, this);
        }
    }
}
