import { defineConfig } from "@solidjs/start/config";
import vercel from "solid-start-vercel";

export default defineConfig({
    vite: {
        plugins: [
            vercel({ edge: true })
        ],
    }
});
