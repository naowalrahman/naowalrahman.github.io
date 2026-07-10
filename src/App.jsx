import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import "./App.css";

// Lazy-loaded so the markdown/KaTeX/highlighting bundle only ships on post pages
const BlogPost = lazy(() => import("./pages/BlogPost"));

function getInitialDark() {
    return localStorage.getItem("theme") === "dark";
}

function App() {
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
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                    </Routes>
                </Suspense>
            </main>
            <footer className="footer">
                &copy; {new Date().getFullYear()} Naowal Rahman&nbsp;&middot;&nbsp;&nbsp;thanks for visiting!
            </footer>
        </div>
    );
}

export default App;
