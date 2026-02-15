import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alerts';
import Loading from '../components/Loading';

import { signUp } from '../services/signup';
import type { SignUpPayload } from '../services/signup';
import type { AlertType } from '../components/Alerts';

import axios from 'axios';

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState<SignUpPayload>({
    fullName: '',
    email: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setAlertType('warning');
      setAlertMessage(t('passwordsMismatch'));
      setAlertOpen(true);
      return;
    }

    if (!acceptedTerms) {
      setAlertType('warning');
      setAlertMessage(t('mustAcceptTerms'));
      setAlertOpen(true);
      return;
    }

    try {
      setLoading(true);

      const payload: SignUpPayload = {
        ...form,
        birthdate: form.birthdate, // YYYY-MM-DD
      };

      await signUp(payload);

      setAlertType('success');
      setAlertMessage(t('accountCreated'));
      setAlertOpen(true);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlertType('error');
        setAlertMessage(
          err.response?.data?.message || t('errorCreatingAccount')
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

      <main className="page-container">
        <div className="signup-page">
          <div className="signup-card">

            <form className="signup-left" onSubmit={handleSubmit}>
              <h2>{t('createAccount')}</h2>

              <input
                type="text"
                name="fullName"
                placeholder={t('fullName')}
                value={form.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder={t('email')}
                value={form.email}
                onChange={handleChange}
                required
              />

              <div className="date-field">
                <label>{t('birthdate')}</label>
                <input
                  type="date"
                  name="birthdate"
                  value={form.birthdate}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="password"
                name="password"
                placeholder={t('password')}
                value={form.password}
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

              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label htmlFor="terms">
                  {t('terms')}
                </label>
              </div>

              <button className="btn-signin" disabled={loading}>
                {loading ? t('creating') : t('signUpBtn')}
              </button>
            </form>

            <div className="signup-right">
              <h2>{t('welcomeBack')}</h2>
              <p>{t('alreadyAccount')}</p>
              <button
                className="btn-signup"
                onClick={() => navigate('/signin')}
              >
                {t('signInBtn')}
              </button>
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
