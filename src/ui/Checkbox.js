import React from "react";
import styled from "styled-components";

const Input = styled.input`
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

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = (props) => {
  return (
    <Container>
      <Input type="checkbox" id="2342" {...props} />
      <Label for="2342">First name</Label>
    </Container>
  );
};

export default Checkbox;
