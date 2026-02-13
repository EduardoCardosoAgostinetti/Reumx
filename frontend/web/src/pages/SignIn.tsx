import '../styles/signin.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Alert from '../components/Alerts'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { signIn } from '../services/signin'
import type { SignInPayload } from '../services/signin'
import type { AlertType } from '../components/Alerts'

import axios from 'axios'

export default function SignIn() {
  const navigate = useNavigate();

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
      setAlertMessage('Email and password are required');
      setAlertOpen(true);
      return;
    }

    try {
      setLoading(true);
      const response = await signIn(form);
      console.log(response);
      // 🔐 (opcional) salvar token
      localStorage.setItem('token', response.data.token);

      // SUCCESS
      setAlertType('success');
      setAlertMessage('Login successful!');
      setAlertOpen(true);

    } catch (err: unknown) {
      // ERROR
      if (axios.isAxiosError(err)) {
        setAlertType('error');
        setAlertMessage(
          err.response?.data?.message || 'Invalid credentials'
        );
      } else {
        setAlertType('error');
        setAlertMessage('Unexpected error');
      }
      setAlertOpen(true);

    } finally {
      setLoading(false);
    }
  }

  function handleCloseAlert() {
    setAlertOpen(false);

    if (alertType === 'success') {
      navigate('/dashboard');

    }
  }

  return (
    <>
      <Navbar />

      <div className="signin-page">
        <div className="signin-card">

          <form className="signin-left" onSubmit={handleSubmit}>
            <h2>Sign In</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <a href="/forgot-password" className="forgot">
              Forgot your password?
            </a>

            <button className="btn-signin" disabled={loading}>
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          <div className="signin-right">
            <h2>Hello, User!</h2>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button
              className="btn-signup"
              onClick={() => navigate('/signup')}
            >
              SIGN UP
            </button>
          </div>

        </div>
      </div>

      <Footer />

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
