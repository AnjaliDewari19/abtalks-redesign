import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../StateContext';
import { ArrowRight, Code, CheckCircle, Shield, Award, Users, ChevronRight, Zap, Sun, Moon } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useAppState();

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="logo-section" onClick={() => navigate('/')}>
          <span className="logo-ab">AB</span>
          <span className="logo-talks">Talks</span>
          <span className="badge-live">COHORT 6.0</span>
        </div>
        <nav className="nav-links">
          <button className="btn-secondary" onClick={toggleTheme} title="Toggle Day/Night Mode">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
            Join Challenge
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="alert-banner">
            <span className="alert-tag">New</span>
            <span className="alert-text">Admissions close in 2 days. 12,400+ students already registered.</span>
          </div>
          <h1>
            60 Days of Code.<br />
            <span className="gradient-text">60 Proofs of Work.</span><br />
            0 Excuses.
          </h1>
          <p className="hero-subtext">
            Build consistency, make learning public, and become visible to top-tier recruiters. Write code every day, submit commits, and share your journey.
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary btn-large" onClick={() => navigate('/dashboard')}>
              Start the Challenge <ArrowRight size={18} />
            </button>
            <a href="#how-it-works" className="btn-secondary btn-large">
              See How It Works
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <Users className="stat-icon" size={20} />
              <div>
                <h4>15,000+</h4>
                <p>Students Placed</p>
              </div>
            </div>
            <div className="stat-card">
              <Award className="stat-icon" size={20} />
              <div>
                <h4>60 Days</h4>
                <p>Non-Stop Building</p>
              </div>
            </div>
            <div className="stat-card">
              <Shield className="stat-icon" size={20} />
              <div>
                <h4>200+</h4>
                <p>Hiring Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Selection */}
      <section className="tracks-section">
        <div className="section-header text-center">
          <span className="section-label">CHOOSE YOUR PATH</span>
          <h2>Select a Track to Begin</h2>
          <p>Each track is designed by industry experts to take you from basics to production-ready engineering.</p>
        </div>
        <div className="tracks-grid">
          <div className="track-card active">
            <div className="track-badge">MOST POPULAR</div>
            <Code className="track-icon" size={24} />
            <h3>Full-Stack Web Dev</h3>
            <p>React, Node.js, databases, system design, and cloud deployments.</p>
            <ul className="track-features">
              <li><CheckCircle size={14} className="check-icon" /> 60 Daily Projects</li>
              <li><CheckCircle size={14} className="check-icon" /> GitHub Portfolio</li>
              <li><CheckCircle size={14} className="check-icon" /> Industry Mentors</li>
            </ul>
            <button className="btn-primary w-full" onClick={() => navigate('/dashboard')}>
              Choose Full-Stack
            </button>
          </div>

          <div className="track-card">
            <Zap className="track-icon" size={24} />
            <h3>AI & ML Engineering</h3>
            <p>Python, TensorFlow, LLMs, prompt engineering, and agent systems.</p>
            <ul className="track-features">
              <li><CheckCircle size={14} className="check-icon" /> 45 model setups</li>
              <li><CheckCircle size={14} className="check-icon" /> RAG & Fine-tuning</li>
              <li><CheckCircle size={14} className="check-icon" /> API Deployment</li>
            </ul>
            <button className="btn-secondary w-full" onClick={() => navigate('/dashboard')}>
              Choose AI Track
            </button>
          </div>

          <div className="track-card">
            <Code className="track-icon" size={24} />
            <h3>Backend & DevOps</h3>
            <p>Go, Docker, Kubernetes, microservices, scaling databases, and CI/CD.</p>
            <ul className="track-features">
              <li><CheckCircle size={14} className="check-icon" /> System Design focus</li>
              <li><CheckCircle size={14} className="check-icon" /> AWS & GCP Deployment</li>
              <li><CheckCircle size={14} className="check-icon" /> Distributed caching</li>
            </ul>
            <button className="btn-secondary w-full" onClick={() => navigate('/dashboard')}>
              Choose Backend
            </button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-header text-center">
          <span className="section-label">THE BLUEPRINT</span>
          <h2>A Daily Routine That Generates Career Results</h2>
          <p>Four simple steps repeated for 60 days to transform your engineering caliber.</p>
        </div>

        <div className="steps-container">
          <div className="step-row">
            <div className="step-number">01</div>
            <div className="step-info">
              <h3>Get the Daily Task</h3>
              <p>Every night at midnight, a new, real-world development task is unlocked. The difficulty scales incrementally as you advance.</p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-number">02</div>
            <div className="step-info">
              <h3>Write Code & Push to GitHub</h3>
              <p>Solve the challenge locally or in the cloud. Commit your code and push it to your public GitHub challenge repository as proof of work.</p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-number">03</div>
            <div className="step-info">
              <h3>Share What You Built on LinkedIn</h3>
              <p>Write a brief summary of what you learned and built today on LinkedIn. This builds your online presence and catches recruiter attention.</p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-number">04</div>
            <div className="step-info">
              <h3>Secure Your Streak & Get Placed</h3>
              <p>Submit both links on your ABTalks dashboard. Keep your streak burning! Complete the 60 days and gain direct access to hiring partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header text-center">
          <span className="section-label">SUCCESS STORIES</span>
          <h2>Built by Students, Trusted by Recruiters</h2>
          <p>Read how regular college students transformed their profiles and landed jobs.</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="quote">"I had a blank GitHub and 0 confidence. The 60-day challenge forced me to code late night after college. By Day 30, my Git was green, and a recruiter reached out on LinkedIn. Got placed at Razorpay!"</p>
            <div className="student-profile">
              <div className="avatar">AM</div>
              <div>
                <h5>Aman Malhotra</h5>
                <p>LPU student • Hired at Razorpay</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="quote">"Building in public was scary initially. But the daily LinkedIn templates from ABTalks made it easy. I built 60 projects, maintained my streak, and secured an off-campus remote role at a US startup."</p>
            <div className="student-profile">
              <div className="avatar">PN</div>
              <div>
                <h5>Pooja Nair</h5>
                <p>DY Patil College • Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-glow"></div>
        <h2>Ready to Change Your Coding Trajectory?</h2>
        <p>No fees. Just commitment. If you miss a day, your streak resets. Are you ready to commit?</p>
        <button className="btn-primary btn-large" onClick={() => navigate('/dashboard')}>
          Launch My Dashboard <ChevronRight size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 ABTalks challenge. Powered by consistency. Designed for developers.</p>
      </footer>
    </div>
  );
}
