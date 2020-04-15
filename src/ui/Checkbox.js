import React, { useState } from "react";
import { Input } from "./StyledComponents";
import styled, { css } from "styled-components";

const Checkbox = (props) => {
  const { label, checked } = props;
  const [editMode, setEditMode] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };
  return (
    <Container onClick={handleClick} onBlur={() => setEditMode(false)}>
      <CheckboxInput
        type="checkbox"
        id="2342"
        checked={checked}
        readOnly
        {...props}
      />
      <StyledInput showInput={editMode} />
      {!editMode && <Label htmlFor="2342">{label}</Label>}
    </Container>
  );
};

const CheckboxInput = styled.input`
  background: ${(p) => p.theme.lightGrey};
  border: none;
  width: fit-content;
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 10px 0px;
  font-size: 1.1em;
`;

const Label = styled.label`
  font-family: "Avenir";
  margin-left: 10px;
  font-size: 1em;
  padding-top: 0.2em;
`;

const StyledInput = styled(Input)`
  font-family: "Avenir" !important;
  margin: 0;
  padding-left: 10px;
  width: 100%;
  margin-left: 10px;
  font-size: 0.9em;
  outline: none;
  ${(p) =>
    !p.showInput &&
    css`
      position: absolute;
      top: -1000px;
      left: -1000px;
      visibility: hidden;
    `}
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default Checkbox;
