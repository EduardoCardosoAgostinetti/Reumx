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
  FaChartBar
} from 'react-icons/fa'
import '../styles/navbar.css'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <img src="/src/assets/reumx_without_text_white.png" alt="Logo" />
        </div>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {!user && (
            <>
              <Link to="/" className="btn" onClick={() => setMenuOpen(false)}>
                <FaHome />
                <span>{t('home')}</span>
              </Link>

              <Link to="/contact" className="btn" onClick={() => setMenuOpen(false)}>
                <FaEnvelope />
                <span>{t('contact')}</span>
              </Link>

              <Link to="/signin" className="btn btn--signin" onClick={() => setMenuOpen(false)}>
                <FaSignInAlt />
                <span>{t('sign_in')}</span>
              </Link>

              <Link to="/signup" className="btn btn--signup" onClick={() => setMenuOpen(false)}>
                <FaUserPlus />
                <span>{t('sign_up')}</span>
              </Link>
            </>
          )}

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
                  <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>
                    <FaChartBar /> {t('dashboard')}
                  </Link>
                  <Link to="/dashboard/settings" onClick={() => setDropdownOpen(false)}>
                    <FaCog /> {t('settings')}
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {user && (
            <div className="mobile-only mobile-user-menu">
              <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>
                <FaChartBar /> {t('dashboard')}
              </Link>
              <Link to="/dashboard/settings" onClick={() => setMenuOpen(false)}>
                <FaCog /> {t('settings')}
              </Link>
            </div>
          )}
        </nav>

        <div className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </header>
  )
}
