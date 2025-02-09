import "./Projects.css";
import { motion } from "framer-motion";

const projectsData = [
    {
        languages: "C++",
        title: "Feedforward Neural Network",
        description:
            "A feedforward neural network with multiple activation and loss function support implemented from scratch. Achieves 97.49% accuracy on the MNIST dataset and 100% accuracy on multiple randomized XOR datasets.",
        link: "https://github.com/naowalrahman/neural-network",
    },
    {
        languages: "MongoDB, ExpressJS, React, NodeJS",
        title: "EcoVentures",
        description:
            "Find and tour eco-friendly vacation destinations based on air pollution data and user reviews. A full-stack development project created using the OpenWeatherMap REST API and the MERN stack.",
        link: "https://ecoventures-ui.vercel.app",
    },
    {
        languages: "JavaScript, HTML, CSS, Bulma",
        title: "Groqqo",
        description:
            "A clean, aesthetically pleasing web interface for the Groq API to take advantage of hyper-fast AI inference. Features a responsive and themed design, with ability to use any of Groq's text-based production and preview LLMs.",
        link: "https://naowalrahman.rocks/groqqo",
    },
    {
        languages: "WPILib, Java",
        title: "Jim, reteP, Izzi",
        description:
            "Three award-winning FRC robots that I helped program for StuyPulse Robotics. Worked on swerve drive, computer vision, and autonomous routines. Conducted research on automatic scoring, object detection, and swerve setpoint generation.",
        link: "https://github.com/stuypulse",
    },
    {
        languages: "C, Ncurses",
        title: "UFM (Unix File Manager)",
        description:
            "A simple file manager for Unix-like systems with a terminal user interface. Features include file and directory creation, deletion, navigation, status bar, as well as file and directory permissions management.",
        link: "https://github.com/naowalrahman/ufm",
    },
    {
        languages: "VPython",
        title: "Soft Body Simulation",
        description:
            "A soft body composed of nodes of constant mass connected by springs of negligible mass. It is able able to stretch, compress, and (seemingly) bend while still maintaining a rigid nature. All motion impemented purely with Newtonian physics.",
        link: "https://glowscript.org/#/user/trawalphysics/folder/MyPrograms/program/bouncyjelly",
    },
];

const sideHobbiesData = [
    {
        languages: "C++, Python",
        title: "Competitive Programming",
        description:
            "A repository of algorithm, data structure, and problem implementations from various programming contests and websites I participate in.",
        link: "https://github.com/naowalrahman/competitive-programming",
    },
    {
        languages: "Lua",
        title: "Naowal.nvim",
        description:
            "A custom Neovim configuration built on LazyVim that I continuosly update and maintain in my free time. Features a custom file runner, dashboard, and supertab implementation.",
        link: "https://github.com/naowalrahman/naowal.nvim",
    },
    {
        languages: "Bash, Python, JSON, YAML",
        title: "Dotfiles",
        description:
            "My custom Arch Linux configuration running Hyprland. Using the foot terminal, zsh with zinit and tmux, the pure prompt, themed Firefox, waybar, tofi, btop, and dunst.",
        link: "https://github.com/naowalrahman/dotfiles",
    },
    {
        languages: "Processing, Java",
        title: "Gravity Guy",
        description:
            "A fun, objected-oriented recreation of Gravity Guy. There is level selection, collision detection, touchable and untouchable objects, and restarting capability.",
        link: "https://github.com/naowalrahman/gravity-guy",
    },
    {
        languages: "Python, Sympy, Matplotlib",
        title: "Calc",
        description: "A fast, hackable, terminal-based calculator with algebra and graphing support.",
        link: "https://naowalrahman.rocks/calc",
    },
    {
        languages: "JavaScript",
        title: "RISer",
        description:
            "A reverse image search browser extension for chromium-based browsers. Uses the Google Images API.",
        link: "https://naowalrahman.rocks/riser",
    },
];

export default function Projects() {
    return (
        <div className="projects">
            <motion.h1
                className="title"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                My Projects
            </motion.h1>
            <motion.div
                className="projects-grid"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
            >
                {projectsData.map((project, idx) => (
                    <div key={idx} className="project-card" onClick={() => window.open(project.link, "_blank")}>
                        <div className="project-languages">{project.languages}</div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </motion.div>

            <motion.h1
                className="title"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                Side Hobbies
            </motion.h1>
            <motion.div
                className="projects-grid"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.0 }}
            >
                {sideHobbiesData.map((hobby, idx) => (
                    <div key={idx} className="project-card" onClick={() => window.open(hobby.link, "_blank")}>
                        <div className="project-languages">{hobby.languages}</div>
                        <h3>{hobby.title}</h3>
                        <p>{hobby.description}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
