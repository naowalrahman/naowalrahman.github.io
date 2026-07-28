import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGamepad, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import HeroCurves from "../components/HeroCurves";
import "./Home.css";

/* The side shelf is driven entirely by this list — add an entry to add a section.
   `content` may be any JSX; long sections just scroll the page as usual. */
const SHELF_SECTIONS = [
    {
        id: "experience",
        label: "Experience",
        icon: FaGears,
        content: (
            <>
                <p>
                    I'm currently a machine learning researcher at the{" "}
                    <a href="https://labs-laboratory.com" className="text-link" target="_blank" rel="noreferrer">
                        Columbia Laboratory for AI and Biomedical Science
                    </a>
                    . My primary research concerns developing both specialized and foundation models for various
                    biological modalities, most recently the brain and the heart.
                </p>
                <p>
                    Additionally, I lead the RoboRacer project under the{" "}
                    <a href="https://www.columbiarobotics.club/" className="text-link" target="_blank" rel="noreferrer">
                        Columbia University Robotics Club
                    </a>
                    , where we're building an autonomous 1/10 scale RC car. We aim to build a simulatable and
                    generalizable algorithm for finding the path of least time in a randomized track. We're a small but
                    enthusiastic team of roboticists developing completely from scratch, so please reach out to me if
                    interested!
                </p>
                <p>
                    I'm also a proud alumnus of FRC Team 694,{" "}
                    <a href="https://stuypulse.com/" className="text-link" target="_blank" rel="noreferrer">
                        StuyPulse Robotics
                    </a>
                    ! During my 2 years there, we qualified for the FRC world championships and built two award-winning
                    robots. After going to countless competitions and spending upwards of 20 hours per week in the lab,
                    I realized I'll always be happy so long as I'm solving cool problems on a team I vibe with.
                </p>
            </>
        ),
    },
    {
        id: "fun",
        label: "Fun",
        icon: FaGamepad,
        content: (
            <>
                <p>
                    I love being around people who are curious and excited about learning. I love to learn new things
                    and then convey them with passion to people who care. So firstly, learning and collaborating with
                    others is my favorite thing to do.
                </p>
                <p>
                    I run and I lift. I track my diet and my sleep. I train for capability. And I find it fun! Lifting
                    started as just a hobby in high school, but it taught me I thrive when I push my limits and stay in
                    healthy discipline.
                </p>
                <p>
                    Video games are very dear to me&mdash;they inspired me to be creative and learn programming early in
                    life. With my friends, I usually play Fortnite. Alone, I love Final Fantasy VII Remake Intergrade,
                    No Man's Sky, and Minecraft.
                </p>
                <p>
                    As an Arch Linux user since 2020, I of course like ricing Linux and Neovim. Tuning my dotfiles to
                    personal perfection excites me. I've also been experimenting with and trying to improve agentic
                    coding workflows in Neovim. Lately, I've found{" "}
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
            </>
        ),
    },
    {
        id: "book-recs",
        label: "Book Recs",
        icon: GiBookshelf,
        content: (
            <>
                <p>A few books that I've enjoyed.</p>
                <div className="book-cards">
                    <div className="book-card">
                        <div className="book-title">Six Easy Pieces, Richard Feynman</div>
                        <div className="book-desc">
                            While this is a classic that everyone recommends, here's my take. I particularly remember
                            the chapter on energy&mdash;Feynman said the universe has no idea what energy is, it's just
                            a human concept for saying "when you multiply some physical quantities together, it happens
                            to be the same as multiplying some other physical quantities together." The universe is
                            incredibly elegant and needs no frameworks - we only invent frameworks to understand it for
                            ourselves.
                        </div>
                    </div>
                    <div className="book-card">
                        <div className="book-title">How Not to Be Wrong, Jordan Ellenberg</div>
                        <div className="book-desc">
                            There is a chapter on how a group of MIT students legally exploited a loophole in the
                            Massachusetts Cash WinFall lottery, using expected value to guarantee profits with high
                            volumes of tickets. While events like this are rare, I think it shows that there's merit in
                            developing mathematical maturity and trying to apply it everywhere.
                        </div>
                    </div>
                    <div className="book-card">
                        <div className="book-title">Something Deeply Hidden, Sean Carroll</div>
                        <div className="book-desc">
                            The theory of multiverses honestly captivated my imagination, and it motivated me to
                            understand the universe and learn quantum mechanics. I appreciate that Sean Carroll
                            communicated a concept so bogged-down in quantum mechanics to people who aren't theoretical
                            physicists, all while inspiring some people to become one.
                        </div>
                    </div>
                    <div className="book-card">
                        <div className="book-title">A Wrinkle in Time, Madeleine L'Engle</div>
                        <div className="book-desc">
                            An excellently written piece of science fiction with an underlying social commentary. I
                            remember constantly trying to imagine what it would be like to live in Camazotz under the
                            rule of IT. I couldn't quite render the image of the bouncing balls scene in my head.
                        </div>
                    </div>
                </div>
            </>
        ),
    },
];

export default function Home() {
    const [activeId, setActiveId] = useState(SHELF_SECTIONS[0].id);
    const [fade, setFade] = useState(false);
    const shelfRef = useRef(null);
    const swapTimer = useRef(null);

    useEffect(() => () => clearTimeout(swapTimer.current), []);

    function selectSection(id) {
        if (id === activeId) return;
        setFade(true);
        clearTimeout(swapTimer.current);
        swapTimer.current = setTimeout(() => {
            setActiveId(id);
            setFade(false);
        }, 180);
    }

    // Roving arrow-key navigation across the shelf, per the tablist pattern.
    function handleShelfKeyDown(event) {
        const offset = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
        if (!offset) return;
        event.preventDefault();
        const index = SHELF_SECTIONS.findIndex((section) => section.id === activeId);
        const next = SHELF_SECTIONS[(index + offset + SHELF_SECTIONS.length) % SHELF_SECTIONS.length];
        selectSection(next.id);
        shelfRef.current?.querySelector(`#shelf-tab-${next.id}`)?.focus();
    }

    const active = SHELF_SECTIONS.find((section) => section.id === activeId);

    return (
        <div className="home">
            <div>
                <header className="header">
                    <HeroCurves />
                    <motion.h1
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                    >
                        Hey, <br />
                        I'm Naowal Rahman<span className="accent-dot">.</span>
                    </motion.h1>
                    <motion.h2
                        className="tagline"
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        curious about everything that comes apart
                    </motion.h2>
                    <motion.div
                        className="social-icons"
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                    >
                        <a href="https://github.com/naowalrahman" target="_blank" rel="noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/naowalrahman" target="_blank" rel="noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://youtube.com/@naowalrahman" target="_blank" rel="noreferrer">
                            <FaYoutube />
                        </a>
                    </motion.div>
                </header>

                <motion.div
                    className="content-section"
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <p>
                        Hi! I'm a junior at Columbia University studying computer science and applied mathematics.
                        Broadly, I'm also interested in pure mathematics, theoretical physics, robotics, engineering,
                        and Linux. More specifically, that involves algorithms, machine learning, computer vision,
                        computational complexity theory and its applications to robotics, and system level programming.
                        I love working across the tech stack, and programming in general!
                    </p>

                    <div className="shelf-layout">
                        <div
                            className="shelf"
                            role="tablist"
                            aria-orientation="vertical"
                            aria-label="More about me"
                            ref={shelfRef}
                            onKeyDown={handleShelfKeyDown}
                        >
                            {SHELF_SECTIONS.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    id={`shelf-tab-${id}`}
                                    role="tab"
                                    aria-selected={id === activeId}
                                    aria-controls={`shelf-panel-${id}`}
                                    tabIndex={id === activeId ? 0 : -1}
                                    className={`shelf-item ${id === activeId ? "active" : ""}`}
                                    onClick={() => selectSection(id)}
                                >
                                    <Icon className="shelf-icon" />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>

                        <div
                            className={`shelf-panel ${fade ? "fading" : ""}`}
                            id={`shelf-panel-${active.id}`}
                            role="tabpanel"
                            aria-labelledby={`shelf-tab-${active.id}`}
                            tabIndex={0}
                        >
                            {active.content}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
