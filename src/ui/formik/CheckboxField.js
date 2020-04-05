import React from "react";
import { Field } from "formik";
import styled from "styled-components";

const CheckboxField = (props) => {
  const { description, handleClick, ...rest } = props;
  return (
    <Container onClick={handleClick}>
      <StyledField id={rest.name} name={rest.name} type="checkbox" {...rest} />
      <StyledLabel htmlFor={rest.name}>{description || ""}</StyledLabel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer !important;
`;

const StyledLabel = styled.label`
  margin-bottom: -2px;
  font-size: 0.8em;
  font-family: "Avenir";
`;

const StyledField = styled(Field)`
  margin-right: 5px;
`;

export default CheckboxField;
