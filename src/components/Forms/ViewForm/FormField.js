import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Field,
  FormErrorText,
  CheckboxField,
} from "../../../ui/formik/FormikComponents";
import DragIcon from "../../../assets/images/drag-indicator.svg";
import { FiTrash2 } from "react-icons/fi";
import { useEffectExceptOnMount } from "../../../utils/utils";

const FormField = ({
  values = {},
  field = {},
  lastField = false,
  validateForm,
  handleDeleteField,
}) => {
  const [hover, setHover] = useState(false);

  useEffectExceptOnMount(() => {
    validateForm(values);
    return setHover(true);
  }, [values[`formFieldRequired-${field.formFieldId}`]]);

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseOver={() => !hover && setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <StyledImage src={DragIcon} alt="drag icon" />

      {hover && (
        <ActionContainer>
          <CheckboxField
            name={`formFieldRequired-${field.formFieldId}`}
            checked={values[`formFieldRequired-${field.formFieldId}`]}
            description="Required"
          />
          {!lastField && (
            <TrashIcon onClick={() => handleDeleteField(field.formFieldId)} />
          )}
        </ActionContainer>
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
  cursor: grab;
  opacity: 0.3;
`;

const ActionContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  display: flex;
`;

const TrashIcon = styled(FiTrash2)`
  margin-left: 25px;
  opacity: 0.3;
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
