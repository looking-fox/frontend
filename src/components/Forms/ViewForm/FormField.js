import React from "react";
import styled from "styled-components";
import { Field, FormErrorText } from "../../../ui/formik/FormikComponents";
import DragIcon from "../../../assets/images/drag-indicator.svg";

const FormField = ({ field = {} }) => {
  return (
    <Container>
      <StyledImage src={DragIcon} alt="drag icon" />
      <Field
        name="clientLocation"
        placeholder="What is your name?"
        type="location"
        transparent
      />
      <Field
        name="clientLocation"
        placeholder="Description"
        type="location"
        description
      />
      <Field
        name="clientLocation"
        placeholder="Placeholder..."
        type="location"
      />
      <FormErrorText name="clientLocation" component="div" />
    </Container>
  );
};

const Container = styled.div`
  width: 45vw;
  background: white;
  display: flex;
  flex-direction: column;
  border: 1px dashed #d1d1d1;
  border-radius: 3px;
  padding: 10px 25px;
  padding-left: 50px;
  margin-bottom: 25px;
  position: relative;
`;

const StyledImage = styled.img`
  width: fit-content;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  cursor: move;
`;

export default FormField;

// formFieldId: 2
// uid:
// formId: 2
// formFieldTitle: "What is your partner's name?"
// formFieldType: "SHORT_ANSWER"
// formFieldDescription: "Catherine Zeta, by chance?"
// formFieldPlaceholder: "CZ Jones"
// formFieldSelectOptions: null
// formFieldRadioOptions: null
// formFieldOrder: 1
// createdAt: "2020-03-30T03:47:10.042156+02:00"
// updatedAt: "2020-03-30T03:47:"
