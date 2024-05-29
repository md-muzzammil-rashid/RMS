import React, { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const ElapsedTimeClock = ({timestamp}) => {
  const [elapsedTime, setElapsedTime] = useState(getElapsedTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(getElapsedTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  function getElapsedTime() {
    const date = parseISO(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return elapsedTime;
};

export default ElapsedTimeClock;
