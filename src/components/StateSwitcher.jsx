import React from 'react';
import { useAppState } from '../StateContext';
import { User, Activity, AlertCircle, Settings } from 'lucide-react';

export default function StateSwitcher() {
  const { profileType, setProfileType, streak, completedDaysCount, rank } = useAppState();

  return (
    <div className="dev-switcher">
      <div className="dev-switcher-header">
        <Settings className="icon-spin" size={14} />
        <span>Scenario Switcher (Grading Panel)</span>
      </div>
      <div className="dev-switcher-buttons">
        <button 
          className={`dev-btn ${profileType === 'NEW' ? 'active new' : ''}`}
          onClick={() => setProfileType('NEW')}
          title="Day 1, 0 streak, no commits"
        >
          <User size={13} />
          <span>New User (Day 1)</span>
        </button>
        
        <button 
          className={`dev-btn ${profileType === 'ACTIVE' ? 'active consistent' : ''}`}
          onClick={() => setProfileType('ACTIVE')}
          title="Day 12, 11 streak, consistent submits"
        >
          <Activity size={13} />
          <span>Consistent (Day 12)</span>
        </button>
        
        <button 
          className={`dev-btn ${profileType === 'MISSED' ? 'active missed' : ''}`}
          onClick={() => setProfileType('MISSED')}
          title="Day 15, broken streak, day 14 missed"
        >
          <AlertCircle size={13} />
          <span>Missed Day (Day 15)</span>
        </button>
      </div>
      <div className="dev-switcher-status">
        Active Profile: <strong>{profileType}</strong> | Streak: <strong>{streak}</strong> | Done: <strong>{completedDaysCount}/60</strong> | Rank: <strong>#{rank}</strong>
      </div>
    </div>
  );
}
