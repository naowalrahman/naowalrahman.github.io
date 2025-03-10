import React, { useState, useEffect, useRef } from "react";
import Sidebar from "react-sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css";
import "./Blog.css";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postContent, setPostContent] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [docked, setDocked] = useState(false);
    const [headings, setHeadings] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch("/blog-posts/index.json");
                const data = await response.json();
                const updatedPosts = await Promise.all(
                    data.map(async (post) => {
                        const postResponse = await fetch(`/blog-posts/${post.file}`);
                        const postContent = await postResponse.text();
                        const wordCount = postContent.split(/\s+/).length;
                        const excerptLength = 20;
                        const excerpt =
                            postContent
                                .replace(/^# .*\n/, "")
                                .match(/[\w']+/g)
                                ?.slice(0, excerptLength)
                                .join(" ") + "...";
                        const responseHeaders = postResponse.headers;
                        const lastModified = responseHeaders.get("last-modified");
                        const date = lastModified ? new Date(lastModified).toLocaleDateString() : "Unknown date";
                        return { ...post, wordCount, excerpt, date };
                    }),
                );
                setPosts(updatedPosts);
            } catch (error) {
                console.error("Error loading blog posts:", error);
            }
        }
        fetchPosts();
    }, []);

    useEffect(() => {
        function handleResize() {
            // Dock the sidebar for larger screens
            setDocked(window.innerWidth >= 768);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const processMarkdown = (content) => {
        // Convert $$ ... $$ to display math
        return content.replace(/\$\$(.*?)\$\$/gs, (_, math) => `$$\n${math}\n$$`);
    };

    function handlePostSelect(post) {
        fetch(`/blog-posts/${post.file}`)
            .then((response) => response.text())
            .then((content) => {
                setSelectedPost(post);
                setPostContent(processMarkdown(content));
                setSidebarOpen(false);
            })
            .catch((error) => {
                console.error("Error loading post content:", error);
            });
    }

    function handleBackToGrid() {
        setSelectedPost(null);
        setPostContent("");
    }

    function calculateReadingTime(post) {
        if (!post || !post.wordCount) return "0 min read";
        const wordsPerMinute = 200;
        const minutes = Math.ceil(post.wordCount / wordsPerMinute);
        return `${minutes} min read`;
    }

    // Add this function to generate a slug from heading text
    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    // Extract headings after content is loaded
    useEffect(() => {
        if (postContent && contentRef.current) {
            // Wait for the markdown to be rendered
            setTimeout(() => {
                const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");

                // Process each heading to add IDs and collect for TOC
                const headingsData = Array.from(headingElements).map((heading) => {
                    const text = heading.textContent;
                    const id = slugify(text);

                    // Add id attribute to heading if not already present
                    if (!heading.id) {
                        heading.id = id;
                    }

                    return {
                        id: heading.id,
                        text,
                        level: parseInt(heading.tagName.charAt(1)),
                    };
                });

                setHeadings(headingsData);
            }, 100);
        } else {
            setHeadings([]);
        }
    }, [postContent]);

    // Function to scroll to section when TOC item is clicked
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Custom TOC component
    const TableOfContents = () => {
        if (headings.length < 2) return null; // Don't show TOC if not enough headings

        return (
            <div className="toc">
                <div className="toc-heading">Table of Contents</div>
                <nav>
                    <ul className="toc-list">
                        {headings.map((heading, index) => (
                            <li key={index} className={`toc-item toc-level-${heading.level}`}>
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(heading.id);
                                    }}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        );
    };

    const components = {
        // Custom components for enhanced rendering
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
                <div className="code-block-wrapper">
                    {match[1] && <div className="code-language-tag">{match[1]}</div>}
                    <code className={className} {...props}>
                        {children}
                    </code>
                </div>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
        // Add custom components for tables, blockquotes, etc.
        table({ node, ...props }) {
            return (
                <div className="table-container">
                    <table {...props} />
                </div>
            );
        },
        // Add custom heading components to ensure IDs are added
        h1: ({ node, ...props }) => <h1 id={slugify(props.children.toString())} {...props} />,
        h2: ({ node, ...props }) => <h2 id={slugify(props.children.toString())} {...props} />,
        h3: ({ node, ...props }) => <h3 id={slugify(props.children.toString())} {...props} />,
    };

    return (
        <Sidebar
            sidebar={
                <div className="papermod-sidebar">
                    <h3>Posts</h3>
                    <ul>
                        {posts.map((post) => (
                            <li
                                key={post.slug}
                                className={selectedPost?.slug === post.slug ? "active" : ""}
                                onClick={() => handlePostSelect(post)}
                            >
                                {post.title}
                                <p className="post-meta">
                                    {post.date} • {post.wordCount} words • {calculateReadingTime(post)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            open={sidebarOpen}
            onSetOpen={setSidebarOpen}
            docked={docked}
            styles={{
                sidebar: { background: "var(--foreground)", top: "2rem", fontFamily: "Reforma1918" },
                content: { top: 0 },
            }}
        >
            <div className="blog-container">
                <button
                    className="papermod-btn"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{ display: docked ? "none" : "block" }}
                >
                    {sidebarOpen ? "Close" : "Open"} Sidebar
                </button>
                {selectedPost ? (
                    <div className="papermod-content" ref={contentRef}>
                        <button className="back-btn" onClick={handleBackToGrid}>
                            Back to Posts
                        </button>
                        <p className="post-meta">
                            {selectedPost.date} • {selectedPost.wordCount} words • {calculateReadingTime(selectedPost)}
                        </p>

                        {/* Display the TOC if there are headings */}
                        {headings.length > 1 && <TableOfContents />}

                        <ReactMarkdown
                            components={components}
                            remarkPlugins={[remarkGfm, remarkMath, remarkDirective]}
                            rehypePlugins={[rehypeSlug, rehypeKatex, [rehypeHighlight, { ignoreMissing: true }]]}
                        >
                            {postContent}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <div className="grid-container">
                        {posts.map((post) => (
                            <div key={post.slug} className="grid-item" onClick={() => handlePostSelect(post)}>
                                <h3>{post.title}</h3>
                                <p className="post-meta">
                                    {post.date} • {post.wordCount} words • {calculateReadingTime(post)}
                                    <br></br>
                                    {post.excerpt}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Sidebar>
    );
}
