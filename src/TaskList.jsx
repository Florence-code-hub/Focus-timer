import React, { useState, useEffect } from 'react';

function TaskList({ tasks, setTasks }) {
  const [taskInput, setTaskInput] = useState('');
  const [durationInput, setDurationInput] = useState('');
  const [breakPreference, setBreakPreference] = useState('SHORT_BREAK');
  const [errorMsg, setErrorMsg] = useState('');

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2; 

  useEffect(() => {
    localStorage.setItem('aura_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const totalPages = Math.ceil(tasks.length / tasksPerPage) || 1;
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [tasks.length, currentPage]);

  const handleAddTask = (e) => {
    e.preventDefault();
    const cleanInput = taskInput.trim();

    if (!cleanInput) {
      setErrorMsg('⚠️ Task cannot be empty.');
      return;
    }

    let durationMins = parseInt(durationInput, 10);
    if (isNaN(durationMins) || durationMins <= 0) {
      durationMins = 25; 
    }

    setErrorMsg('');
    
    // New tasks are always added to the beginning of the active list
    setTasks([{ 
      id: Date.now(), 
      text: cleanInput, 
      duration: durationMins * 60,
      breakPref: breakPreference,
      completed: false,
      completedAt: null // Track completion time for strict ordering
    }, ...tasks]);
    
    setTaskInput('');
    setDurationInput('');
    setBreakPreference('SHORT_BREAK');
    setCurrentPage(1); // Jump to page 1 to see the brand new active task
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        return { 
          ...t, 
          completed: !t.completed,
          completedAt: !t.completed ? Date.now() : null // Timestamp when checked
        };
      }
      return t;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getBreakLabel = (pref) => {
    if (pref === 'SHORT_BREAK') return '☕ 5m';
    if (pref === 'LONG_BREAK') return '🌴 15m';
    return '🛑 No Break';
  };

  // --- GLOBAL CHRONOLOGICAL SORTING MACHINE ---
  // Group 1: Unchecked tasks sorted newest-first
  const activeTasks = tasks.filter(t => !t.completed);
  
  // Group 2: Checked tasks sorted newest-completed-first (goes right below active list)
  const completedTasks = tasks
    .filter(t => t.completed)
    .sort((a, b) => b.completedAt - a.completedAt);

  // Unify the global list cleanly
  const globallySortedTasks = [...activeTasks, ...completedTasks];

  // --- Pagination Slice Math on the Sorted Array ---
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasksSlice = globallySortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(globallySortedTasks.length / tasksPerPage);

  return (
    <div className="task-section-block">
      <h3>Girl, Face Your Problems!</h3>
      
      <form onSubmit={handleAddTask} className="task-form-grid">
        <input 
          type="text" 
          placeholder="New task description..." 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          maxLength={50}
          className="task-desc-input"
        />
        <div className="task-selectors-row">
          <input 
            type="number" 
            placeholder="Mins" 
            value={durationInput}
            onChange={(e) => setDurationInput(e.target.value)}
            min="1"
            max="180"
            className="task-duration-input"
          />
          <select 
            value={breakPreference} 
            onChange={(e) => setBreakPreference(e.target.value)}
            className="task-break-dropdown"
          >
            <option value="SHORT_BREAK">Short Break</option>
            <option value="LONG_BREAK">Long Break</option>
            <option value="NONE">No Break</option>
          </select>
          <button type="submit" className="add-task-btn">Add</button>
        </div>
      </form>
      
      {errorMsg && <p className="task-error-text">{errorMsg}</p>}

      {globallySortedTasks.length === 0 ? (
        <div className="empty-tasks-placeholder">
          <p>Your agenda is clear. Ready to track goals!</p>
        </div>
      ) : (
        <>
          <ul className="clean-task-list">
            {currentTasksSlice.map(task => {
              const displayMins = task.duration && !isNaN(task.duration) ? Math.round(task.duration / 60) : 25;
              return (
                <li key={task.id} className={`clean-task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-item-left">
                    <input 
                      type="checkbox" 
                      checked={task.completed} 
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <span className="task-text-string">
                      {task.text} 
                      <span className="task-duration-badge">({displayMins}m)</span>
                      <span className="task-pref-badge">{getBreakLabel(task.breakPref)}</span>
                    </span>
                  </div>
                  <button type="button" className="task-row-del-btn" onClick={() => deleteTask(task.id)}>✕</button>
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <div className="pagination-button-controls">
              <button 
                type="button"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pag-btn"
              >
                &lt; Prev
              </button>
              <span className="pag-indicator">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                type="button"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pag-btn"
              >
                Next &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TaskList;
