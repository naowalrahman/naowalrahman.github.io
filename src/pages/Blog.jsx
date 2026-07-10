import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts, formatDate } from "../posts";
import "./Blog.css";

export default function Blog() {
    return (
        <div className="blog">
            <motion.header
                className="blog-header"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="title">Blog</h1>
                <p className="blog-subtitle">To share cool stuff I've been working on or have learned.</p>
            </motion.header>

            <motion.div
                className="post-list"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
            >
                {posts.map((post) => (
                    <Link to={`/blog/${post.slug}`} key={post.slug} className="post-entry">
                        <span className="post-date">{formatDate(post.date, "short")}</span>
                        <h2>{post.title}</h2>
                        {post.description && <p>{post.description}</p>}
                    </Link>
                ))}
            </motion.div>
        </div>
    );
}
