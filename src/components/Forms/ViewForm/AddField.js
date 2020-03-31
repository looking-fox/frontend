import React from "react";
import styled from "styled-components";
import { Text } from "../../../ui/StyledComponents";

const AddField = ({ handleAddField }) => {
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

export default AddField;
