import React from "react";
import styled from "styled-components";
import { Button } from "../../ui/StyledComponents";
import { IoIosAdd } from "react-icons/io";

const ViewClientsHeader = () => {
  return (
    <HeaderContainer>
      <AddClientButton outline>
        <IoIosAdd /> Add Client
      </AddClientButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 60px;
  background: ${p => p.theme.lightGrey};
  display: flex;
  align-items: center;
`;

const AddClientButton = styled(Button)`
  margin-left: auto;
  margin-right: 25px;
`;

export default ViewClientsHeader;
