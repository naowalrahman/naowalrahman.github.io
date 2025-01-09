import { Link } from 'react-router-dom'
    import { motion } from 'framer-motion'
    import { FiMoon, FiSun } from 'react-icons/fi'
    import '../fonts/fonts.css'
    import './Navbar.css'

    export default function Navbar({ isDark, toggleTheme }) {
      return (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="navbar"
        >
          <h1 className="logo">Naowal Rahman</h1>
          <div className="links">
            <Link to="/">About Me</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/blog">Blog</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </motion.nav>
      )
    }
