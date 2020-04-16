import { useEffect, useState } from "react";
import produce from "immer";

export const enhancedReducer = (state, action) => {
  return produce(state, (draftState) => {
    draftState[action.key] = action.value;
  });
};

export const useClickOffElement = (customRef, toggle, cb) => {
  const [clickedOffElement, setClick] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault();
      if (customRef.current && !customRef.current.contains(e.target)) {
        setClick(true);
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      setClick(false);
      window.removeEventListener("click", handleClick);
    };
  }, [customRef, toggle]);

  if (clickedOffElement && toggle && cb) {
    // Run callback when user clicks off element and toggle enabled
    return cb();
  }
};
