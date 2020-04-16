import { useEffect } from "react";

export const useClickOffElement = (ref, cb) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        return cb();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [ref, cb]);
};
