import styled, { css } from "styled-components";

const Button = styled.button`
  background: ${props => props.theme.primaryColor};
  color: #fff;
  border-radius: 3px;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

export default Button;
