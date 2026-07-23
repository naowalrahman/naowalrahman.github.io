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
    // These ship non-standard ESM (directory imports, etc.) that Node's native
    // resolver chokes on during static generation, so let Vite bundle them
    // into the SSR build instead of leaving them external.
    ssr: {
        noExternal: ["react-icons", "framer-motion"],
    },
    // Emit directory-style output (blog/post/index.html) rather than flat
    // (blog/post.html). GitHub Pages can't serve files under /blog/ when a
    // sibling blog.html also exists — it treats /blog as that file — so the
    // nested layout avoids the file-vs-directory path collision.
    ssgOptions: {
        dirStyle: "nested",
    },
});
