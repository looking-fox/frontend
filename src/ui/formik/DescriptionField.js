import { Field } from "formik";
import styled, { css } from "styled-components";

const DescriptionField = styled(Field)`
  background: transparent;
  outline: none;
  border: none;
  width: 30vw;
  box-sizing: border-box;
  padding: 10px 10px;
  margin-top: -20px;
  margin-bottom: 10px;
  font-size: 0.8em;
  font-style: italic;
  ${props =>
    props.error &&
    css`
      outline: 1px solid #e65f5c;
    `};
`;

export default DescriptionField;
