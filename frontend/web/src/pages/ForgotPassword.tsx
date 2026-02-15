import '../styles/forgot-password.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alerts';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { forgotPassword } from '../services/forgot-password';
import type { AlertType } from '../components/Alerts';
import axios from 'axios';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [alertMessage, setAlertMessage] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setAlertType('warning');
      setAlertMessage(t('pleaseEnterEmail'));
      setAlertOpen(true);
      return;
    }

    try {
      setLoading(true);
      await forgotPassword({ email });

      setAlertType('success');
      setAlertMessage(t('resetLinkSent'));
      setAlertOpen(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlertType('error');
        setAlertMessage(err.response?.data?.message || t('failedSendResetLink'));
      } else {
        setAlertType('error');
        setAlertMessage(t('unexpectedError'));
      }
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  }

  function handleCloseAlert() {
    setAlertOpen(false);
    if (alertType === 'success') {
      navigate('/signin');
    }
  }

  return (
    <>
      <Navbar />

      <main className="forgot-container">
        <div className="forgot-page">
          <div className="forgot-card">

            <div className="forgot-left">
              <h2>{t('forgotPassword')}</h2>

              <p className="description">
                {t('enterEmailDescription')}
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder={t('email')}
                  value={email}
                  onChange={handleChange}
                  required
                />

                <button className="btn-signin" disabled={loading}>
                  {loading ? t('sending') : t('sendResetLink')}
                </button>
              </form>

              <Link to="/signin" className="back-link">
                {t('backToSignIn')}
              </Link>
            </div>

            <div className="forgot-right">
              <h2>{t('needHelp')}</h2>
              <p>{t('passwordRecoveryInfo')}</p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <Loading open={loading} />
      <Alert
        open={alertOpen}
        type={alertType}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </>
  );
}
