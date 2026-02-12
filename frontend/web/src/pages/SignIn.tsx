import '../styles/signin.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="signin-page">
        <div className="signin-card">

          <div className="signin-left">
            <h2>Sign In</h2>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <a href="/forgot-password" className="forgot">Forgot your password?</a>

            <button className="btn-signin">SIGN IN</button>
          </div>

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
    </>
  )
}
