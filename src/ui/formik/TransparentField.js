import { Field } from "formik";
import styled, { css } from "styled-components";

const TransparentField = styled(Field)`
  background: transparent;
  outline: none;
  border: none;
  width: 30vw;
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 10px 0px;
  font-size: 1.1em;
  ${props =>
    props.error &&
    css`
      outline: 1px solid #e65f5c;
    `};
`;

export default TransparentField;
