import { useRef, useEffect, useState } from "react";

export const useClickOffElement = (customRef, showModal) => {
  const [clickedOffElement, setClick] = useState(false);
  const didMount = useRef(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (!didMount.current) {
        // avoid first click setting click to true
        return (didMount.current = true);
      } else if (customRef.current && !customRef.current.contains(e.target)) {
        setClick(true);
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      setClick(false);
      window.removeEventListener("click", handleClick);
    };
  }, [customRef, showModal]);

  return [clickedOffElement];
};
