import { useEffect } from "react";
import produce from "immer";

export const enhancedReducer = (state, action) => {
  return produce(state, (draftState) => {
    draftState[action.key] = action.value;
  });
};

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
