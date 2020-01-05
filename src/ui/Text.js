import styled, { css } from "styled-components";

const Text = styled.p`
  font-size: 0.9em;
  font-family: "Avenir";
  ${props =>
    props.link &&
    css`
      cursor: pointer;
    `};
  ${props =>
    props.withIcon &&
    css`
      display: flex;
      align-items: center;
      & svg {
        margin-right: 5px;
        font-size: 1.1em;
      }
    `};
`;

export default Text;
