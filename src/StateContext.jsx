import React, { createContext, useState, useContext, useEffect } from 'react';

const StateContext = createContext();

// Mock tasks definitions for the 60 Days Challenge
const CHALLENGE_TASKS = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  let title = `Building Features Day ${day}`;
  let difficulty = 'Medium';
  let xp = 100;
  let description = `Implement daily challenge for Day ${day}. Write clean code, add tests, and deploy.`;

  if (day === 1) {
    title = 'Git Setup & First Commit';
    difficulty = 'Easy';
    xp = 50;
    description = 'Initialize your public GitHub repository for the challenge, push a detailed README.md explaining your goal for the next 60 days, and share your first learning commitment on LinkedIn.';
  } else if (day === 2) {
    title = 'CSS Variables & Theme Tokens';
    difficulty = 'Easy';
    xp = 50;
    description = 'Design a scalable theme system using Vanilla CSS custom properties. Define colors, spacing, borders, shadows, and create a system that can switch between dark and light themes dynamically.';
  } else if (day === 3) {
    title = 'Responsive Hero Section';
    difficulty = 'Easy';
    xp = 80;
    description = 'Build a responsive hero banner optimized for mobile viewports (390px). Create high-impact headings, glassmorphic card overlays, modern typography, and a clear call-to-action button.';
  } else if (day === 4) {
    title = 'Modern Cards Grid';
    difficulty = 'Medium';
    xp = 100;
    description = 'Build a card component grid showcasing project metrics. Use CSS flexbox and grid layouts. Handle long-text edge cases (text truncation) and implement hover micro-animations.';
  } else if (day === 5) {
    title = 'Interactive Drawer Navigation';
    difficulty = 'Medium';
    xp = 100;
    description = 'Create a navigation bar that transitions into a slide-out drawer on mobile screens. Add a keyboard-accessible hamburger toggle button and smooth CSS animations.';
  } else if (day === 6) {
    title = 'Client-Side Form Validator';
    difficulty = 'Medium';
    xp = 100;
    description = 'Create a user registration form with live, accessible inline feedback. Validate email formats, password strength, and match criteria using vanilla JavaScript.';
  } else if (day === 7) {
    title = 'Dynamic SVG Streak Chart';
    difficulty = 'Hard';
    xp = 150;
    description = 'Code a beautiful progression line chart using raw HTML SVG elements. Make it responsive and animate the path drawing using CSS stroke-dashoffset transitions.';
  } else if (day === 8) {
    title = 'React State & Context Store';
    difficulty = 'Medium';
    xp = 100;
    description = 'Create a lightweight global state provider using React Context. Manage a cart or user settings store and synchronize data with localStorage.';
  } else if (day === 9) {
    title = 'Asynchronous API Fetcher';
    difficulty = 'Medium';
    xp = 100;
    description = 'Fetch weather or repository data from a public REST API. Implement clean loading states, graceful error handling, and a retry mechanism on failure.';
  } else if (day === 10) {
    title = 'Debounced Search Filter';
    difficulty = 'Medium';
    xp = 100;
    description = 'Build a search input component that filters a large list of items. Apply debounce logic to avoid firing an API call on every single keystroke.';
  } else if (day === 11) {
    title = 'Keyboard-Accessible Modal';
    difficulty = 'Hard';
    xp = 120;
    description = 'Implement a modal dialog using React Portals. Ensure it traps focus inside the modal, closes on pressing Escape, and returns focus to the trigger button when closed.';
  } else if (day === 12) {
    title = 'Drag & Drop Kanban Board';
    difficulty = 'Hard';
    xp = 200;
    description = 'Build a micro Kanban board with 3 columns (To Do, In Progress, Done). Allow tasks to be dragged and dropped between columns, persisting the new state.';
  } else if (day === 13) {
    title = 'Micro-Animations Showcase';
    difficulty = 'Easy';
    xp = 70;
    description = 'Design interactive UI micro-animations: springy button clicks, pulsing active indicators, and glowing hover states using standard CSS transitions.';
  } else if (day === 14) {
    title = 'Lofi Focus Sound Player';
    difficulty = 'Medium';
    xp = 100;
    description = 'Create an ambient player with Lofi beats, rain sound, and keyboard clicks. Help students focus late at night. Manage Web Audio API streams with simple play/pause hooks.';
  } else if (day === 15) {
    title = 'Live Markdown Editor';
    difficulty = 'Hard';
    xp = 180;
    description = 'Build a split-screen markdown editor. Render markdown format dynamically as the user types using safe parsing methods, optimized for mobile keyboards.';
  }

  return { day, title, difficulty, xp, description };
});

export const StateProvider = ({ children }) => {
  const [profileType, setProfileType] = useState('ACTIVE'); // 'ACTIVE', 'NEW', 'MISSED'
  const [submissions, setSubmissions] = useState({});
  const [streak, setStreak] = useState(11);
  const [completedDaysCount, setCompletedDaysCount] = useState(11);
  const [xp, setXp] = useState(1100);
  const [rank, setRank] = useState(42);
  const [missedDays, setMissedDays] = useState([]);
  const [activeDayId, setActiveDayId] = useState(12);
  const [repairedDays, setRepairedDays] = useState([]);
  const [theme, setTheme] = useState('dark'); // 'dark', 'light'

  // Apply theme to body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Load preset scenarios based on selection
  useEffect(() => {
    if (profileType === 'NEW') {
      setSubmissions({});
      setStreak(0);
      setCompletedDaysCount(0);
      setXp(0);
      setRank(1542);
      setMissedDays([]);
      setActiveDayId(1);
      setRepairedDays([]);
    } else if (profileType === 'ACTIVE') {
      const activeSubmissions = {};
      for (let d = 1; d <= 11; d++) {
        activeSubmissions[d] = {
          github: `https://github.com/coder/abtalks-challenge/commit/day-${d}`,
          linkedin: `https://linkedin.com/posts/coder-abtalks-day-${d}`,
          timestamp: new Date(Date.now() - (12 - d) * 24 * 60 * 60 * 1000).toISOString()
        };
      }
      setSubmissions(activeSubmissions);
      setStreak(11);
      setCompletedDaysCount(11);
      setXp(1100);
      setRank(42);
      setMissedDays([]);
      setActiveDayId(12);
      setRepairedDays([]);
    } else if (profileType === 'MISSED') {
      const missedSubmissions = {};
      // Submitted 1 to 13
      for (let d = 1; d <= 13; d++) {
        missedSubmissions[d] = {
          github: `https://github.com/coder/abtalks-challenge/commit/day-${d}`,
          linkedin: `https://linkedin.com/posts/coder-abtalks-day-${d}`,
          timestamp: new Date(Date.now() - (15 - d) * 24 * 60 * 60 * 1000).toISOString()
        };
      }
      // Day 14 was missed
      setSubmissions(missedSubmissions);
      setStreak(0); // broken streak
      setCompletedDaysCount(13);
      setXp(1300);
      setRank(124);
      setMissedDays([14]);
      setActiveDayId(15);
      setRepairedDays([]);
    }
  }, [profileType]);

  const submitProof = (dayId, github, linkedin) => {
    const updatedSubmissions = {
      ...submissions,
      [dayId]: { github, linkedin, timestamp: new Date().toISOString() }
    };
    setSubmissions(updatedSubmissions);
    
    // Update completion counts
    const newCompletedCount = Object.keys(updatedSubmissions).length;
    setCompletedDaysCount(newCompletedCount);
    
    // Increment XP
    const taskXp = CHALLENGE_TASKS[dayId - 1]?.xp || 100;
    setXp(prevXp => prevXp + taskXp);

    // Streak logic: check if the previous day was completed or if it is day 1
    if (dayId === 1) {
      setStreak(1);
    } else {
      const wasPrevDayCompleted = !!updatedSubmissions[dayId - 1];
      if (wasPrevDayCompleted) {
        setStreak(prev => prev + 1);
      } else {
        // If previous day wasn't completed, is this day 15 but we've repaired day 14?
        const isPrevDayRepaired = repairedDays.includes(dayId - 1);
        if (isPrevDayRepaired) {
          setStreak(prev => prev + 1);
        } else {
          // If neither, then streak starts or remains 1 (since they submitted today)
          setStreak(1);
        }
      }
    }

    // Improve rank
    setRank(prev => Math.max(1, prev - Math.floor(Math.random() * 3) - 1));
  };

  const repairStreak = (missedDayId) => {
    // Perform simulated repair
    const updatedSubmissions = {
      ...submissions,
      [missedDayId]: {
        github: `https://github.com/coder/abtalks-challenge/commit/day-${missedDayId}-repaired`,
        linkedin: `https://linkedin.com/posts/coder-abtalks-day-${missedDayId}-repaired`,
        timestamp: new Date().toISOString(),
        isRepaired: true
      }
    };
    setSubmissions(updatedSubmissions);
    setRepairedDays([...repairedDays, missedDayId]);
    setCompletedDaysCount(Object.keys(updatedSubmissions).length);
    
    setStreak(14);
    
    setMissedDays(missedDays.filter(d => d !== missedDayId));
    setXp(prev => prev + 150);
  };

  return (
    <StateContext.Provider value={{
      profileType,
      setProfileType,
      submissions,
      streak,
      completedDaysCount,
      xp,
      rank,
      missedDays,
      activeDayId,
      repairedDays,
      submitProof,
      repairStreak,
      theme,
      setTheme,
      toggleTheme,
      tasks: CHALLENGE_TASKS
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => useContext(StateContext);
