import React from "react";
import styled from "styled-components";
import { Text } from "../ui/StyledComponents";
import Logo from "../assets/images/logo.png";
import { connect } from "react-redux";
import { logout } from "../thunks/userThunks";

const Header = props => {
  console.log(props.user.profilePhotoUrl);
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
        <Avatar
          src={props.user.profilePhotoUrl}
          alt="user avatar"
          onClick={props.logout}
        />
      </AvatarContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 8vh;
  min-height: 60px;
  background: ${p => p.theme.lightGrey}
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

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  cursor: pointer;
`;

const mapDispatch = { logout };

const mapState = state => {
  return { user: state.user };
};

export default connect(mapState, mapDispatch)(Header);
