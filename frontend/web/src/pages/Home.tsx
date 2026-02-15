import '../styles/home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />

      <main className="home">
        {/* HERO */}
        <section className="home-hero">
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroDescription')}</p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">{t('getStarted')}</Link>
            <Link to="/signin" className="btn-secondary">{t('signIn')}</Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="home-section">
          <h2>{t('howItWorksTitle')}</h2>

          <div className="cards">
            <div className="card">
              <h3>{t('performanceBased')}</h3>
              <p>{t('performanceDescription')}</p>
            </div>

            <div className="card">
              <h3>{t('progressiveReward')}</h3>
              <p>{t('progressiveRewardDescription')}</p>
            </div>

            <div className="card">
              <h3>{t('publicRanking')}</h3>
              <p>{t('publicRankingDescription')}</p>
            </div>
          </div>
        </section>

        {/* MERIT */}
        <section className="home-highlight">
          <h2>{t('meritOverLuckTitle')}</h2>
          <p>{t('meritOverLuckDescription')}</p>
        </section>

        {/* TARGET */}
        <section className="home-section">
          <h2>{t('targetTitle')}</h2>

          <div className="cards">
            <div className="card">
              <h3>{t('longTermThinkers')}</h3>
              <p>{t('longTermThinkersDescription')}</p>
            </div>

            <div className="card">
              <h3>{t('healthyCompetition')}</h3>
              <p>{t('healthyCompetitionDescription')}</p>
            </div>

            <div className="card">
              <h3>{t('consistentGrowth')}</h3>
              <p>{t('consistentGrowthDescription')}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
