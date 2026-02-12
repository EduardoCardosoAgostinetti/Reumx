import '../styles/forgot-password.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ForgotPassword() {
  return (
    <>
      <Navbar />

      <main className="forgot-container">
        <div className="forgot-page">
          <div className="forgot-card">
            <div className="forgot-left">
              <h2>Forgot Password</h2>

              <p className="description">
                Enter your email address and we’ll send you a link
                to reset your password.
              </p>

              <form>
                <input
                  type="email"
                  placeholder="Email"
                />

                <button className="btn-signin">
                  SEND RESET LINK
                </button>
              </form>

              <a href="/signin" className="back-link">
                Back to Sign In
              </a>
            </div>

            <div className="forgot-right">
              <h2>Need Help?</h2>
              <p>
                Don’t worry. Password recovery is quick and secure.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
