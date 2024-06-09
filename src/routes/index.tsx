import { Title } from "@solidjs/meta";

import { Component } from "solid-js";
import AStar from "../components/visuals/AStar";
import styles from "./index.module.scss"
import Button from "../components/core/Button";
import me from "../assets/me.png";
import ParticleLife from "../components/visuals/ParticleLife";
import Box from "../components/core/Box";

export default function Home() {
    return <>
        <Title>Liam Clegg - Home</Title>
        <Section1/>
        <Section2/>
    </>
}

const Section1: Component = () => {
    const downloadCV = () => {
        window.open("/CV.pdf", '_blank');
    }

    return <div class={styles.section1}>
        <div class={styles.background1}>
            <AStar class={styles.inner} />
        </div>

        <div class={styles.backCover}></div>

        <div class={styles.subsection1}>
            <div class={styles.container1}>
                <div>
                    <p>Hi there, my name is</p>
                    <h1>Liam Clegg</h1>
                    <p>I&apos;m a <span class={styles.bold}>software engineer</span> who likes to problem solve and bring unique and interesting projects to life.</p>
                    <Button onClick={downloadCV} shadow>Download CV</Button>
                </div>
            </div>

            <div class={styles.container2}>
                <div class={styles.back}></div>
                <img 
                    class={styles.image}
                    src={me} 
                    alt="Image of liam" 
                />
            </div>
        </div>

        <div class={styles.subsection2}>
            <div class={styles.scrollIndicator}>
                <p>S C R O L L</p>
                <div></div>
            </div>
        </div>
    </div>
}

const Section2: Component = () => { 
    return <div class={styles.section2}>
        <div class={styles.background2}>
            <ParticleLife class={styles.inner} />
        </div>

        <Card1></Card1>
        <Card2></Card2>
        <Card3></Card3>
    </div>
}

const Card1: Component = () => {
    return <div class={styles.cardOuter}>
        <Box class={styles.card}>
            <h1>{`Graphics`}</h1>

            <div>
                <p>Skilled in graphics programming using <b>OpenGL</b>, <b>WebGPU</b>, <b>GLSL</b>, and <b>WGSL</b>. Created a real-time <b>Black Hole</b> renderer with meshes as part of a project in <b>Rust</b>.</p>
            </div>

            <a href="https://github.com/cleggacus/bhusie/">
                <Button>Black hole</Button>
            </a>
        </Box>
    </div>
}

const Card2 = () => {
    return <div class={styles.cardOuter}>
        <Box class={styles.card}>
            <h1>{`Web dev`}</h1>

            <div>
                <p>{`Experienced in full stack web development with Next.js, React, Express, and SolidJS (this site). Proficient in TypeScript, Web Workers, Wasm, Docker, Prisma, Redis, and WebSockets.`}</p>
            </div>

            <Button onClick={() => window.open("/CV.pdf", '_blank')}>CV</Button>
        </Box>
    </div>
}

const Card3 = () => {
    return <div class={styles.cardOuter}>
        <Box class={styles.card}>
            <h1>Algorithms</h1>

            <div>
                <p>A <b>perlin noise</b> and <b>A*</b> is this site. Implimented structures and algorithms such as <b>ECS</b> (Game Engine), <b>BVH</b> (Ray Tracing), <b>Ropes</b> (Text Editor), <b>Kademlia</b> + <b>Blockchain</b> (P2P WebRTC Polling App) . . .</p>
            </div>

            <a href="https://github.com/cleggacus">
                <Button>GitHub</Button>
            </a>
        </Box>
    </div>
}

