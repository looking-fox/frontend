import React from "react";
import styled from "styled-components";
import { Button } from "../../../ui/StyledComponents";
import { Field, FormErrorText } from "../../../ui/formik/FormikComponents";
import HeaderStatus from "./HeaderStatus";

const Header = ({
  isSubmitting = false,
  isValidating = false,
  isValid = true,
  unpublishedChanges = false
}) => {
  return (
    <HeaderContainer>
      <LeftPanel>
        <Field
          name="formTitle"
          borderBottom
          style={{ fontSize: "1.25em", fontWeight: "bold", width: "250px" }}
        />
        <FormErrorText name="formTitle" component="div" />
      </LeftPanel>

      <RightPanel>
        <HeaderStatus
          isValidating={isValidating}
          unpublishedChanges={unpublishedChanges}
        />
        <PublishButton
          outline={!unpublishedChanges}
          disabled={isSubmitting || !isValid || !unpublishedChanges}
          type="submit"
          success={unpublishedChanges && isValid}
        >
          Publish
        </PublishButton>
      </RightPanel>
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

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 50px;
`;

const PublishButton = styled(Button)`
  margin-left: 50px;
`;

export default Header;
