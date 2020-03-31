import React from "react";
import styled from "styled-components";
import { Button } from "../../../ui/StyledComponents";
import { Field } from "../../../ui/formik/FormikComponents";

const Header = ({ isSubmitting = false, unpublishedChanges = false }) => {
  return (
    <HeaderContainer>
      <Field
        name="formTitle"
        borderBottom
        style={{ fontSize: "1.25em", fontWeight: "bold", width: "250px" }}
      />

      <HeaderButton
        outline={!unpublishedChanges}
        disabled={isSubmitting}
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

const HeaderButton = styled(Button)`
  margin-left: auto;
  margin-right: 50px;
`;

export default Header;
