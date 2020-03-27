import styled, { css } from "styled-components";

const Textarea = styled.textarea`
  resize: none;
  background: white;
  border: none;
  width: 100%;
  height: 100px;
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

export default Textarea;
