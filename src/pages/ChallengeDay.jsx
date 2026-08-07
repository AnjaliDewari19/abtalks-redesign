import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppState } from '../StateContext';
import { ArrowLeft, Check, Code, Copy, RefreshCw, Flame, ExternalLink, HelpCircle, Lock, Sun, Moon } from 'lucide-react';
import { LinkedinIcon } from '../components/BrandIcons';
import confetti from 'canvas-confetti';

export default function ChallengeDay() {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const { tasks, submissions, submitProof, activeDayId, missedDays, repairStreak, streak, theme, toggleTheme } = useAppState();

  const currentDayNum = parseInt(dayId, 10);
  const task = tasks[currentDayNum - 1];

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!task) {
    return (
      <div className="error-container">
        <h2>Day not found</h2>
        <button className="btn-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const isSubmitted = !!submissions[currentDayNum];
  const isMissed = missedDays.includes(currentDayNum);
  const isLocked = currentDayNum > activeDayId;

  // LinkedIn template generator
  const getLinkedInTemplate = () => {
    return `Day ${currentDayNum} of #60DaysOfCode with @ABTalks! 🚀\n\nToday, I successfully completed: "${task.title}".\n\nKey accomplishments:\n• Engineered code for the challenge using modern best practices.\n• Handled responsiveness and layout components.\n• Verified and built the features under 390px mobile viewports.\n\nCheck out my commit proof of work:\n🔗 ${githubUrl || '[Your GitHub Commit Link]'}\n\n#buildinginpublic #webdev #engineering #consistency #indianstudents`;
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(getLinkedInTemplate());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Quick validations
    if (!githubUrl.includes('github.com')) {
      setError('Please provide a valid GitHub URL (containing github.com)');
      return;
    }
    if (!linkedinUrl.includes('linkedin.com')) {
      setError('Please provide a valid LinkedIn URL (containing linkedin.com)');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      submitProof(currentDayNum, githubUrl, linkedinUrl);
      setSubmitting(false);

      // Trigger Confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 800);
  };

  const handleRepair = () => {
    repairStreak(currentDayNum);
    confetti({
      particleCount: 150,
      spread: 90,
      colors: ['#ffd700', '#ff8c00', '#ff4500'],
      origin: { y: 0.5 }
    });
  };

  if (isLocked) {
    return (
      <div className="day-detail-container locked-day-screen">
        <header className="day-header" style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={16} /> Dashboard
          </button>
          <button className="btn-secondary" onClick={toggleTheme} style={{ padding: '6px 12px', borderRadius: '20px' }} title="Toggle Day/Night Mode">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </header>
        <div className="locked-card">
          <Lock size={48} className="lock-icon" />
          <h2>Day {currentDayNum} is Locked</h2>
          <p>You must complete your current pending challenges before unlocking future days. Keep your streak going!</p>
          <button className="btn-primary" onClick={() => navigate(`/day/${activeDayId}`)}>
            Go to Day {activeDayId} Task
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="day-detail-container">
      {/* Top Header */}
      <header className="day-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} /> Dashboard
        </button>
        <div className="day-title-block">
          <span className="badge-day">DAY {currentDayNum} OF 60</span>
          <h2>{task.title}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-secondary" onClick={toggleTheme} style={{ padding: '6px 10px', borderRadius: '20px' }} title="Toggle Day/Night Mode">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <div className="day-streak-badge">
            <Flame size={16} className={streak > 0 ? 'text-orange' : 'text-gray'} />
            <span>{streak}d Streak</span>
          </div>
        </div>
      </header>

      {/* Main split grid */}
      <div className="day-grid">
        {/* Left Side: Tasks instructions */}
        <div className="day-instructions">
          <div className="instruction-card">
            <div className="card-header-meta">
              <span className={`badge-difficulty ${task.difficulty.toLowerCase()}`}>
                {task.difficulty}
              </span>
              <span className="badge-xp">+{task.xp} XP</span>
            </div>
            <h3>Challenge Assignment</h3>
            <p className="task-long-desc">{task.description}</p>
            
            <div className="learning-objectives">
              <h4>🎯 What you will learn today:</h4>
              <ul>
                <li>Structuring scalable components and layout hooks.</li>
                <li>Handling viewport bounds and interactive states on 390px screens.</li>
                <li>Pushing version-controlled commits to public repositories.</li>
              </ul>
            </div>

            <div className="help-box">
              <HelpCircle size={16} />
              <div>
                <h5>Stuck on this challenge?</h5>
                <p>Discuss in the Discord community or review the curated references in your workspace config.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Submissions Arena */}
        <div className="day-submission-panel">
          {/* Missed Day Streak Repair card */}
          {isMissed && (
            <div className="repair-card-prompt">
              <Flame className="icon-burn" size={28} />
              <div>
                <h4>Streak Repair Active!</h4>
                <p>This day was missed, resetting your streak. Submit a catch-up task to restore your streak immediately.</p>
                <button className="btn-warning w-full" onClick={handleRepair}>
                  <RefreshCw size={14} /> Restore Streak to Day {currentDayNum}
                </button>
              </div>
            </div>
          )}

          {/* Submission State Card */}
          <div className="submission-card">
            <h3>Proof of Work Submission</h3>
            {isSubmitted ? (
              <div className="success-state">
                <div className="success-icon-circle animate-pop">
                  <Check size={28} />
                </div>
                <h4>Task Submitted Successfully!</h4>
                <p>Your streak is active and your proof of work has been logged.</p>
                
                <div className="submitted-links">
                  <a href={submissions[currentDayNum].github} target="_blank" rel="noreferrer" className="submitted-link-item">
                    <Code size={14} /> View GitHub Commit <ExternalLink size={12} />
                  </a>
                  <a href={submissions[currentDayNum].linkedin} target="_blank" rel="noreferrer" className="submitted-link-item">
                    <LinkedinIcon size={14} /> View LinkedIn Post <ExternalLink size={12} />
                  </a>
                </div>
                
                <button className="btn-secondary w-full" onClick={() => navigate('/dashboard')}>
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="submission-form">
                {error && <div className="error-banner-form">{error}</div>}
                
                <div className="input-group">
                  <label htmlFor="githubUrl">
                    <Code size={14} /> GitHub Repository or Commit Link
                  </label>
                  <input
                    type="url"
                    id="githubUrl"
                    placeholder="https://github.com/username/repo/commit/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    required
                  />
                  <span className="input-tip">Must be a public commit/repository link.</span>
                </div>

                <div className="input-group">
                  <label htmlFor="linkedinUrl">
                    <LinkedinIcon size={14} /> LinkedIn Post Link
                  </label>
                  <input
                    type="url"
                    id="linkedinUrl"
                    placeholder="https://linkedin.com/posts/..."
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    required
                  />
                  <span className="input-tip">Link to your public learning post.</span>
                </div>

                <button type="submit" className="btn-primary w-full" disabled={submitting}>
                  {submitting ? 'Verifying Links...' : 'Submit Proof & Log Streak'}
                </button>
              </form>
            )}
          </div>

          {/* LinkedIn Copilot */}
          {!isSubmitted && (
            <div className="copilot-card">
              <div className="copilot-header">
                <LinkedinIcon size={18} className="copilot-brand-icon" />
                <div>
                  <h4>LinkedIn Copilot Draft</h4>
                  <p>We drafted your build-in-public summary post. Edit and copy it!</p>
                </div>
              </div>
              <textarea 
                className="copilot-textarea" 
                value={getLinkedInTemplate()}
                readOnly
              />
              <button className="btn-copilot-copy" onClick={handleCopyTemplate}>
                <Copy size={13} /> {copied ? 'Copied to Clipboard!' : 'Copy Post Draft'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
