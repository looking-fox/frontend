import { Field } from "formik";
import styled, { css } from "styled-components";

const BorderBottomField = styled(Field)`
  background: transparent;
  border: none;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 10px 0px;
  font-size: 1em;
  border-bottom: 1px solid #c4c4c4;
  outline: none;
  ${props =>
    props.error &&
    css`
      outline: 1px solid #e65f5c;
    `};
`;

export default BorderBottomField;
