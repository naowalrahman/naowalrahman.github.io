import { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import { posts } from "./posts";
import "./App.css";

function getInitialDark() {
    // Guarded so the layout can also render during static generation, where
    // localStorage may be absent or present-but-unavailable.
    try {
        return localStorage.getItem("theme") === "dark";
    } catch {
        return false;
    }
}

function Layout() {
    const [isDark, setIsDark] = useState(getInitialDark);
    const { pathname } = useLocation();

    useEffect(() => {
        const root = document.documentElement;
        const theme = isDark ? "dark" : "light";
        root.dataset.theme = theme;
        root.style.colorScheme = theme;
        localStorage.setItem("theme", theme);
    }, [isDark]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="app">
            <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
            <main className="app-main">
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </main>
            <footer className="footer">
                &copy; {new Date().getFullYear()} Naowal Rahman&nbsp;&middot;&nbsp;&nbsp;thanks for visiting!
            </footer>
        </div>
    );
}

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home />, entry: "src/pages/Home.jsx" },
            { path: "projects", element: <Projects />, entry: "src/pages/Projects.jsx" },
            { path: "blog", element: <Blog />, entry: "src/pages/Blog.jsx" },
            {
                path: "blog/:slug",
                // Lazy so the markdown/KaTeX/highlighting bundle only ships on post pages.
                lazy: async () => {
                    const { default: BlogPost } = await import("./pages/BlogPost");
                    return { Component: BlogPost };
                },
                entry: "src/pages/BlogPost.jsx",
                // Enumerates every post so each gets its own pre-rendered HTML file.
                getStaticPaths: () => posts.map((post) => `/blog/${post.slug}`),
            },
        ],
    },
];
