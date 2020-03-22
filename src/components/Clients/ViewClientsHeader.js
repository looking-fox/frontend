import React from "react";
import styled from "styled-components";
import { Button, Link } from "../../ui/StyledComponents";
import { IoIosAdd } from "react-icons/io";

const ViewClientsHeader = () => {
  return (
    <HeaderContainer>
      <StyledLink to="/new">
        <Button outline>
          <IoIosAdd /> Add Client
        </Button>
      </StyledLink>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 60px;
  background: ${p => p.theme.lightGrey};
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-left: auto;
  margin-right: 25px;
`;

export default ViewClientsHeader;
