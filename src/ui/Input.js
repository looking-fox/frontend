import styled, { css } from "styled-components";

const Input = styled.input`
  background: ${(p) => p.theme.lightGrey};
  border: none;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 10px 0px;
  font-family: "Avenir";
  font-size: 1em;
  outline: 1px solid #ededed;
  ${(props) =>
    props.error &&
    css`
      outline: 1px solid #e65f5c;
    `};
`;

export default Input;
