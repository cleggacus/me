import { Component, createEffect } from "solid-js";
import styles from "./Navbar.module.scss";
import { A } from "@solidjs/router";
import Box from "../core/Box";
import Button from "../core/Button";

type NavbarProps = {
    open: boolean
}

const Navbar: Component<NavbarProps> = (props) => {
    return <Box
        shadow
        class={`${styles.container} ${props.open ? styles.open : styles.close}`}
    >
        <A href="/">
            <Button>HOME</Button>
        </A>

        <Button onClick={() => window.open("/CV.pdf", '_blank')}>DOWNLOAD CV</Button>
    </Box>
}

export default Navbar;

