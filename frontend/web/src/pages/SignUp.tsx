import '../styles/signup.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Alert from '../components/Alerts'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { signUp } from '../services/signup'
import type { SignUpPayload } from '../services/signup'
import type { AlertType } from '../components/Alerts'

import axios from 'axios'

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignUpPayload>({
    fullName: '',
    email: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  // ALERT STATE
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
      setAlertMessage('Passwords do not match');
      setAlertOpen(true);
      return;
    }

    if (!acceptedTerms) {
      setAlertType('warning');
      setAlertMessage('You must agree to the Terms and Services');
      setAlertOpen(true);
      return;
    }

    try {
      setLoading(true);

      const payload: SignUpPayload = {
        ...form,
        birthdate: form.birthdate, // 🔥 já está YYYY-MM-DD
      };

      await signUp(payload);

      setAlertType('success');
      setAlertMessage('Account created successfully!');
      setAlertOpen(true);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlertType('error');
        setAlertMessage(
          err.response?.data?.message || 'Error creating account'
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
              <h2>Create Account</h2>

              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <div className="date-field">
                <label>Birthdate (Month - Day - Year)</label>
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
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
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
                  I agree to the <span>Terms and Services</span>
                </label>
              </div>


              <button className="btn-signin" disabled={loading}>
                {loading ? 'CREATING...' : 'SIGN UP'}
              </button>
            </form>

            <div className="signup-right">
              <h2>Welcome Back!</h2>
              <p>
                Already have an account?
                Sign in and continue your journey with us.
              </p>
              <button
                className="btn-signup"
                onClick={() => navigate('/signin')}
              >
                SIGN IN
              </button>
            </div>

          </div>
        </div>
      </main>

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
