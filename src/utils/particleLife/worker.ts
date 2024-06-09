import { ParticleLife } from "./algorithm"
import { ParticlePallete, ParticleRenderer } from "./renderer";

const renderer = new ParticleRenderer();
const particleLife = new ParticleLife();

let lastTime = performance.now();

const run = () => {
    const currentTime = performance.now();
    let elapsed = currentTime - lastTime;

    renderer.render(particleLife);
    particleLife.update(elapsed);

    lastTime = currentTime;

    requestAnimationFrame(run);
}

onmessage = (event: MessageEvent<ParticleRequest>) => {
    switch(event.data.method) {
        case "initialize": {
            renderer.setCanvas(event.data.payload.canvas);
            renderer.setPallete(event.data.payload.pallete);

            particleLife.resize(
                event.data.payload.canvas.width,
                event.data.payload.canvas.height,
            );

            postMessage({
                method: "created"
            } satisfies ParticleResponse)

            break;
        }
        case "start": {
            run();
            break;
        }
        case "resize": {
            renderer.resize(
                event.data.payload.width, 
                event.data.payload.height,
            );

            particleLife.resize(
                event.data.payload.width, 
                event.data.payload.height,
            );

            break;
        }
    }
}


// Types

export type ParticleRequest = {
    method: "initialize",
    payload: {
        canvas: OffscreenCanvas,
        pallete: ParticlePallete,
    },
} | {
    method: "start",
} | {
    method: "resize",
    payload: {
        width: number,
        height: number,
    }
}

export type ParticleResponse = {
    method: "created"
}

export type ParticleWorkerType = Omit<Worker, "postMessage" | "addEventListener"> & {
    postMessage(message: ParticleRequest, options?: StructuredSerializeOptions): void;
    addEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: MessageEvent<ParticleResponse>) => any, options?: boolean | AddEventListenerOptions): void;
} 

