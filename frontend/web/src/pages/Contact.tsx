import '../styles/contact.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="contact-container">
        <div className="contact-card">
          <h2>Contact Us</h2>

          <form className="contact-form">
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Your message"></textarea>

            <button type="submit" className="btn-contact">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}
