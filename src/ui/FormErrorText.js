import { ErrorMessage } from "formik";
import styled, { css } from "styled-components";
import theme from "./theme/theme";

const FormErrorText = styled(ErrorMessage)`
  font-size: 0.9em;
  font-family: "Avenir";
  color: ${theme.red};
  padding-left: 10px;
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

export default FormErrorText;
