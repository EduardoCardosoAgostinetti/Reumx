import '../styles/signup.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="signup-page">
          <div className="signup-card">

            <div className="signup-left">
              <h2>Create Account</h2>

              <input type="text" placeholder="Full name" />
              <input type="email" placeholder="Email" />
              <input type="date" placeholder="Birthday" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm password" />

              <button className="btn-signin">SIGN UP</button>
            </div>

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
    </>
  )
}
