// Generates sitemap.xml and robots.txt at build time so they stay in sync
// with the site's routes and canonical domain. Emitted into the build output
// (dist/) and served from the site root.

/**
 * @param {Object} options
 * @param {string} options.hostname - Canonical site origin, no trailing slash.
 * @param {string[]} options.routes - App routes (must match App.jsx <Route> paths).
 */
export default function seo({ hostname, routes }) {
    // Routes are pre-rendered to real static HTML at clean paths, so every
    // one is a directly crawlable, indexable URL.
    const toUrl = (route) =>
        route === "/" ? `${hostname}/` : `${hostname}${route}`;

    const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        routes
            .map((route) => `  <url>\n    <loc>${toUrl(route)}</loc>\n  </url>`)
            .join("\n") +
        `\n</urlset>\n`;

    const robots =
        `User-agent: *\n` +
        `Allow: /\n\n` +
        `Sitemap: ${hostname}/sitemap.xml\n`;

    return {
        name: "vite-plugin-seo",
        apply: "build",
        generateBundle() {
            this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
            this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
        },
    };
}
