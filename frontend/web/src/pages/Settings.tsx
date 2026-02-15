import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useTheme } from '../components/ThemeContext'
import Alert from '../components/Alerts'
import Loading from '../components/Loading'
import type { AlertType } from '../components/Alerts'
import { useTranslation } from 'react-i18next'

import {
  FaMoon,
  FaSun,
  FaLanguage,
  FaUserEdit,
  FaSignOutAlt,
  FaEdit,
  FaCheck,
  FaLock,
} from 'react-icons/fa'

import { updateFullName, updateEmail, updatePassword } from '../services/settings'
import '../styles/settings.css'

interface UserPayload {
  id: string
  fullName: string
  email: string
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

export default function Settings() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t, i18n } = useTranslation()

  /* ---------- USER ---------- */
  const [userId, setUserId] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const [editName, setEditName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)

  /* ---------- PASSWORD ---------- */
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [editPassword, setEditPassword] = useState(false)

  /* ---------- LANGUAGE ---------- */
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt')

  const languages = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'pl', label: 'Polski' },
    { code: 'ru', label: 'Русский' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'zh', label: '中文' },
    { code: 'ar', label: 'العربية' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'hi', label: 'हिन्दी' },
  ]

  /* ---------- UI ---------- */
  const [loading, setLoading] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertType, setAlertType] = useState<AlertType>('success')
  const [alertMessage, setAlertMessage] = useState('')

  /* ---------- LOAD USER ---------- */
  useEffect(() => {
    const user = getUserFromToken()
    if (user) {
      setUserId(user.id)
      setFullName(user.fullName)
      setEmail(user.email)
    }
  }, [])

  /* ================= HANDLERS ================= */

  const handleSaveFullName = async () => {
    if (!fullName) {
      setAlertType('warning')
      setAlertMessage(t('warningRequired'))
      setAlertOpen(true)
      return
    }

    try {
      setLoading(true)
      const response = await updateFullName({ userId, fullName })
      localStorage.setItem('token', response.data.data.token)
      setAlertType('success')
      setAlertMessage(t('successUpdate'))
      setEditName(false)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlertType('error')
        setAlertMessage(err.response?.data?.message || t('errorUpdate'))
      } else {
        setAlertType('error')
        setAlertMessage(t('errorUpdate'))
      }
    } finally {
      setAlertOpen(true)
      setLoading(false)
    }
  }

  const handleSaveEmail = async () => {
    if (!email) {
      setAlertType('warning')
      setAlertMessage(t('warningRequired'))
      setAlertOpen(true)
      return
    }

    try {
      setLoading(true)
      const response = await updateEmail({ userId, newEmail: email })
      localStorage.setItem('token', response.data.data.token)
      setAlertType('success')
      setAlertMessage(t('successUpdate'))
      setEditEmail(false)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlertType('error')
        setAlertMessage(err.response?.data?.message || t('errorUpdate'))
      } else {
        setAlertType('error')
        setAlertMessage(t('errorUpdate'))
      }
    } finally {
      setAlertOpen(true)
      setLoading(false)
    }
  }

  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setAlertType('warning')
      setAlertMessage(t('warningRequired'))
      setAlertOpen(true)
      return
    }

    try {
      setLoading(true)
      const response = await updatePassword({ userId, currentPassword, newPassword, confirmPassword })
      localStorage.setItem('token', response.data.data.token)
      setAlertType('success')
      setAlertMessage(t('successUpdate'))
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setEditPassword(false)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlertType('error')
        setAlertMessage(err.response?.data?.message || t('errorUpdate'))
      } else {
        setAlertType('error')
        setAlertMessage(t('errorUpdate'))
      }
    } finally {
      setAlertOpen(true)
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  /* ================= RENDER ================= */
  return (
    <>
      <main>
        <div className="settings-page">

          <h1>{t('settings')}</h1>

          {/* THEME */}
          <section className="settings-card">
            <h2><FaMoon /> {t('theme')}</h2>

            <div className="toggle">
              <button
                className={theme === 'light' ? 'active' : ''}
                onClick={() => toggleTheme('light')}
              >
                <FaSun /> {t('light')}
              </button>

              <button
                className={theme === 'dark' ? 'active' : ''}
                onClick={() => toggleTheme('dark')}
              >
                <FaMoon /> {t('dark')}
              </button>
            </div>
          </section>

          {/* LANGUAGE */}
          <section className="settings-card center">
            <h2><FaLanguage /> {t('language')}</h2>
            <select
              className="language-select"
              value={language}
              onChange={(e) => {
                const lang = e.target.value
                setLanguage(lang)
                localStorage.setItem('language', lang)
                i18n.changeLanguage(lang)
              }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </section>

          {/* PROFILE */}
          <section className="settings-card">
            <h2><FaUserEdit /> {t('profile')}</h2>

            <div className="profile-row">
              <input
                value={fullName}
                disabled={!editName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('fullName')}
              />
              <button onClick={() => editName ? handleSaveFullName() : setEditName(true)}>
                {editName ? <FaCheck /> : <FaEdit />}
              </button>
            </div>

            <div className="profile-row">
              <input
                value={email}
                disabled={!editEmail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email')}
              />
              <button onClick={() => editEmail ? handleSaveEmail() : setEditEmail(true)}>
                {editEmail ? <FaCheck /> : <FaEdit />}
              </button>
            </div>
          </section>

          {/* PASSWORD */}
          <section className="settings-card">
            <h2><FaLock /> {t('password')}</h2>

            <div className="profile-row">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={!editPassword}
                placeholder={t('currentPassword')}
              />
            </div>
            <div className="profile-row">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!editPassword}
                placeholder={t('newPassword')}
              />
            </div>
            <div className="profile-row">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={!editPassword}
                placeholder={t('confirmPassword')}
              />
            </div>

            <button
              className="save-password-btn"
              onClick={() => editPassword ? handleSavePassword() : setEditPassword(true)}
            >
              {editPassword ? <FaCheck /> : <FaEdit />}
            </button>
          </section>

          {/* LOGOUT */}
          <section className="settings-card danger">
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> {t('logout')}
            </button>
          </section>

        </div>
      </main>

      <Loading open={loading} />
      <Alert open={alertOpen} type={alertType} message={alertMessage} onClose={() => setAlertOpen(false)} />
    </>
  )
}
