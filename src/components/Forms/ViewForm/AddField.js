import React from "react";
import styled from "styled-components";
import { Text } from "../../../ui/StyledComponents";
import { generateFormState } from "./formUtils";
import { connect } from "react-redux";

const AddField = ({ form = {}, userId, handlePublishNewField }) => {
  const handleAddField = async () => {
    let [newForm, newFormFields] = generateFormCopy();
    let newField = generateNewField();
    newFormFields.push(newField);
    newForm.formFields = newFormFields;
    const initialFormState = generateFormState(newForm);
    await handlePublishNewField(newForm, initialFormState);
  };

  const generateFormCopy = () => {
    let newForm = JSON.parse(JSON.stringify(form));
    const { formFields: newFormFields } = newForm;
    return [newForm, newFormFields];
  };

  const generateNewField = (type = "SHORT_ANSWER") => {
    const formFieldOrder = form.formFields.length;
    const newField = {
      formFieldTitle: "",
      formFieldDescription: "",
      formFieldPlaceholder: "",
      formFieldRequired: false,
      formFieldType: type,
      formFieldOrder,
      formFieldId: `temp-${form.formId}-${Date.now()}`,
      uid: userId,
      formId: form.formId,
    };
    return newField;
  };

  return <StyledText onClick={handleAddField}>Add Question</StyledText>;
};

const StyledText = styled(Text)`
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
  font-weight: bold;
  font-size: 0.9em;
  cursor: pointer;
`;

const mapState = (state) => ({ userId: state.user.uid });

export default connect(mapState, null)(AddField);
