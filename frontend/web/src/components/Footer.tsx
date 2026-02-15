import '../styles/foooter.css'
import { Link } from 'react-router-dom'
import { FaInfoCircle, FaQuestionCircle } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer__container">

        <nav className="footer__nav">
          <Link to="/">
            <FaInfoCircle />
            <span>{t('about_us')}</span>
          </Link>

          <Link to="/contact">
            <FaQuestionCircle />
            <span>{t('help')}</span>
          </Link>
        </nav>

        <hr className="footer__divider" />

        <p className="footer__text">
          {t('footer_description')}
        </p>

      </div>

      <div className="footer__bottom">
        {t('copyright')}
      </div>
    </footer>
  )
}
