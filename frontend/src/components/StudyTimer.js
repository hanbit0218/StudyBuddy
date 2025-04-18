import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Replay as ResetIcon,
  FastForward as SkipIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

/**
 * StudyTimer component implementing the Pomodoro Technique
 * 
 * @param {Object} props - Component props
 * @param {number} props.studyMinutes - Study interval in minutes (default: 25)
 * @param {number} props.breakMinutes - Break interval in minutes (default: 5)
 * @param {number} props.longBreakMinutes - Long break interval in minutes (default: 15)
 * @param {number} props.longBreakAfter - Number of study intervals before a long break (default: 4)
 * @param {Function} props.onComplete - Function called when a timer completes
 * @param {Function} props.onStudyStart - Function called when study session starts
 * @param {Function} props.onBreakStart - Function called when break starts
 */
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

  // Start/pause timer
  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  // Reset current timer
  const resetTimer = () => {
    setIsRunning(false);
    if (isStudyMode) {
      setTimeLeft(studyMinutes * 60);
    } else {
      setTimeLeft(calculateBreakTime());
    }
    setProgress(100);
  };

  // Skip to next timer
  const skipTimer = () => {
    setIsRunning(false);
    switchMode();
  };

  // Get color based on mode
  const getColor = () => {
    return isStudyMode ? 'primary' : 'secondary';
  };

  return (
    <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5" align="center" gutterBottom>
          {isStudyMode ? 'Study Session' : 'Break Time'}
        </Typography>
        
        <Box position="relative" display="inline-flex" sx={{ my: 2 }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={120}
            thickness={4}
            color={getColor()}
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
            <Typography variant="h4" component="div" color="text.primary">
              {formatTime(timeLeft)}
            </Typography>
          </Box>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Tooltip title={isRunning ? "Pause" : "Start"}>
            <IconButton 
              color={getColor()} 
              onClick={toggleTimer}
              size="large"
            >
              {isRunning ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Reset">
            <IconButton 
              color="default" 
              onClick={resetTimer}
              size="large"
            >
              <ResetIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Skip">
            <IconButton 
              color="default" 
              onClick={skipTimer}
              size="large"
            >
              <SkipIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        
        <Divider flexItem sx={{ my: 1 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          {isStudyMode 
            ? `Focus on your work. Break in ${formatTime(timeLeft)}.` 
            : `Take a break. Next study session in ${formatTime(timeLeft)}.`
          }
        </Typography>
        
        <Typography variant="caption" color="text.secondary" align="center">
          Completed intervals: {completedIntervals}
        </Typography>
        
        <Tooltip title="Settings">
          <IconButton size="small" color="default">
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}

export default StudyTimer;