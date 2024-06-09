import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import image404 from "../assets/404.png";
import styles from "./notfound.module.scss";

export default function NotFound() {
    return <div class={styles.container} >
        <Title>Not Found</Title>
        <HttpStatusCode code={404} />
        <img 
            src={image404} 
            alt="Not Found Image" 
        />
        <h1>Uh Oh Stinky!</h1>
    </div>
}
