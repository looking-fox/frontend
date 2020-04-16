import { useEffect } from "react";

export const useClickOffElement = (customRef, cb) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (customRef.current && !customRef.current.contains(e.target)) {
        return cb();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [customRef, cb]);
};
