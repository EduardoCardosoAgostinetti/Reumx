import '../styles/reset-password.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alerts';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { resetPassword } from '../services/reset-password';
import type { AlertType } from '../components/Alerts';

import axios from 'axios';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  // 🔑 token vindo da URL
  const token = searchParams.get('token');

  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  // ALERT STATE
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [alertMessage, setAlertMessage] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      setAlertType('error');
      setAlertMessage(t('invalidToken'));
      setAlertOpen(true);
      return;
    }

    if (!form.newPassword || !form.confirmPassword) {
      setAlertType('warning');
      setAlertMessage(t('allFieldsRequired'));
      setAlertOpen(true);
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setAlertType('warning');
      setAlertMessage(t('passwordsDoNotMatch'));
      setAlertOpen(true);
      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        token,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      setAlertType('success');
      setAlertMessage(t('passwordResetSuccess'));
      setAlertOpen(true);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlertType('error');
        setAlertMessage(
          err.response?.data?.message || t('resetPasswordError')
        );
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

      <main className="reset-password-container">
        <div className="reset-password-page">
          <div className="reset-password-card">

            <div className="reset-password-left">
              <h2>{t('resetPasswordTitle')}</h2>

              <p className="description">{t('resetPasswordDescription')}</p>

              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  name="newPassword"
                  placeholder={t('newPassword')}
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t('confirmPassword')}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button className="btn-signin" disabled={loading}>
                  {loading ? t('resetting') : t('resetPasswordBtn')}
                </button>
              </form>

              <Link to="/signin" className="back-link">
                {t('backToSignIn')}
              </Link>
            </div>

            <div className="reset-password-right">
              <h2>{t('almostThere')}</h2>
              <p>{t('securePasswordDescription')}</p>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* LOADING OVERLAY */}
      <Loading open={loading} />

      {/* ALERT OVERLAY */}
      <Alert
        open={alertOpen}
        type={alertType}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </>
  );
}
