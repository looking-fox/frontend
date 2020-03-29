import React from "react";
import styled, { css } from "styled-components";
import loadingWhite from "../assets/images/loading-white.svg";
import loadingBlack from "../assets/images/loading-black.svg";

const Spinner = ({ color, size }) => {
  const icon = color === "black" ? loadingBlack : loadingWhite;
  return <Image src={icon} alt="loading spinner" size={size} />;
};

const Image = styled.img`
  ${p =>
    p.size &&
    css`
      width: ${p => p.size}px;
      height: ${p => p.size}px;
    `}
`;

export default Spinner;
