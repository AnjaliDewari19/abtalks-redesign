import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../StateContext';
import { Flame, Award, Trophy, ArrowRight, AlertTriangle, Play, CheckCircle2, Star, Calendar, Sun, Moon } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    profileType, 
    streak, 
    completedDaysCount, 
    xp, 
    rank, 
    missedDays, 
    activeDayId, 
    repairedDays, 
    submissions, 
    tasks,
    theme,
    toggleTheme
  } = useAppState();

  const activeTask = tasks[activeDayId - 1];

  // Helper to get grid status for each day (1 to 60)
  const getDayStatus = (dayNum) => {
    if (submissions[dayNum]) {
      return submissions[dayNum].isRepaired ? 'repaired' : 'completed';
    }
    if (missedDays.includes(dayNum)) {
      return 'missed';
    }
    if (dayNum === activeDayId) {
      return 'active';
    }
    if (dayNum > activeDayId) {
      return 'locked';
    }
    return 'missed'; // Default for unpaid or uncompleted past days
  };

  // Generate dynamic banner content based on state
  const renderStatusBanner = () => {
    if (profileType === 'NEW') {
      return (
        <div className="status-banner new-user-banner">
          <div className="banner-details">
            <h4>Welcome to the Arena! 👋</h4>
            <p>Your 60-day sprint begins today. Lock in your consistency and prove your work daily.</p>
          </div>
          <button className="btn-banner" onClick={() => navigate(`/day/${activeDayId}`)}>
            Unlock Day 1 Task <ArrowRight size={14} />
          </button>
        </div>
      );
    }
    if (profileType === 'MISSED' && missedDays.length > 0) {
      const firstMissedDay = missedDays[0];
      return (
        <div className="status-banner missed-day-banner">
          <div className="banner-icon">
            <AlertTriangle className="icon-pulse warning" size={24} />
          </div>
          <div className="banner-details">
            <h4>Streak Broken! 💔</h4>
            <p>You missed Day {firstMissedDay}. Don't quit now! Complete a Streak Repair task to recover your streak.</p>
          </div>
          <button className="btn-banner btn-warning" onClick={() => navigate(`/day/${activeDayId}`)}>
            Repair Day {firstMissedDay} <ArrowRight size={14} />
          </button>
        </div>
      );
    }
    return (
      <div className="status-banner active-banner">
        <div className="banner-details">
          <h4>Streak Active! 🔥</h4>
          <p>You are in the top 5% of this cohort. Keep pushing commits and building in public.</p>
        </div>
        <button className="btn-banner" onClick={() => navigate(`/day/${activeDayId}`)}>
          Go to Day {activeDayId} Task <ArrowRight size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <header className="dashboard-header">
        <div className="logo-section" onClick={() => navigate('/')}>
          <span className="logo-ab">AB</span>
          <span className="logo-talks">Talks</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-secondary" onClick={toggleTheme} style={{ padding: '8px 12px' }} title="Toggle Day/Night Mode">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <div className="student-profile-summary">
            <div className="profile-details">
              <span className="student-name">Student Coder</span>
              <span className="student-track">Full-Stack Web Dev</span>
            </div>
            <div className="profile-avatar">SC</div>
          </div>
        </div>
      </header>

      {/* Main Stats Block */}
      <section className="stats-row">
        <div className="stat-box main-streak">
          <div className="stat-content">
            <span className="stat-label">Current Streak</span>
            <span className="stat-value streak-value">
              <Flame className={`streak-fire ${streak > 0 ? 'fire-active' : 'fire-inactive'}`} size={32} />
              {streak} Days
            </span>
            <p className="stat-desc">
              {streak === 0 ? 'Missed yesterday! Break the curse.' : `${streak} consecutive days of proof of work.`}
            </p>
          </div>
        </div>
        
        <div className="stat-box xp-rank">
          <div className="stat-split">
            <div className="split-item">
              <span className="stat-label">Total Experience</span>
              <span className="stat-value">{xp} XP</span>
            </div>
            <div className="split-item border-l">
              <span className="stat-label">Cohort Standing</span>
              <span className="stat-value">#{rank}</span>
            </div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-labels">
              <span>Overall Progress</span>
              <span>{Math.round((completedDaysCount / 60) * 100)}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(completedDaysCount / 60) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Action Banner */}
      {renderStatusBanner()}

      {/* Main Grid & Task Details */}
      <div className="dashboard-grid">
        {/* Left Side: Today's Task & Contribution Map */}
        <div className="grid-left">
          {/* Today's Task Card */}
          <div className="task-preview-card">
            <div className="card-header">
              <span className="badge-day">DAY {activeDayId}</span>
              <span className={`badge-difficulty ${activeTask?.difficulty.toLowerCase()}`}>
                {activeTask?.difficulty}
              </span>
            </div>
            <h3>{activeTask?.title}</h3>
            <p className="task-desc">{activeTask?.description}</p>
            <div className="task-actions">
              <button className="btn-primary" onClick={() => navigate(`/day/${activeDayId}`)}>
                <Play size={14} /> Open Challenge Workspace
              </button>
            </div>
          </div>

          {/* 60-Day Progress Grid */}
          <div className="contribution-grid-card">
            <div className="grid-header">
              <Calendar size={18} />
              <h3>Your 60-Day Challenge Map</h3>
            </div>
            <div className="grid-legend">
              <div className="legend-item"><span className="sq-completed"></span> Completed</div>
              <div className="legend-item"><span className="sq-repaired"></span> Repaired</div>
              <div className="legend-item"><span className="sq-active"></span> Active</div>
              <div className="legend-item"><span className="sq-missed"></span> Missed</div>
              <div className="legend-item"><span className="sq-locked"></span> Locked</div>
            </div>
            
            <div className="days-grid">
              {Array.from({ length: 60 }, (_, idx) => {
                const dayNum = idx + 1;
                const status = getDayStatus(dayNum);
                return (
                  <div 
                    key={dayNum} 
                    className={`grid-square ${status}`} 
                    title={`Day ${dayNum}: ${status.toUpperCase()}`}
                    onClick={() => {
                      if (status !== 'locked') {
                        navigate(`/day/${dayNum}`);
                      }
                    }}
                  >
                    <span className="square-num">{dayNum}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Standings & Badges */}
        <div className="grid-right">
          {/* Standings/Leaderboard */}
          <div className="leaderboard-card">
            <div className="card-title">
              <Trophy size={18} />
              <h3>Leaderboard Rankings</h3>
            </div>
            <div className="leaderboard-list">
              <div className="leaderboard-item">
                <span className="rank-num">1</span>
                <span className="rank-avatar">VK</span>
                <div className="rank-info">
                  <span className="rank-name">Vikram Kumar</span>
                  <span className="rank-streak">🔥 45 days</span>
                </div>
                <span className="rank-xp">4,500 XP</span>
              </div>
              <div className="leaderboard-item">
                <span className="rank-num">2</span>
                <span className="rank-avatar">AR</span>
                <div className="rank-info">
                  <span className="rank-name">Anjali Rao</span>
                  <span className="rank-streak">🔥 38 days</span>
                </div>
                <span className="rank-xp">3,800 XP</span>
              </div>
              <div className="leaderboard-item current-user">
                <span className="rank-num">{rank}</span>
                <span className="rank-avatar">SC</span>
                <div className="rank-info">
                  <span className="rank-name">You (Student)</span>
                  <span className="rank-streak">🔥 {streak} days</span>
                </div>
                <span className="rank-xp">{xp} XP</span>
              </div>
              <div className="leaderboard-item">
                <span className="rank-num">{rank + 1}</span>
                <span className="rank-avatar">RT</span>
                <div className="rank-info">
                  <span className="rank-name">Rohit Tiwari</span>
                  <span className="rank-streak">🔥 {Math.max(0, streak - 1)} days</span>
                </div>
                <span className="rank-xp">{Math.max(0, xp - 100)} XP</span>
              </div>
            </div>
          </div>

          {/* Badges/Achievements */}
          <div className="badges-card">
            <div className="card-title">
              <Award size={18} />
              <h3>Achievements & Badges</h3>
            </div>
            <div className="badges-grid">
              <div className={`badge-item ${completedDaysCount >= 1 ? 'unlocked' : 'locked'}`}>
                <Star className="badge-icon" size={20} />
                <span>First Commit</span>
                <p className="badge-detail">Completed Day 1 challenge</p>
              </div>
              <div className={`badge-item ${streak >= 5 ? 'unlocked' : 'locked'}`}>
                <Flame className="badge-icon" size={20} />
                <span>Consistency Rookie</span>
                <p className="badge-detail">Maintained a 5-day streak</p>
              </div>
              <div className={`badge-item ${streak >= 10 ? 'unlocked' : 'locked'}`}>
                <Trophy className="badge-icon" size={20} />
                <span>Streak Master</span>
                <p className="badge-detail">Maintained a 10-day streak</p>
              </div>
              <div className={`badge-item ${repairedDays.length > 0 ? 'unlocked' : 'locked'}`}>
                <CheckCircle2 className="badge-icon" size={20} />
                <span>Phoenix Risen</span>
                <p className="badge-detail">Repaired a broken streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
