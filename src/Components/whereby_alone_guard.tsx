import { useCallback, useEffect, useRef, useState } from "react";

const ALONE_MS = 5 * 60 * 1000;
const PROMPT_SECS = 60;

export function useAloneGuard(count: number, onTimeout: () => void) {
  const [prompt, setPrompt] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(PROMPT_SECS);
  const [resetKey, setResetKey] = useState(0);
  const aloneTimer = useRef<ReturnType<typeof setTimeout>>();
  const tick = useRef<ReturnType<typeof setInterval>>();

  const clearAll = useCallback(() => {
    clearTimeout(aloneTimer.current);
    clearInterval(tick.current);
  }, []);

  useEffect(() => {
    clearAll();
    setPrompt(false);
    if (count !== 1) return;                 // only when exactly one person is in the room
    aloneTimer.current = setTimeout(() => {
      setSecondsLeft(PROMPT_SECS);
      setPrompt(true);
      tick.current = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    }, ALONE_MS);
    return clearAll;
  }, [count, resetKey, clearAll]);

  useEffect(() => {
    if (prompt && secondsLeft <= 0) {
      clearAll();
      setPrompt(false);
      onTimeout();
    }
  }, [prompt, secondsLeft, onTimeout, clearAll]);

  const stillHere = useCallback(() => setResetKey((k) => k + 1), []); // restarts the 5 min

  return { prompt, secondsLeft, stillHere };
}