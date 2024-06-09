import { JSX, ParentComponent, splitProps } from "solid-js";
import styles from "./Button.module.scss";

type ButtonProps = JSX.IntrinsicElements['button'] & {
    shadow?: boolean,
}

const Button: ParentComponent<ButtonProps> = (props) => {
    const [classProps, otherProps] = splitProps(props, ["shadow", "class"]);

    return <button
        class={`${styles.container} ${classProps.class} ${classProps.shadow ? styles.shadow : ""}`}
        { ...otherProps }
    />
}

export default Button;
