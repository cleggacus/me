import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.scss";
import Layout from "./components/layout/Layout";

export default function App() {
    return (
        <Router
            root={Layout}
        >
            <FileRoutes />
        </Router>
    );
}
