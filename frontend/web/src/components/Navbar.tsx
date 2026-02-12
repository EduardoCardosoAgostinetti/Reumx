import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaEnvelope, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa'
import '../styles/navbar.css'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(!menuOpen)

    return (
        <header className="navbar">
            <div className="navbar__container">

                <div className="navbar__logo">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <img src="../src/assets/reumx_without_text_white.png" alt='Logo' />
                    </Link>
                </div>
                {/* Desktop Menu */}
                <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
                    <Link to="/" className='btn' onClick={() => setMenuOpen(false)}>
                        <FaHome />
                        <span>Home</span>
                    </Link>

                    <Link to="/" className='btn' onClick={() => setMenuOpen(false)}>
                        <FaEnvelope />
                        <span>Contact</span>
                    </Link>

                    <Link to="/" className="btn btn--signin" onClick={() => setMenuOpen(false)}>
                        <FaSignInAlt />
                        <span>Sign In</span>
                    </Link>

                    <Link to="/" className="btn btn--signup" onClick={() => setMenuOpen(false)}>
                        <FaUserPlus />
                        <span>Sign Up</span>
                    </Link>
                </nav>

                {/* Hamburger */}
                <div className="navbar__hamburger" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

            </div>
        </header>
    )
}
