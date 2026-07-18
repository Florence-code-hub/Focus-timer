import React, { useState, useEffect, useRef } from 'react';
import TaskList from './TaskList.jsx';
import AiAssistant from './AiAssistant.jsx';
import './App.css';

function App() {
  const BREAK_MODES = { SHORT_BREAK: 5 * 60, LONG_BREAK: 15 * 60 };
  const DEFAULT_FOCUS_TIME = 10 * 60;

  const [currentMode, setCurrentMode] = useState('FOCUS'); 
  const [isActive, setIsActive] = useState(false);
  
  const [completedSessions, setCompletedSessions] = useState(() => {
    return Number(localStorage.getItem('aura_sessions')) || 0;
  });

  const [totalFocusSeconds, setTotalFocusSeconds] = useState(() => {
    return Number(localStorage.getItem('aura_focus_seconds_v3')) || 0;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('aura_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const activeTask = tasks.find(t => !t.completed);
  const currentGoalTask = activeTask ? activeTask.text : 'Maintain Beauty';
  
  const activeFocusDuration = activeTask && typeof activeTask.duration === 'number' && !isNaN(activeTask.duration)
    ? activeTask.duration 
    : DEFAULT_FOCUS_TIME;

  const [timeLeft, setTimeLeft] = useState(activeFocusDuration);
  
  const timerRef = useRef(null);
  const loadedTaskRef = useRef(null);
  const hasTriggeredCompleteRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      if (currentMode === 'FOCUS') {
        setTimeLeft(activeFocusDuration);
        loadedTaskRef.current = activeTask?.id || 'default';
      } else {
        setTimeLeft(BREAK_MODES[currentMode] || BREAK_MODES.SHORT_BREAK);
        loadedTaskRef.current = currentMode;
      }
      hasTriggeredCompleteRef.current = false;
    } else {
      if (currentMode === 'FOCUS' && loadedTaskRef.current !== (activeTask?.id || 'default')) {
        loadedTaskRef.current = activeTask?.id || 'default';
      }
    }
  }, [activeTask?.id, currentMode, activeFocusDuration, isActive]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (currentMode === 'FOCUS') {
          setTotalFocusSeconds((prevSeconds) => prevSeconds + 1);
        }

        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setTimeout(() => handleTimerComplete(), 0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, currentMode]); 

  useEffect(() => {
    localStorage.setItem('aura_sessions', completedSessions.toString());
  }, [completedSessions]);

  useEffect(() => {
    localStorage.setItem('aura_focus_seconds_v3', totalFocusSeconds.toString());
  }, [totalFocusSeconds]);

  const handleTimerComplete = () => {
    setIsActive(false);

    if (hasTriggeredCompleteRef.current) {
      return;
    }

    hasTriggeredCompleteRef.current = true;

    if (currentMode === 'FOCUS') {
      setCompletedSessions((prev) => prev + 1);

      const chosenBreak = activeTask?.breakPref || 'SHORT_BREAK';
      if (chosenBreak === 'NONE') {
        setCurrentMode('FOCUS');
        setTimeLeft(activeFocusDuration);
        setIsActive(true); 
      } else {
        setCurrentMode(chosenBreak);
        setTimeLeft(BREAK_MODES[chosenBreak]);
        setIsActive(true); 
      }
    } else {
      setCurrentMode('FOCUS');
      setTimeLeft(activeFocusDuration);
      setIsActive(true); 
    }
  };

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) return "10:00";
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const totalFocusMinutes = Math.floor(totalFocusSeconds / 60);

  return (
    <div className="mobile-shell">
      <nav className="top-navbar">
        <span className="app-branding-title">FOCUS-TIMER</span>
      </nav>

      <div className="scrollable-content-window">
        <div className="analytics-top-block">
          <div className="metric-box">
            <strong>{completedSessions}</strong>
            <p>Sessions Conquered</p>
          </div>
          <div className="metric-box">
            <strong>{totalFocusMinutes}m</strong>
            <p>Total Focus Time</p>
          </div>
        </div>

        <div className="motivational-header-quote">
          <p>“Do not love sleep, or you will grow poor; stay awake and you will have food to spare.”</p>
        </div>

        <div className="circle-timer-outer-ring">
          <div className="circle-timer-inner-core">
            <div className="digital-clock-face">{formatTime(timeLeft)}</div>
            <div className={`sessions-counter-subtext ${currentMode === 'FOCUS' ? 'status-focus' : 'status-rest'}`}>
              {currentMode === 'FOCUS' ? 'Focus Mode' : 'Rest Mode'}
            </div>
          </div>
        </div>

        <div className="control-interaction-group">
          <button className="primary-start-pill-btn" onClick={() => setIsActive(!isActive)}>
            {isActive ? 'PAUSE' : 'START'}
          </button>
          
          <div className="secondary-action-row">
            <button className="action-outline-btn" onClick={() => setIsActive(false)}>
              <span>⏸</span> Pause
            </button>
            <button className="action-outline-btn" onClick={() => { 
              setIsActive(false); 
              setTimeLeft(currentMode === 'FOCUS' ? activeFocusDuration : BREAK_MODES[currentMode]); 
            }}>
              <span>🔄</span> Reset
            </button>
          </div>
        </div>

        <div className="context-card-module">
          <span className="context-card-label">Current Goal</span>
          <div className="context-card-main-title truncate-goal">
            {currentGoalTask}
          </div>
        </div>

        <TaskList tasks={tasks} setTasks={setTasks} />
         <AiAssistant />

        <div className="signature-branding-tag">@florence-focus-timer</div>
      </div>
    </div>
  );
}

export default App;
