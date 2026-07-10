import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

const links = [
    { to: "/", label: "About Me" },
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
];

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
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="navbar">
            <Link to="/" className="logo">
                Naowal Rahman<span className="logo-dot">.</span>
            </Link>

            <div className="desktop-links">
                {links.map(({ to, label }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {label}
                    </NavLink>
                ))}
                <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
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
                            {links.map(({ to, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {label}
                                </NavLink>
                            ))}
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setIsMenuOpen(false);
                                }}
                                className="theme-toggle"
                                aria-label="Toggle theme"
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
