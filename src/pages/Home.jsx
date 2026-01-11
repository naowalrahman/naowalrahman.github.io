import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode, FaBook, FaGithub, FaLinkedin, FaYoutube, FaLaughBeam } from "react-icons/fa";
import "./Home.css";
import "../fonts/fonts.css";

export default function Home() {
    const [activeTab, setActiveTab] = useState("experience");
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
                        Broadly, I'm also interested in pure mathematics, theoretical physics, robotics, engineering,
                        and Linux. More specifically, that involves machine learning, computer vision, computational
                        complexity theory and its applications to robotics, and system level programming. I love working
                        across the tech stack, and programming in general!
                    </p>

                    <div className="tabs-container">
                        <div className="tabs">
                            <div
                                className={`tab ${activeTab === "experience" ? "active" : ""}`}
                                onClick={() => handleTabChange("experience")}
                            >
                                <FaCode className="tab-icon" />
                                <span>Experience</span>
                            </div>
                            <div
                                className={`tab ${activeTab === "fun" ? "active" : ""}`}
                                onClick={() => handleTabChange("fun")}
                            >
                                <FaLaughBeam className="tab-icon" />
                                <span>Fun</span>
                            </div>
                            <div
                                className={`tab ${activeTab === "book-recs" ? "active" : ""}`}
                                onClick={() => handleTabChange("book-recs")}
                            >
                                <FaBook className="tab-icon" />
                                <span>Book Recs</span>
                            </div>
                        </div>
                        <div className="tab-content">
                            {activeTab === "experience" && (
                                <div className="card">
                                    <div className="card-body">
                                        <p>
                                            I'm currently an undergraduate researcher at the{" "}
                                            <a
                                                href="https://labs-laboratory.com"
                                                className="text-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Columbia Laboratory for AI and Biomedical Science
                                            </a>
                                            . My primary research concerns developing both specialized and foundation
                                            models for various biological modalities, most recently the brain and the
                                            heart.
                                        </p>
                                        <p>
                                            Additionally, I lead the RoboRacer project under the{" "}
                                            <a
                                                href="https://www.columbiarobotics.club/"
                                                className="text-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Columbia University Robotics Club
                                            </a>
                                            , where we're building an autonomous 1/10 scale RC car. We aim to build a
                                            simulatable and generalizable algorithm for finding the path of least time
                                            in a randomized track. We're a small but enthusiastic team of roboticists
                                            developing completely from scratch, so please reach out to me if interested!
                                        </p>
                                        <p>
                                            I'm also a proud alumnus of FRC Team 694,{" "}
                                            <a
                                                href="https://stuypulse.com/"
                                                className="text-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                StuyPulse Robotics
                                            </a>
                                            ! During my 2 years there, we qualified for the FRC world championships and
                                            built two award-winning robots. After going to countless competitions and
                                            spending upwards of 20 hours per week in the lab, I realized I'll always be
                                            happy so long as I'm solving cool problems on a team I vibe with.
                                        </p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "fun" && (
                                <div className="card">
                                    <div className="card-body">
                                        <p>
                                            I like customizing Neovim a lot, and have been experimenting with and trying
                                            to improve AI-powered coding workflows in Neovim. I'm actually a contributor
                                            to{" "}
                                            <a
                                                href="https://github.com/olimorris/codecompanion.nvim"
                                                className="text-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                CodeCompanion.nvim
                                            </a>
                                            ! Lately, however, I've found{" "}
                                            <a
                                                href="https://github.com/anomalyco/opencode"
                                                className="text-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                opencode
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="https://github.com/NickvanDyke/opencode.nvim"
                                                className="text-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                opencode.nvim
                                            </a>{" "}
                                            to be an amazing workflow.
                                        </p>
                                        <p>
                                            I play a few video games. With my friends, it's generally Fortnite. Alone, I
                                            love Final Fantasy VII Remake Intergrade, No Man's Sky, and Minecraft.
                                        </p>
                                        <p>
                                            I also lift! I got into it in 2023, and enjoying it as a hobby has led me to
                                            improve my diet, sleep, and schedule in the name of more gains 😁.
                                        </p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "book-recs" && (
                                <div className="card">
                                    <div className="card-body">
                                        <p>A few books that I've enjoyed.</p>
                                        <div className="book-cards">
                                            <div className="book-card">
                                                <div className="book-title">Six Easy Pieces, Richard Feynman</div>
                                                <div className="book-desc">
                                                    While this is a classic that everyone recommends, here's my take. I
                                                    particularly remember the chapter on energy&mdash;Feynman said the
                                                    universe has no idea what energy is, it's just a human concept for
                                                    saying "when you multiply some physical quantities together, it
                                                    happens to be the same as multiplying some other physical quantities
                                                    together." The universe is incredibly elegant and needs no
                                                    frameworks - we only invent frameworks to understand it for
                                                    ourselves.
                                                </div>
                                            </div>
                                            <div className="book-card">
                                                <div className="book-title">How Not to Be Wrong, Jordan Ellenberg</div>
                                                <div className="book-desc">
                                                    There is a chapter on how a group of MIT students legally exploited
                                                    a loophole in the Massachusetts Cash WinFall lottery, using expected
                                                    value to guarantee profits with high volumes of tickets. While
                                                    events like this are rare, I think it shows that there's merit in
                                                    developing mathematical maturity and trying to apply it everywhere.
                                                </div>
                                            </div>
                                            <div className="book-card">
                                                <div className="book-title">Something Deeply Hidden, Sean Caroll</div>
                                                <div className="book-desc">
                                                    The theory of multiverses honestly just captivated my imagination,
                                                    and I appreicate that Sean Caroll simplified a concept very
                                                    bogged-down in quantum mechanics for people who aren't theoretical
                                                    physicists.
                                                </div>
                                            </div>
                                            <div className="book-card">
                                                <div className="book-title">A Wrinkle in Time, Madeleine L'Engle</div>
                                                <div className="book-desc">
                                                    An excellently written piece of science fiction with an underlying
                                                    social commentary. I remember constantly trying to imagine what it
                                                    would be like to live in Camazotz under the rule of IT. I couldn't
                                                    quite render the image of the bouncing balls scene in my head.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
