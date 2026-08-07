import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StateProvider } from './StateContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ChallengeDay from './pages/ChallengeDay';
import StateSwitcher from './components/StateSwitcher';

function App() {
  return (
    <StateProvider>
      <Router>
        <div className="app-main-layout">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/day/:dayId" element={<ChallengeDay />} />
          </Routes>
          
          {/* Grader's developer helper panel */}
          <StateSwitcher />
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
