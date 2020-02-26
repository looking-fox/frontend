import React from "react";
import styled from "styled-components";
import { Button } from "../../ui/StyledComponents";
import { IoIosAdd } from "react-icons/io";

const ViewClientsHeader = ({ handleToggleClientModal }) => {
  return (
    <HeaderContainer>
      <AddClientButton outline onClick={handleToggleClientModal}>
        <IoIosAdd /> Add Client
      </AddClientButton>
    </HeaderContainer>
  );
};

export default ViewClientsHeader;

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
