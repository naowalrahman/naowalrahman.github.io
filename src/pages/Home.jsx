import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode, FaRobot, FaBook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./Home.css";
import "../fonts/fonts.css";

export default function Home() {
    const [activeTab, setActiveTab] = useState("cp");
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setFade(true);
        const timeout = setTimeout(() => setFade(false), 200);
        return () => clearTimeout(timeout);
    }, [activeTab]);

    function handleTabChange(tab) {
        setFade(true);
        setTimeout(() => {
            setActiveTab(tab);
            setFade(false);
        }, 200);
    }

    return (
        <div className="home">
            <div>
                <header className="header">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Hey, <br />
                        I'm Naowal Rahman.
                    </motion.h1>
                    <motion.h2
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.0 }}
                    >
                        student, programmer, & avid Linux user
                    </motion.h2>
                    <motion.div
                        className="social-icons"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <a href="https://github.com/naowalrahman" target="_blank" rel="noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/naowalrahman" target="_blank" rel="noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://youtube.com/@naowalplayzgames6218" target="_blank" rel="noreferrer">
                            <FaYoutube />
                        </a>
                    </motion.div>
                </header>

                <motion.div
                    className="content-section"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.0 }}
                >
                    <p>
                        Hi! I'm a sophomore at Columbia University studying computer science and applied mathematics.
                        Broadly, I'm also interested in mathematics, theoretical physics, robotics, engineering, and
                        Linux. More specifically, that involves machine learning, computer vision, computational
                        complexity theory and its applications to robotics, and system level programming. I love working
                        across the tech stack, and programming in general!
                    </p>

                    <div className="tabs-container">
                        <h3>Here are some quick facts:</h3>
                        <div className="tabs">
                            <div
                                className={`tab ${activeTab === "cp" ? "active" : ""}`}
                                onClick={() => handleTabChange("cp")}
                            >
                                <FaCode className="tab-icon" />
                                <span>Programming</span>
                            </div>
                            <div
                                className={`tab ${activeTab === "robotics" ? "active" : ""}`}
                                onClick={() => handleTabChange("robotics")}
                            >
                                <FaRobot className="tab-icon" />
                                <span>Robotics</span>
                            </div>
                            <div
                                className={`tab ${activeTab === "reading" ? "active" : ""}`}
                                onClick={() => handleTabChange("reading")}
                            >
                                <FaBook className="tab-icon" />
                                <span>Books</span>
                            </div>
                        </div>
                        <div className="tab-content">
                            {activeTab === "cp" && (
                                <div className="card">
                                    <div className="card-body">
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaCode className="list-item-icon" />
                                            <span>Python, Java, C, C++, JavaScript, HTML/CSS, Lua, Julia</span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaCode className="list-item-icon" />
                                            <span>
                                                PyTorch, Flask, NumPy, Pandas, MERN Stack, Bootstrap, Neovim, JuMP (and
                                                many more!)
                                            </span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaCode className="list-item-icon" />
                                            <span>Arch Linux, Ubuntu, Debian, Docker</span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaCode className="list-item-icon" />
                                            <span>USACO Silver</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === "robotics" && (
                                <div className="card">
                                    <div className="card-body">
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaRobot className="list-item-icon" />
                                            <span>Columbia University Robotics Club - Autonomous Vehicles Team</span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaRobot className="list-item-icon" />
                                            <span>StuyPulse Robotics (Team 694) - Software Engineering</span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaRobot className="list-item-icon" />
                                            <span>WPILib, ROS</span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaRobot className="list-item-icon" />
                                            <span>NVIDIA Jetson Nano, Raspberry Pi, Limelight, OpenCV</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === "reading" && (
                                <div className="card">
                                    <div className="card-body">
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaBook className="list-item-icon" />
                                            <span>Six Easy Pieces, Richard Feynman</span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaBook className="list-item-icon" />
                                            <span>
                                                How Not to Be Wrong: The Power of Mathematical Thinking, Jordan
                                                Ellenberg
                                            </span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaBook className="list-item-icon" />
                                            <span>Something Deeply Hidden, Sean Caroll</span>
                                        </div>
                                        <div className={`list-item ${fade ? "fade" : ""}`}>
                                            <FaBook className="list-item-icon" />
                                            <span>A Wrinkle in Time, Madeleine L'Engle</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div id="links-section">
                        <p>
                            You can find me programming on{" "}
                            <a
                                href="https://github.com/naowalrahman"
                                className="text-link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                            !
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
