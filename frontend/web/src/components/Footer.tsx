import '../styles/foooter.css'
import {
    FaInfoCircle,
    FaQuestionCircle,
} from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">

                <nav className="footer__nav">
                    <a href="/">
                        <FaInfoCircle />
                        <span>ABOUT US</span>
                    </a>

                    <a href="/contact">
                        <FaQuestionCircle />
                        <span>HELP</span>
                    </a>

                </nav>


                <hr className="footer__divider" />

                <p className="footer__text">
                    This application offers a continuous, performance-based challenge
                    where participants progress through measurable activities and rankings.
                    Results are determined solely by performance and consistency, with full
                    transparency and clear rules.
                </p>

            </div>

            <div className="footer__bottom">
                © 2026 Reumx. All rights reserved.
            </div>
        </footer>
    )
}


