import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaChartBar, FaCog, FaUser } from 'react-icons/fa'
import '../styles/sidebar.css'
import { useTranslation } from 'react-i18next'

interface UserPayload {
  id: string
  fullName: string
  email: string
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

export default function Sidebar() {
  const { t } = useTranslation()
  const [user, setUser] = useState<UserPayload | null>(null)

  useEffect(() => {
    setUser(getUserFromToken())
  }, [])

  return (
    <div className="dashboard">
      <aside className="sidebar">

        <div className="sidebar-profile">
          <div className="avatar">
            <FaUser />
          </div>
          <span>{user?.fullName || t('user')}</span>
        </div>

        <nav>
          <NavLink end to="/dashboard" className="nav-item">
            <FaChartBar />
            <span>{t('dashboard')}</span>
          </NavLink>

          <NavLink to="/dashboard/settings" className="nav-item">
            <FaCog />
            <span>{t('settings')}</span>
          </NavLink>

        </nav>

      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
