// Worker

import { AStar, AStarNextState } from "./algorithm";
import perlin from "./perlin";
import { AStarPallete, AStarRenderer } from "./renderer";

const astar = new AStar();
const renderer = new AStarRenderer();

let lastTime = performance.now();

const desiredRate = 240; // astar next calls per second
const interval = 1000 / desiredRate;

const initializeMap = () => {
    const [width, height] = astar.size();

    let state: AStarNextState = "invalid";

    while(state !== "complete") {
        if(state === "invalid") {
            astar.setObstacleMap(
                perlin(width, height, width / 10, height / 10)
            );

            astar.intialize();
        }

        state = astar.next();
    }

    astar.intialize();
}

const run = () => {
    const currentTime = performance.now();
    let elapsed = currentTime - lastTime;

    renderer.render(astar);

    while(elapsed >= interval) {
        const state = astar.next();

        if(state !== "continue") {
            initializeMap();
        }

        elapsed -= interval;
    }

    lastTime = currentTime - elapsed ;

    requestAnimationFrame(run);
}

onmessage = (event: MessageEvent<AstarRequest>) => {
    const sf = 0.05;

    switch(event.data.method) {
        case "initialize": {
            const width = Math.round(event.data.payload.canvas.width * sf);
            const height = Math.round(event.data.payload.canvas.height * sf);

            renderer.setCanvas(event.data.payload.canvas);
            renderer.setPallete(event.data.payload.pallete);

            astar.resize(width, height);
            initializeMap();

            postMessage({
                method: "created"
            } satisfies AstarResponse)

            break;
        }
        case "start": {
            lastTime = performance.now();
            run();
            break;
        }
        case "resize": {
            const width = Math.round(event.data.payload.width * sf);
            const height = Math.round(event.data.payload.height * sf);

            renderer.resize(
                event.data.payload.width, 
                event.data.payload.height,
            );

            astar.resize(width, height);
            initializeMap();

            break;
        }
    }
}


// Types

export type AstarRequest = {
    method: "initialize",
    payload: {
        canvas: OffscreenCanvas,
        pallete: AStarPallete,
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

export type AstarResponse = {
    method: "created"
}

export type AstarWorkerType = Omit<Worker, "postMessage" | "addEventListener"> & {
    postMessage(message: AstarRequest, options?: StructuredSerializeOptions): void;
    addEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: MessageEvent<AstarResponse>) => any, options?: boolean | AddEventListenerOptions): void;
} 

