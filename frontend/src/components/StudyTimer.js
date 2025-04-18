import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Replay as ResetIcon,
  FastForward as SkipIcon,
} from '@mui/icons-material';

function StudyTimer({
  studyMinutes = 25,
  breakMinutes = 5,
  longBreakMinutes = 15,
  longBreakAfter = 4,
  onComplete = () => {},
  onStudyStart = () => {},
  onBreakStart = () => {}
}) {
  // Timer states
  const [timeLeft, setTimeLeft] = useState(studyMinutes * 60); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(true);
  const [completedIntervals, setCompletedIntervals] = useState(0);
  const [progress, setProgress] = useState(100);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Calculate which break to use (regular or long)
  const calculateBreakTime = useCallback(() => {
    // If we've completed enough intervals for a long break
    if ((completedIntervals + 1) % longBreakAfter === 0) {
      return longBreakMinutes * 60;
    }
    return breakMinutes * 60;
  }, [completedIntervals, breakMinutes, longBreakMinutes, longBreakAfter]);

  // Switch between study and break modes
  const switchMode = useCallback(() => {
    if (isStudyMode) {
      // Switching to break
      const breakTime = calculateBreakTime();
      setTimeLeft(breakTime);
      setIsStudyMode(false);
      setCompletedIntervals(prev => prev + 1);
      onBreakStart(breakTime === longBreakMinutes * 60);
    } else {
      // Switching to study
      setTimeLeft(studyMinutes * 60);
      setIsStudyMode(true);
      onStudyStart();
    }
    setProgress(100);
  }, [
    isStudyMode, 
    calculateBreakTime, 
    studyMinutes, 
    longBreakMinutes, 
    onBreakStart, 
    onStudyStart
  ]);

  // Calculate timer progress percentage
  useEffect(() => {
    const totalTime = isStudyMode 
      ? studyMinutes * 60 
      : calculateBreakTime();
    setProgress((timeLeft / totalTime) * 100);
  }, [timeLeft, isStudyMode, studyMinutes, calculateBreakTime]);

  // Timer logic
  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      setIsRunning(false);
      onComplete(isStudyMode);
      switchMode();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isStudyMode, onComplete, switchMode]);

  // Timer controls
  const toggleTimer = () => setIsRunning(prev => !prev);
  const resetTimer = () => {
    setIsRunning(false);
    if (isStudyMode) {
      setTimeLeft(studyMinutes * 60);
    } else {
      setTimeLeft(calculateBreakTime());
    }
    setProgress(100);
  };
  const skipTimer = () => {
    setIsRunning(false);
    switchMode();
  };

  // Timer colors
  const timerColors = {
    study: {
      main: '#84c0ee',
      light: 'rgba(132, 192, 238, 0.1)',
      text: '#1a202c'
    },
    break: {
      main: '#909fb5',
      light: 'rgba(144, 159, 181, 0.1)',
      text: '#1a202c'
    }
  };
  
  const currentColor = isStudyMode ? timerColors.study : timerColors.break;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        width: '100%', 
        borderRadius: 3,
        backgroundColor: currentColor.light,
        border: `1px solid ${currentColor.main}`
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 600, color: currentColor.text, mb: 3 }}
        >
          {isStudyMode ? 'Study Session' : 'Break Time'}
        </Typography>
        
        <Box position="relative" display="inline-flex" sx={{ my: 3 }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={160}
            thickness={5}
            sx={{ color: currentColor.main }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: currentColor.text }}>
              {formatTime(timeLeft)}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
          <Tooltip title={isRunning ? "Pause" : "Start"}>
            <IconButton 
              sx={{ 
                mx: 1.5, 
                backgroundColor: currentColor.main, 
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: isStudyMode ? '#63a9de' : '#7b8a9a',
                },
                width: 60,
                height: 60,
              }}
              onClick={toggleTimer}
            >
              {isRunning ? <PauseIcon fontSize="large" /> : <PlayIcon fontSize="large" />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Reset">
            <IconButton 
              sx={{ 
                mx: 1.5, 
                backgroundColor: 'rgba(0, 0, 0, 0.05)', 
                color: '#1a202c',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                width: 60,
                height: 60,
              }}
              onClick={resetTimer}
            >
              <ResetIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Skip">
            <IconButton 
              sx={{ 
                mx: 1.5, 
                backgroundColor: 'rgba(0, 0, 0, 0.05)', 
                color: '#1a202c',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                width: 60,
                height: 60,
              }}
              onClick={skipTimer}
            >
              <SkipIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body1" sx={{ color: currentColor.text, mb: 1 }}>
          {isStudyMode 
            ? `Focus on your work. Break in ${formatTime(timeLeft)}.` 
            : `Take a break. Next study session in ${formatTime(timeLeft)}.`
          }
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'rgba(26, 32, 44, 0.6)' }}>
          Completed intervals: {completedIntervals}
        </Typography>
      </Box>
    </Paper>
  );
}

export default StudyTimer;