import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../thunks/userThunks";
import { defaultProfileUrl } from "../config/config";
import DropDownMenu from "./DropDownMenu";
import { IoMdPeople, IoIosGitCompare } from "react-icons/io";
import { FaWpforms } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import HeaderItem from "./HeaderItem";

const Header = (props) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);
  const handleToggleMenu = (visible) =>
    setShowUserMenu(visible || !showUserMenu);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    //Close menu if mouse clicked outside of Avatar Icon
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      showUserMenu
    ) {
      handleToggleMenu();
    }
  };

  const handleSignOut = async () => await props.logout();

  return (
    <Container>
      <LogoLink to="/">
        <Image src={Logo} alt="Looking Fox Logo" />
      </LogoLink>

      <Navigation>
        <HeaderItem text="Clients" link="/">
          <IoMdPeople />
        </HeaderItem>

        <HeaderItem text="Workflows" link="/workflows/">
          <IoIosGitCompare />
        </HeaderItem>

        <HeaderItem text="Forms" link="/forms/">
          <FaWpforms />
        </HeaderItem>

        <HeaderItem text="Tasks" link="/tasks/">
          <FiCheckSquare />
        </HeaderItem>
      </Navigation>

      <AvatarContainer ref={menuRef}>
        <Avatar
          src={props.user.profilePhotoUrl || defaultProfileUrl}
          alt="user avatar"
          onClick={handleToggleMenu}
        />
        <DropDownMenu
          visible={showUserMenu}
          handleToggleMenu={handleToggleMenu}
          handleSignOut={handleSignOut}
        />
      </AvatarContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  background: white;
  display: flex;
`;

const LogoLink = styled(Link)`
  width: 15vw;
  ${(p) => p.theme.flexAllCenter}
`;

const Navigation = styled.nav`
  width: 70vw;
  padding: 0px 20%;
  ${(p) => p.theme.flexEvenly}
`;

const Image = styled.img`
  height: 50%;
`;

const AvatarContainer = styled.div`
  width: 15vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
  position: relative;
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  cursor: pointer;
`;

const mapState = (state) => {
  return { user: state.user };
};

const mapDispatch = { logout };

export default connect(mapState, mapDispatch)(Header);
