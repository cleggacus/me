import { ParentComponent, children, createSignal, onMount } from "solid-js";
import styles from "./Layout.module.scss";
import Button from "../core/Button";
import { BiRegularMenu } from 'solid-icons/bi'
import { MetaProvider } from "@solidjs/meta";
import Navbar from "./Navbar";
import { Suspense } from "solid-js";

const Layout: ParentComponent = (props) => {
    const [open, setOpen] = createSignal(false);

    onMount(() => {
        window.addEventListener("click", () => {
            setOpen(false);
        })

        window.addEventListener("touchstart", () => {
            setOpen(false);
        })
    })

    return <MetaProvider>
        <div class={styles.container}>
            <div class={styles.inner}>
                <div class={styles.content}>
                    <Suspense>{ props.children }</Suspense>
                </div>

                <div class={styles.info}>
                    <p>@cleggacus / solid.js / rust / vim btw</p>
                </div>

                <div class={styles.menuTitle}>
                    <h2>WELCOME</h2>
                    <h2>FRIEND</h2>
                </div>

                <Button 
                    shadow 
                    onTouchStart={e => e.stopPropagation()} 
                    onClick={e => {
                        setOpen(open => !open);
                        e.stopPropagation();
                    }} 
                    class={styles.menuIcon}
                >
                    <BiRegularMenu/>
                </Button>

                <Navbar open={open()} ></Navbar>
            </div>
        </div>
    </MetaProvider>
}

export default Layout;

