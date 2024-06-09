import { defineConfig } from "@solidjs/start/config";
import { cloudflare } from "unenv";

export default defineConfig({
  server: {
    preset: "cloudflare-pages",
    unenv: cloudflare,
  },
});
