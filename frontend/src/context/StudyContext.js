import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const StudyContext = createContext();

/**
 * StudyProvider component for managing global study-related state
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function StudyProvider({ children }) {
  // State for study sessions
  const [studySessions, setStudySessions] = useState([]);
  const [activeSubject, setActiveSubject] = useState('');
  const [studyStats, setStudyStats] = useState({
    totalStudyTime: 0, // in minutes
    sessionsCompleted: 0,
    streak: 0,
    lastStudyDate: null
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('studyBuddy_sessions');
    const savedStats = localStorage.getItem('studyBuddy_stats');
    
    if (savedSessions) {
      try {
        setStudySessions(JSON.parse(savedSessions));
      } catch (error) {
        console.error('Error parsing saved sessions:', error);
      }
    }
    
    if (savedStats) {
      try {
        setStudyStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error parsing saved stats:', error);
      }
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('studyBuddy_sessions', JSON.stringify(studySessions));
  }, [studySessions]);
  
  useEffect(() => {
    localStorage.setItem('studyBuddy_stats', JSON.stringify(studyStats));
  }, [studyStats]);

  // Add a new study session
  const addStudySession = (session) => {
    const newSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    setStudySessions(prev => [...prev, newSession]);
    
    // Update stats
    setStudyStats(prev => {
      const today = new Date().toDateString();
      const lastDate = prev.lastStudyDate ? new Date(prev.lastStudyDate).toDateString() : null;
      const isConsecutiveDay = lastDate && 
        (today === lastDate || 
         new Date(today) - new Date(lastDate) <= 86400000); // 24 hours in milliseconds
      
      return {
        totalStudyTime: prev.totalStudyTime + (session.duration || 0),
        sessionsCompleted: prev.sessionsCompleted + 1,
        streak: isConsecutiveDay ? prev.streak + 1 : 1,
        lastStudyDate: new Date().toISOString()
      };
    });
  };

  // Remove a study session
  const removeStudySession = (sessionId) => {
    setStudySessions(prev => prev.filter(session => session.id !== sessionId));
  };

  // Get study sessions for a specific subject
  const getSessionsBySubject = (subject) => {
    return studySessions.filter(session => session.subject === subject);
  };

  // Calculate total study time for a subject
  const getTotalTimeForSubject = (subject) => {
    return studySessions
      .filter(session => session.subject === subject)
      .reduce((total, session) => total + (session.duration || 0), 0);
  };

  // Context value
  const value = {
    studySessions,
    studyStats,
    activeSubject,
    setActiveSubject,
    addStudySession,
    removeStudySession,
    getSessionsBySubject,
    getTotalTimeForSubject
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}

// Custom hook for using study context
export function useStudy() {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}