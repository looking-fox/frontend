import React from "react";
import styled from "styled-components";
import { Text } from "../../../ui/StyledComponents";
import {} from "../../../ui/formik/FormikComponents";

const FormField = ({ field = {} }) => {
  return (
    <Container>
      <Text>{field.formFieldTitle}</Text>
    </Container>
  );
};

const Container = styled.div``;

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
