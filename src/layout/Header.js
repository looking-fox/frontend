import React from "react";
import styled from "styled-components";
import { Text } from "../ui/StyledComponents";

const Header = () => {
  return (
    <Container>
      <Text link>Home</Text>
      <Text link>Stats</Text>
      <Text link>Settings</Text>
    </Container>
  );
};

const Container = styled.div`
  height: 8vh;
  background: #ededed;
  ${p => p.theme.flexEvenly}
`;

export default Header;
