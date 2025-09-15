import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      callbackRef.current();
    }
    if (delay !== null) {
      let intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}
