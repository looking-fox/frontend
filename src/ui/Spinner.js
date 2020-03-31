import React from "react";
import styled, { css } from "styled-components";
import loadingWhite from "../assets/images/loading-white.svg";
import loadingBlack from "../assets/images/loading-black.svg";

const Spinner = ({ color, size, visible, opacity }) => {
  const icon = color === "black" ? loadingBlack : loadingWhite;
  return visible ? (
    <Image src={icon} alt="loading spinner" size={size} opacity={opacity} />
  ) : null;
};

const Image = styled.img`
  ${p =>
    p.size &&
    css`
      width: ${p => (p.size ? p.size : 15)}px;
      height: ${p => (p.size ? p.size : 15)}px;
    `}

  ${p =>
    p.opacity &&
    css`
      opacity: ${p => (p.opacity ? p.opacity : 1)};
    `}
`;

export default Spinner;
