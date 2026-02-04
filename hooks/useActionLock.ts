
import { useRef, useState } from "react";

export function useActionLock() {
  const lockedRef = useRef(false);
  const [loading, setLoading] = useState(false);

  const lock = () => {
    if (lockedRef.current) return false;
    lockedRef.current = true;
    setLoading(true);
    return true;
  };

  const unlock = () => {
    lockedRef.current = false;
    setLoading(false);
  };

  return { loading, lock, unlock };
}
