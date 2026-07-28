import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import { SITE_NAME, SITE_DESCRIPTION } from "../config";
import { canonicalUrl } from "../seo";

/**
 * Per-page <head> tags, baked into the pre-rendered HTML at build time.
 * Without these every route ships the same title, description, and no
 * canonical, which reads to crawlers as duplicate pages.
 *
 * @param {Object} props
 * @param {string} [props.title] - Page title; the site name is appended.
 * @param {string} [props.description] - Meta description for this page.
 * @param {boolean} [props.noindex] - Keep the page out of the index entirely.
 */
export default function Seo({ title, description = SITE_DESCRIPTION, noindex = false }) {
    const { pathname } = useLocation();
    const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
    const url = canonicalUrl(pathname);

    return (
        <Head>
            <title>{fullTitle}</title>
            <link rel="canonical" href={url} />
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex" />}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary" />
        </Head>
    );
}
