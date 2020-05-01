import React from "react";
import { ErrorMessage } from "formik";
import styled from "styled-components";
import theme from "../theme/theme";

const FormErrorText = (props) => {
  const { withSpacing, ...rest } = props;
  if (withSpacing) {
    return <StyledFormErrorTextWithSpacing {...rest} />;
  } else {
    return <StyledFormErrorText {...rest} />;
  }
};

const StyledFormErrorText = styled(ErrorMessage)`
  font-size: 0.9em;
  font-family: "Avenir";
  color: ${theme.colors.red};
  padding-left: 10px;
  margin-bottom: 10px;
`;

const StyledFormErrorTextWithSpacing = styled(ErrorMessage)`
  font-size: 0.9em;
  font-family: "Avenir";
  color: ${theme.colors.red};
  padding-left: 10px;
  margin-top: -10px;
  margin-bottom: 25px;
`;

export default FormErrorText;
