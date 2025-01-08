import React, { useState, useEffect } from 'react'
import Sidebar from 'react-sidebar'
import Markdown from 'markdown-to-jsx'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './Blog.css'

export default function Blog() {
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)
    const [postContent, setPostContent] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [docked, setDocked] = useState(false)

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('/blog-posts/index.json')
                const data = await response.json()
                const updatedPosts = await Promise.all(data.map(async post => {
                    const postResponse = await fetch(`/blog-posts/${post.file}`)
                    const postContent = await postResponse.text()
                    const wordCount = postContent.split(/\s+/).length
                    const excerptLength = 20
                    const excerpt = postContent.replace(/^# .*\n/, '').match(/[\w']+/g)?.slice(0, excerptLength).join(' ') + '...'
                    const responseHeaders = postResponse.headers
                    const lastModified = responseHeaders.get('last-modified')
                    const date = lastModified ? new Date(lastModified).toLocaleDateString() : 'Unknown date'
                    return { ...post, wordCount, excerpt, date }
                }))
                setPosts(updatedPosts)
            } catch (error) {
                console.error('Error loading blog posts:', error)
            }
        }
        fetchPosts()
    }, [])

    useEffect(() => {
        function handleResize() {
            // Dock the sidebar for larger screens
            setDocked(window.innerWidth >= 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function handlePostSelect(post) {
        fetch(`/blog-posts/${post.file}`)
            .then(response => response.text())
            .then(content => {
                setSelectedPost(post)
                setPostContent(content)
                setSidebarOpen(false)
            })
            .catch(error => {
                console.error('Error loading post content:', error)
            })
    }

    function handleBackToGrid() {
        setSelectedPost(null)
        setPostContent('')
    }

    function calculateReadingTime(post) {
        if (!post || !post.wordCount) return '0 min read'
        const wordsPerMinute = 200
        const minutes = Math.ceil(post.wordCount / wordsPerMinute)
        return `${minutes} min read`
    }

    return (
        <Sidebar
            sidebar={(
                <div className="papermod-sidebar">
                    <h3>My Blog</h3>
                    <ul>
                        {posts.map(post => (
                            <li
                                key={post.slug}
                                className={selectedPost?.slug === post.slug ? 'active' : ''}
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
            )}
            open={sidebarOpen}
            onSetOpen={setSidebarOpen}
            docked={docked}
            styles={{
                sidebar: { background: 'var(--foreground)', top: '2rem', fontFamily: 'Reforma1918' },
                content: { top: 0 }
            }}
        >
            <div className="blog-container">
                <button
                    className="papermod-btn"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{ display: docked ? 'none' : 'block' }}
                >
                    {sidebarOpen ? 'Close' : 'Open'} Sidebar
                </button>
                {selectedPost ? (
                    <div className="papermod-content">
                        <button className="back-btn" onClick={handleBackToGrid}>Back to Posts</button>
                        <p className="post-meta">
                            {selectedPost.date} • {selectedPost.wordCount} words • {calculateReadingTime(selectedPost)}
                        </p>
                        <Markdown>
                            {postContent}
                        </Markdown>
                    </div>
                ) : (
                    <div className="grid-container">
                        {posts.map(post => (
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
    )
}
