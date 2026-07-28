// Generates sitemap.xml and robots.txt at build time so they stay in sync
// with the site's routes and canonical domain. Emitted into the build output
// (dist/) and served from the site root.

/**
 * @param {Object} options
 * @param {string} options.hostname - Canonical site origin, no trailing slash.
 * @param {string[]} options.routes - App routes (must match App.jsx <Route> paths).
 */
export default function seo({ hostname, routes }) {
    // Routes are pre-rendered as directories (blog/post/index.html), which
    // GitHub Pages serves at the trailing-slash path — /blog/post redirects to
    // /blog/post/. Advertise the trailing-slash form so crawlers get a 200
    // instead of a 301, which Search Console reports as "Page with redirect"
    // and refuses to index. Must match the canonical URLs in src/seo.js.
    const toUrl = (route) => `${hostname}${route.endsWith("/") ? route : `${route}/`}`;

    const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        routes.map((route) => `  <url>\n    <loc>${toUrl(route)}</loc>\n  </url>`).join("\n") +
        `\n</urlset>\n`;

    const robots = `User-agent: *\n` + `Allow: /\n\n` + `Sitemap: ${hostname}/sitemap.xml\n`;

    return {
        name: "vite-plugin-seo",
        apply: "build",
        generateBundle() {
            this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
            this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
        },
    };
}
