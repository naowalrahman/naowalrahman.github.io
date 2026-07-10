# naowalrahman.github.io

This is my personal website/portfolio and blog where I post things :)

It makes use of React and Vite and a bunch of node modules which you can find in `package.json`. I hope you enjoy browsing through this code. Feel free to make a suggestion via the issues tab if you see any improvements that can be made!

## Writing a blog post

Drop a markdown file in `src/posts/content/` and the filename becomes the URL slug (`my-post.md` becomes `/#/blog/my-post`). Start it with frontmatter:

```markdown
---
title: My Post Title
subtitle: An italic line shown under the title on the post page.
date: 2026-07-10
description: A one-liner shown on the blog list page.
draft: false
---

Post body goes here. GitHub-flavored markdown, LaTeX, and syntax-highlighted
code blocks all work out of the box. Write display math as fenced blocks.
```

Posts with `draft: true` are excluded from the site.

## Development

```
npm install
npm run dev      # local dev server
npm run build    # production build (also generates sitemap.xml/robots.txt)
```

Pushing to `master` deploys to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

## Structure

```
 .
├──  index.html                 # shell + pre-paint theme bootstrap
├──  vite.config.js             # base config + SEO plugin routes
├──  vite-plugin-seo.js         # sitemap.xml + robots.txt at build time
├──  public/                    # CNAME, favicon
└──  src
    ├──  main.css                # design tokens (light/dark), fonts, global styles
    ├──  App.jsx                 # routes, theme state, footer
    ├──  components/Navbar.*
    ├──  pages
    │   ├──  Home.*              # about me
    │   ├──  Projects.*          # project cards
    │   ├──  Blog.*              # post list
    │   └──  BlogPost.*          # markdown renderer (KaTeX + highlighting)
    ├──  posts
    │   ├──  index.js            # markdown loader + frontmatter parser
    │   └──  content/*.md        # blog posts
    └──  fonts/                  # Reforma 1918 (serif fallback)
```
