import React from "react";
import styled from "styled-components";
import { Button, Text } from "../../../ui/StyledComponents";

const AddField = ({ handleAddField }) => {
  return (
    <Button outline onClick={handleAddField} type="none">
      Add
    </Button>
  );
};

export default AddField;
