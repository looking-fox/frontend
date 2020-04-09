import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text } from "./StyledComponents";
import { IoMdCheckmark } from "react-icons/io";
import { connect } from "react-redux";
import { toastReset } from "../reducers/toastSlice";

const Toast = ({
  show,
  message = "New Workflow Saved!",
  duration = 2500,
  success = false,
  error = false,
  Icon = null,
  toastReset,
}) => {
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    const setTimer = () =>
      setTimeout(() => {
        setShowTimer(true);
        toastReset();
      }, duration);

    if (show && !showTimer) {
      setTimer();
    }
    return clearInterval(setTimer);
  }, [show, showTimer, duration, toastReset]);

  return show && !showTimer ? (
    <ToastContainer success={success} error={error}>
      <ToastText>
        {Icon ? <Icon /> : success ? <IoMdCheckmark /> : null}
        {message}
      </ToastText>
    </ToastContainer>
  ) : null;
};

const ToastContainer = styled.div`
  width: fit-content;
  background: ${(p) =>
    p.success ? p.theme.green : p.error ? p.theme.red : p.theme.primaryColor};
  color: white;
  font-size: 1.1em;
  border-radius: 3px;
  ${(p) => p.theme.sideBoxShadow};
  font-weight: bold;
  padding: 0.25em 0.5em;
  position: absolute;
  z-index: 5;
  bottom: 25px;
  right: 25px;
  animation: slideUp 500ms ease-in-out;
  @keyframes slideUp {
    from {
      bottom: -25px;
    }
    to {
      bottom: 25px;
    }
  }
`;

const ToastText = styled(Text)`
  display: flex;
  align-items: center;
  & svg {
    margin-right: 5px;
  }
`;

const mapDispatch = { toastReset };

export default connect(null, mapDispatch)(Toast);
