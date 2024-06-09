import { Component, JSX, onMount } from "solid-js";
import ParticleWorker from "../../utils/particleLife/worker?worker";
import { debounce } from "../../utils/debounce";
import { getCssVar } from "../../utils/cssVar";
import { ParticleResponse, ParticleWorkerType } from "../../utils/particleLife/worker";

type ParticleProps = JSX.IntrinsicElements['canvas'];

const ParticleLife: Component<ParticleProps> = (props) => {
    let canvasRef: HTMLCanvasElement;
    let particleWorker: ParticleWorkerType;

    onMount(async () => {
        if(window.Worker) {
            const offscreen = canvasRef.transferControlToOffscreen();

            offscreen.width = canvasRef.offsetWidth;
            offscreen.height = canvasRef.offsetHeight;

            particleWorker = particleWorker instanceof Worker ? particleWorker : new ParticleWorker();

            particleWorker.postMessage({
                method: "initialize",
                payload: {
                    canvas: offscreen,
                    pallete: {
                        types: [
                            "#EADFC6",
                            "#FC8C78",
                            "#638681",
                            "#8BA493",
                            "#3C3521",
                            "#E4AEDA",
                        ]
                    }
                },
            }, {
                transfer: [offscreen]
            });

            particleWorker.addEventListener("message", onMessage);
            window.addEventListener("resize", onResize);
        }
    })

    const onResize = debounce(() => {
        particleWorker.postMessage({
            method: "resize",
            payload: {
                width: canvasRef.offsetWidth,
                height: canvasRef.offsetHeight,
            }
        });
    }, 100);

    const onMessage = (event: MessageEvent<ParticleResponse>) => {
        switch(event.data.method) {
            case "created": {
                particleWorker.postMessage({
                    method: "start",
                })

                break;
            }
        }
    }

    return <canvas ref={canvasRef!} {...props} />
}

export default ParticleLife;

