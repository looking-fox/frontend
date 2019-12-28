import styled, { css } from "styled-components";

const Input = styled.input`
  background: ${p => p.theme.lightGrey};
  border: none;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 10px 0px;
  font-size: 1em;
  outline: 1px solid #ededed;
  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

export default Input;
