// Blog engine: every .md file in src/posts/content/ becomes a post at
// /blog/<filename>. Frontmatter is a simple YAML subset: strings, booleans,
// and inline arrays ([a, b, c]). Expected fields: title, subtitle,
// date (YYYY-MM-DD), description, draft. Display math must use fenced
// $$ blocks (fences on their own lines).
const modules = import.meta.glob("./content/*.md", { as: "raw", eager: true });

function parseFrontmatter(raw) {
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
    if (!match) {
        return { data: {}, body: raw };
    }

    const data = {};
    for (const line of match[1].split(/\r?\n/)) {
        const sep = line.indexOf(":");
        if (sep === -1 || /^\s*#/.test(line)) continue;
        const key = line.slice(0, sep).trim();
        let value = line.slice(sep + 1).trim();
        if (value.startsWith("[") && value.endsWith("]")) {
            data[key] = value
                .slice(1, -1)
                .split(",")
                .map((item) => item.trim().replace(/^["']|["']$/g, ""))
                .filter(Boolean);
        } else {
            value = value.replace(/^["']|["']$/g, "");
            if (value === "true") data[key] = true;
            else if (value === "false") data[key] = false;
            else data[key] = value;
        }
    }
    return { data, body: raw.slice(match[0].length) };
}

export const posts = Object.entries(modules)
    .map(([path, raw]) => {
        const slug = path.replace(/^\.\/content\//, "").replace(/\.md$/, "");
        const { data, body } = parseFrontmatter(raw);
        return {
            slug,
            title: data.title || slug,
            subtitle: data.subtitle || "",
            date: data.date || "",
            description: data.description || "",
            draft: data.draft === true,
            body,
        };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug) {
    return posts.find((post) => post.slug === slug);
}

export function formatDate(date, style = "long") {
    if (!date) return "";
    const options =
        style === "short"
            ? { year: "numeric", month: "short" }
            : { year: "numeric", month: "long", day: "numeric" };
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", options);
}
