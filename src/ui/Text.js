import styled, { css } from "styled-components";

const Text = styled.p`
  font-size: 0.9em;
  font-family: "Avenir";
  ${props =>
    props.link &&
    css`
      cursor: pointer;
    `};
`;

export default Text;
