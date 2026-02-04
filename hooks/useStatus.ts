import { useState, useCallback, useRef, useEffect } from "react";

export function useStatus() {
  const [error, setErrorState] = useState<string>("");
  const [success, setSuccessState] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setError = useCallback((message: string) => {
    setErrorState(message);
    setSuccessState(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const setSuccess = useCallback((value: boolean = true) => {
    setSuccessState(value);
    if (value) setErrorState("");
  }, []);

  const setSuccessWithTimeout = useCallback((duration = 4000) => {
    setSuccess(true);
    setErrorState("");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSuccess(false), duration);
  }, []);

  const reset = useCallback(() => {
    setErrorState("");
    setSuccessState(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { error, success, setError, setSuccess, setSuccessWithTimeout, reset };
}
