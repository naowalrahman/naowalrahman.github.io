import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "katex/dist/katex.min.css";
import { getPost, formatDate } from "../posts";
import "./BlogPost.css";

export default function BlogPost() {
    const { slug } = useParams();
    const post = getPost(slug);

    if (!post) {
        return (
            <div className="blog-post">
                <h1>Nothing here!</h1>
                <p className="post-404">
                    <Link to="/blog" className="back-link">
                        ← back to the blog
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <article className="blog-post">
            <Link to="/blog" className="back-link">
                ← back to the blog
            </Link>
            <header className="post-header">
                <h1>{post.title}</h1>
                {(post.subtitle || post.description) && (
                    <p className="post-subtitle">{post.subtitle || post.description}</p>
                )}
                <p className="post-byline">Naowal Rahman · {formatDate(post.date)}</p>
            </header>
            <div className="prose">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeSlug, rehypeKatex, rehypeHighlight]}
                >
                    {post.body}
                </ReactMarkdown>
            </div>
        </article>
    );
}
