import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import seo from "./vite-plugin-seo";

const postSlugs = fs
    .readdirSync("./src/posts/content")
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

export default defineConfig({
    plugins: [
        react(),
        seo({
            hostname: "https://naowalrahman.com",
            // Keep in sync with the <Route> paths in src/App.jsx.
            routes: ["/", "/projects", "/blog", ...postSlugs.map((slug) => `/blog/${slug}`)],
        }),
    ],
    base: "/",
});
