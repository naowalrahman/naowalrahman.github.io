import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import seo from "./vite-plugin-seo";
import { SITE_URL } from "./src/config.js";

const POSTS_DIR = "./src/posts/content";

// Only published posts get a pre-rendered page (src/posts/index.js drops
// drafts, so getStaticPaths never emits one). Filter the same way here —
// listing a draft in the sitemap points crawlers at a 404.
const publishedSlugs = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => {
        const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
        return !/^\s*draft\s*:\s*true\s*$/m.test(frontmatter?.[1] ?? "");
    })
    .map((file) => file.replace(/\.md$/, ""));

export default defineConfig({
    plugins: [
        react(),
        seo({
            hostname: SITE_URL,
            // Keep in sync with the <Route> paths in src/App.jsx.
            routes: ["/", "/projects", "/blog", ...publishedSlugs.map((slug) => `/blog/${slug}`)],
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
