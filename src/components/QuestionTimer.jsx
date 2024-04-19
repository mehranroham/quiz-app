import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, handleTimeout, style }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timeoutFunc = setTimeout(handleTimeout, timeout);
    return () => {
      clearTimeout(timeoutFunc);
    };
  }, [timeout, handleTimeout]);

  useEffect(() => {
    const timeoutFunc = setInterval(() => {
      setRemainingTime((prev) => prev - 20);
    }, 20);
    return () => {
      clearTimeout(timeoutFunc);
    };
  }, []);

  let cssClasses =
    'w-[300px] h-3 mx-auto rounded-lg overflow-hidden [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-violet-400 [&::-moz-progress-bar]:bg-violet-400';

  if (style) {
    cssClasses =
      'w-[300px] h-3 mx-auto rounded-lg overflow-hidden [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-400 [&::-webkit-progress-value]:bg-violet-700 [&::-moz-progress-bar]:bg-violet-700';
  }

  return (
    <progress className={cssClasses} max={timeout} value={remainingTime} />
  );
}
