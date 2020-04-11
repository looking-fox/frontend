import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Field,
  FormErrorText,
  CheckboxField,
} from "../../../ui/formik/FormikComponents";
import { Text } from "../../../ui/StyledComponents";
import DragIcon from "../../../assets/images/drag-indicator.svg";
import { FiTrash2 } from "react-icons/fi";

const FormField = ({
  values = {},
  field = {},
  lastField = false,
  handleUpdateForm,
  handleDeleteField,
}) => {
  const [hover, setHover] = useState(false);
  const didMount = useRef(false);
  const fieldString = `formFieldRequired-${field.formFieldId}`;
  const fieldValue = values[fieldString];

  useEffect(() => {
    // Hook saves draft on checkbox value change
    if (didMount.current) {
      handleUpdateForm(fieldString, fieldValue);
    } else didMount.current = true;
    return () => setHover(false);
  }, [handleUpdateForm, fieldString, fieldValue]);

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseOver={() => !hover && setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <StyledImage src={DragIcon} alt="drag icon" />

      <ActionContainer>
        {hover ? (
          <>
            <CheckboxField
              name={`formFieldRequired-${field.formFieldId}`}
              checked={values[`formFieldRequired-${field.formFieldId}`]}
              description="Required"
            />
            {!lastField && (
              <TrashIcon onClick={() => handleDeleteField(field.formFieldId)} />
            )}
          </>
        ) : (
          <StyledText>* Required</StyledText>
        )}
      </ActionContainer>
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
  right: 15px;
  cursor: pointer;
  display: flex;
`;

const TrashIcon = styled(FiTrash2)`
  margin-left: 25px;
  opacity: 0.3;
`;

const StyledText = styled(Text)`
  font-size: 0.8em;
  font-style: italic;
  padding-top: 5px;
  opacity: 0.7;
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
