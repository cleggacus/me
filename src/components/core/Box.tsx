import { JSX, ParentComponent, splitProps } from "solid-js";
import styles from "./Box.module.scss";

type BoxProps = JSX.IntrinsicElements['div'] & {
    shadow?: boolean,
}

const Box: ParentComponent<BoxProps> = (props) => {
    const [classProps, otherProps] = splitProps(props, ["shadow", "class"]);

    return <div
        class={`${styles.container} ${classProps.class} ${classProps.shadow ? styles.shadow : ""}`}
        { ...otherProps }
    />
}

export default Box;
