import styled, { css } from "styled-components";

const TextArea = styled.textarea`
  resize: none;
  background: ${p => p.theme.lightGrey};
  border: none;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 10px 0px;
  font-size: 0.9em;
  outline: 1px solid #ededed;
  ${props =>
    props.error &&
    css`
      outline: 1px solid #e65f5c;
    `};
`;

export default TextArea;
