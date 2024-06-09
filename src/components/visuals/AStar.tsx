import { Component, JSX, onMount } from "solid-js";
import AstarWorker from "../../utils/astar/worker?worker";
import { type AstarResponse, type AstarWorkerType } from "../../utils/astar/worker";
import { debounce } from "../../utils/debounce";
import { getCssVar } from "../../utils/cssVar";

type AStarProps = JSX.IntrinsicElements['canvas'];

const AStar: Component<AStarProps> = (props) => {
    let canvasRef: HTMLCanvasElement;
    let astarWorker: AstarWorkerType;

    onMount(async () => {
        if(window.Worker) {
            const offscreen = canvasRef.transferControlToOffscreen();

            offscreen.width = canvasRef.offsetWidth;
            offscreen.height = canvasRef.offsetHeight;

            astarWorker = astarWorker instanceof Worker ? astarWorker : new AstarWorker();

            astarWorker.postMessage({
                method: "initialize",
                payload: {
                    canvas: offscreen,
                    pallete: {
                        obstacle: getCssVar("--bg-color-3"),
                        closed: getCssVar("--bg-color-1"),
                        open: getCssVar("--bg-color-1"),
                        path: getCssVar("--bg-color-3"),
                    },
                },
            }, {
                transfer: [offscreen]
            });

            astarWorker.addEventListener("message", onMessage);
            window.addEventListener("resize", onResize);
        }
    })

    const onResize = debounce(() => {
        astarWorker.postMessage({
            method: "resize",
            payload: {
                width: canvasRef.offsetWidth,
                height: canvasRef.offsetHeight,
            }
        });
    }, 100);

    const onMessage = (event: MessageEvent<AstarResponse>) => {
        switch(event.data.method) {
            case "created": {
                astarWorker.postMessage({
                    method: "start",
                })

                break;
            }
        }
    }

    return <canvas ref={canvasRef!} {...props} />
}

export default AStar;

