import '../styles/contact.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alerts';
import Loading from '../components/Loading';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { sendContactMessage } from '../services/contact';
import type { AlertType } from '../components/Alerts';

import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // ALERT STATE
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [alertMessage, setAlertMessage] = useState('');

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.message) {
      setAlertType('warning');
      setAlertMessage('All fields are required.');
      setAlertOpen(true);
      return;
    }

    try {
      setLoading(true);

      await sendContactMessage(form);

      setAlertType('success');
      setAlertMessage('Your message has been sent successfully!');
      setAlertOpen(true);

      // limpa formulário
      setForm({
        fullName: '',
        email: '',
        message: '',
      });

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlertType('error');
        setAlertMessage(
          err.response?.data?.message || 'Failed to send message'
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
  }

  return (
    <>
      <Navbar />

      <main className="contact-container">
        <div className="contact-card">
          <h2>Contact Us</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
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

            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button className="btn-contact" disabled={loading}>
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
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
