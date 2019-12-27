import React from "react";
import styled from "styled-components";
import { Text } from "../ui/StyledComponents";
import Logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <Container>
      <LogoContainer>
        <Image src={Logo} alt="Looking Fox Logo" />
      </LogoContainer>

      <Navigation>
        <Text link>Dashboard</Text>
        <Text link>Stats</Text>
        <Text link>Settings</Text>
      </Navigation>

      <AvatarContainer>
        <Avatar src={null} alt="user avatar" />
      </AvatarContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 8vh;
  min-height: 60px;
  background: #ededed;
  display: flex;
`;

const LogoContainer = styled.div`
  width: 15%;
  ${p => p.theme.flexAllCenter}
`;

const Navigation = styled.nav`
  width: 70%;
  padding: 0px 15vw;
  ${p => p.theme.flexEvenly}
`;

const Image = styled.img`
  height: 50%;
`;

const AvatarContainer = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
`;

const Avatar = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background: #777777;
  cursor: pointer;
`;

export default Header;
