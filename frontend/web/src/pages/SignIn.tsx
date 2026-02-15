import '../styles/signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alerts';
import Loading from '../components/Loading';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { signIn } from '../services/signin';
import type { SignInPayload } from '../services/signin';
import type { AlertType } from '../components/Alerts';

import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState<SignInPayload>({
    email: '',
    password: '',
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

    // WARNING
    if (!form.email || !form.password) {
      setAlertType('warning');
      setAlertMessage(t('emailPasswordRequired'));
      setAlertOpen(true);
      return;
    }

    try {
      setLoading(true);

      const response = await signIn(form);

      // 🔐 salvar token
      localStorage.setItem('token', response.data.data.token);

      if (response.data.success) {
        navigate('/dashboard');
      }

    } catch (err: unknown) {
      // ERROR
      if (axios.isAxiosError(err)) {
        setAlertType('error');
        setAlertMessage(
          err.response?.data?.message || t('invalidCredentials')
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
  }

  return (
    <>
      <Navbar />

      <div className="signin-page">
        <div className="signin-card">

          <form className="signin-left" onSubmit={handleSubmit}>
            <h2>{t('signInTitle')}</h2>

            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder={t('password')}
              value={form.password}
              onChange={handleChange}
            />

            <Link to="/forgot-password" className="forgot">
              {t('forgotPassword')}
            </Link>

            <button className="btn-signin" disabled={loading}>
              {t('signInBtn')}
            </button>
          </form>

          <div className="signin-right">
            <h2>{t('helloUser')}</h2>
            <p>{t('registerDescription')}</p>
            <button
              className="btn-signup"
              onClick={() => navigate('/signup')}
            >
              {t('signUpBtn')}
            </button>
          </div>

        </div>
      </div>

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
