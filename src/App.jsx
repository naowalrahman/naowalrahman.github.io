import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { tokyoNight } from "./theme";
import "./App.css";

// App
function App() {
    const [isDark, setIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

    useEffect(() => {
        const root = document.documentElement;
        const theme = isDark ? tokyoNight.dark : tokyoNight.light;
        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }, [isDark]);

    return (
        <div className={`app ${isDark ? "dark" : "light"}`}>
            <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </div>
    );
}

export default App;
