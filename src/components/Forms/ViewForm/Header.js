import React from "react";
import styled from "styled-components";
import { Button } from "../../../ui/StyledComponents";
import { Field, FormErrorText } from "../../../ui/formik/FormikComponents";

const Header = ({
  isSubmitting = false,
  isValid = true,
  unpublishedChanges = false
}) => {
  return (
    <HeaderContainer>
      <FieldContainer>
        <Field
          name="formTitle"
          borderBottom
          style={{ fontSize: "1.25em", fontWeight: "bold", width: "250px" }}
        />
        <FormErrorText name="formTitle" component="div" />
      </FieldContainer>

      <HeaderButton
        outline={!unpublishedChanges}
        disabled={isSubmitting || !isValid || !unpublishedChanges}
        type="submit"
        success={unpublishedChanges && isValid}
      >
        Publish
      </HeaderButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 90px;
  width: 80vw;
  display: flex;
  align-items: center;
  padding-left: 50px;
  padding-bottom: 10px;
  box-sizing: border-box;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderButton = styled(Button)`
  margin-left: auto;
  margin-right: 50px;
`;

export default Header;
