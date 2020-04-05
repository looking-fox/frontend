import React, { useState } from "react";
import styled from "styled-components";
import { Field, FormErrorText } from "../../../ui/formik/FormikComponents";
import DragIcon from "../../../assets/images/drag-indicator.svg";
import { FiTrash2 } from "react-icons/fi";

const FormField = ({
  values = {},
  field = {},
  lastField = false,
  handleDeleteField,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <StyledImage src={DragIcon} alt="drag icon" />

      {hover && !lastField && (
        <TrashIcon onClick={() => handleDeleteField(field.formFieldId)} />
      )}

      <Field
        name={`formFieldTitle-${field.formFieldId}`}
        value={values[`formFieldTitle-${field.formFieldId}`] || ""}
        placeholder="What is Your Name?"
        transparent
      />
      <FormErrorText
        name={`formFieldTitle-${field.formFieldId}`}
        component="div"
        withSpacing
      />

      <Field
        name={`formFieldDescription-${field.formFieldId}`}
        value={values[`formFieldDescription-${field.formFieldId}`] || ""}
        placeholder="Description"
        description
      />

      <Field
        name={`formFieldPlaceholder-${field.formFieldId}`}
        value={values[`formFieldPlaceholder-${field.formFieldId}`] || ""}
        placeholder="Placeholder..."
      />
    </Container>
  );
};

const Container = styled.div`
  width: 45vw;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  padding: 10px 25px;
  padding-left: 50px;
  margin-bottom: 25px;
  position: relative;
  ${(p) => p.theme.sideBoxShadow};
`;

const StyledImage = styled.img`
  width: fit-content;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  cursor: move;
  opacity: 0.3;
`;

const TrashIcon = styled(FiTrash2)`
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.3;
  cursor: pointer;
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
