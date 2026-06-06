import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import seo from "./vite-plugin-seo";

export default defineConfig({
    plugins: [
        react(),
        seo({
            hostname: "https://naowalrahman.com",
            // Keep in sync with the <Route> paths in src/App.jsx.
            routes: ["/", "/projects"],
        }),
    ],
    base: "/naowalrahman.github.io",
});
