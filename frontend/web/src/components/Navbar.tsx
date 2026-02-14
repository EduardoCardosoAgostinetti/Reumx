import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaHome,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChartBar  
} from 'react-icons/fa'
import '../styles/navbar.css'

interface UserPayload {
  id: string
  fullName: string
  email: string
  birthdate: string
  token: string
}

function getUserFromToken(): UserPayload | null {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState<UserPayload | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setUser(getUserFromToken())
  }, [])

  // Fecha dropdown desktop ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setDropdownOpen(false)
    setMenuOpen(false)
    setUser(null)
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar__container">

        {/* LOGO */}
        <div className="navbar__logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src="/src/assets/reumx_without_text_white.png" alt="Logo" />
          </Link>
        </div>

        {/* MENU */}
        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>

          {/* NÃO LOGADO */}
          {!user && (
            <>
              <Link to="/" className="btn" onClick={() => setMenuOpen(false)}>
                <FaHome />
                <span>Home</span>
              </Link>

              <Link to="/contact" className="btn" onClick={() => setMenuOpen(false)}>
                <FaEnvelope />
                <span>Contact</span>
              </Link>

              <Link to="/signin" className="btn btn--signin" onClick={() => setMenuOpen(false)}>
                <FaSignInAlt />
                <span>Sign In</span>
              </Link>

              <Link to="/signup" className="btn btn--signup" onClick={() => setMenuOpen(false)}>
                <FaUserPlus />
                <span>Sign Up</span>
              </Link>
            </>
          )}

          {/* LOGADO - DESKTOP */}
          {user && (
            <div className="user-dropdown desktop-only" ref={dropdownRef}>
              <button
                className="user-dropdown__btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser />
                <span>{user.fullName}</span>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown__menu">
                  <Link to="/" onClick={() => setDropdownOpen(false)}>
                    <FaChartBar   /> Dashboard
                  </Link>
                  <Link to="/" onClick={() => setDropdownOpen(false)}>
                    <FaCog /> Settings
                  </Link>
                  <button className="logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* LOGADO - MOBILE */}
          {user && (
            <div className="mobile-only mobile-user-menu">

              <Link to="/" onClick={() => setDropdownOpen(false)}>
                <FaChartBar   /> Dashboard
              </Link>

              <Link to="/" onClick={() => setMenuOpen(false)}>
                <FaCog /> Settings
              </Link>

              <button onClick={handleLogout} className="logout">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}

        </nav>

        {/* HAMBURGER */}
        <div className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </header>
  )
}
