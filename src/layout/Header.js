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
        <Text link>Home</Text>
        <Text link>Stats</Text>
        <Text link>Settings</Text>
      </Navigation>
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
  width: 20%;
  ${p => p.theme.flexAllCenter}
`;

const Navigation = styled.nav`
  width: 80%;
  ${p => p.theme.flexEvenly}
`;

const Image = styled.img`
  height: 50%;
`;

export default Header;
