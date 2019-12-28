import styled, { css } from "styled-components";

const Button = styled.button`
  background: ${props => props.theme.primaryColor};
  color: #fff;
  border-radius: 3px;
  font-size: 1em;
  font-family: "Avenir";
  font-weight: bold;
  margin: 5px 1em;
  padding: 0.25em 1em;
  border: none;
  cursor: pointer;
  transition: all 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.9;
  }
  & svg {
    margin: 0em 0.25em;
    font-size: 1.2em;
  }

  ${props =>
    props.outline &&
    css`
      background: transparent;
      color: black;
      border: 2px solid black;
    `};

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      margin: 0.5em 0em;
    `};
`;

export default Button;
