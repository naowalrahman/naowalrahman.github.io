import { SITE_URL } from "./config";

// The build emits directory-style pages, so GitHub Pages serves every route at
// its trailing-slash path and 301s the slashless one. Canonicals must point at
// the 200, not the redirect. Must match the sitemap in vite-plugin-seo.js.
export function canonicalUrl(pathname) {
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return `${SITE_URL}${path}`;
}
