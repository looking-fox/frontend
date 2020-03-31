import React from "react";
import styled from "styled-components";
import { Text, Button } from "../../../ui/StyledComponents";
import { Field } from "../../../ui/formik/FormikComponents";

const Header = ({ submitDisabled, unpublishedChanges = false }) => {
  return (
    <HeaderContainer>
      <Field
        name="formTitle"
        borderBottom
        style={{ fontSize: "1.25em", fontWeight: "bold", width: "250px" }}
      />

      <HeaderButton
        outline={!unpublishedChanges}
        disabled={submitDisabled}
        type="submit"
        success={unpublishedChanges}
      >
        Publish
      </HeaderButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 120px;
  width: 75vw;
  display: flex;
  align-items: center;
  padding-left: 50px;
  box-sizing: border-box;
`;

const HeaderText = styled(Field)`
  font-size: 1.25em;
  font-weight: bold;
`;

const HeaderButton = styled(Button)`
  margin-left: auto;
  margin-right: 50px;
`;

export default Header;
