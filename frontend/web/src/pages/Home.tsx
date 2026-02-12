import '../styles/home.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        {/* HERO */}
        <section className="home-hero">
          <h1>Compete. Evolve. Conquer.</h1>
          <p>
            Performance determines the winner.
            A continuous challenge based on merit, consistency, and improvement.
          </p>

          <div className="hero-actions">
            <a href="/signup" className="btn-primary">Get Started</a>
            <a href="/signin" className="btn-secondary">Sign In</a>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="home-section">
          <h2>How the Challenge Works</h2>

          <div className="cards">
            <div className="card">
              <h3>🏆 Performance-Based</h3>
              <p>
                Participants earn points over time by completing activities
                and challenges inside the platform.
              </p>
            </div>

            <div className="card">
              <h3>📈 Progressive Reward</h3>
              <p>
                The prize pool grows continuously until it reaches the defined goal.
                No randomness. No shortcuts.
              </p>
            </div>

            <div className="card">
              <h3>📊 Public Ranking</h3>
              <p>
                Full transparency with a public leaderboard showing who is leading
                based on total score.
              </p>
            </div>
          </div>
        </section>

        {/* MERIT */}
        <section className="home-highlight">
          <h2>Merit Over Luck</h2>
          <p>
            There are no lotteries or random draws.
            When the prize goal is reached, the top-ranked participant
            is declared the winner and receives the reward according
            to the challenge rules.
          </p>
        </section>

        {/* TARGET */}
        <section className="home-section">
          <h2>Who Is This App For?</h2>

          <div className="cards">
            <div className="card">
              <h3>🔥 Long-Term Thinkers</h3>
              <p>
                Perfect for people who enjoy long-term challenges
                and continuous progress.
              </p>
            </div>

            <div className="card">
              <h3>⚔️ Healthy Competition</h3>
              <p>
                Compete fairly, track your evolution, and climb
                the ranking through dedication.
              </p>
            </div>

            <div className="card">
              <h3>🚀 Consistent Growth</h3>
              <p>
                Every action matters. Consistency is the key to winning.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
