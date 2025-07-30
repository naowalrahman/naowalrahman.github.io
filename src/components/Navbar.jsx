import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import "../fonts/fonts.css";
import "./Navbar.css";

export default function Navbar({ isDark, toggleTheme }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        }
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="navbar">
            <h1 className="logo">Naowal Rahman</h1>

            <div className="desktop-links">
                <Link to="/">About Me</Link>
                <Link to="/projects">Projects</Link>
                <a href="https://naowalrahman.rocks/blog" target="_blank" rel="noopener noreferrer">Blog</a>
                <button onClick={toggleTheme} className="theme-toggle">
                    {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
            </div>

            <div className="mobile-menu">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-toggle" ref={toggleRef}>
                    {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="dropdown"
                            ref={dropdownRef}
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                About Me
                            </Link>
                            <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
                                Projects
                            </Link>
                            <a href="https://naowalrahman.rocks/blog" target="_blank" rel="noopener noreferrer">
                                Blog
                            </a>
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setIsMenuOpen(false);
                                }}
                                className="theme-toggle"
                            >
                                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
