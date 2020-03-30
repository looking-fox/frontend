import React from "react";
import styled from "styled-components";
import { Text, Button } from "../../../ui/StyledComponents";

const Header = ({ formName = "Form", publishDisabled = false }) => {
  return (
    <HeaderContainer>
      <HeaderText>{formName}</HeaderText>
      <HeaderButton outline disabled={publishDisabled}>
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

const HeaderText = styled(Text)`
  font-size: 1.25em;
  font-weight: bold;
`;

const HeaderButton = styled(Button)`
  margin-left: auto;
  margin-right: 50px;
`;

export default Header;
