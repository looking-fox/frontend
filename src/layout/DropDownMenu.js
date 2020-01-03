import React from "react";
import { Text } from "../ui/StyledComponents";
import styled from "styled-components";
import { Link } from "react-router-dom";

const DropDownMenu = ({ visible = false, handleSignOut }) => {
  return visible ? (
    <Menu aria-haspopup="true" aria-expanded="false">
      <MenuLink to="/account">
        <MenuItem role="menuitem">Account</MenuItem>
      </MenuLink>

      <MenuLink to="/settings">
        <MenuItem role="menuitem">Settings</MenuItem>
      </MenuLink>

      <MenuItem role="menuitem" onClick={handleSignOut}>
        Sign Out
      </MenuItem>
    </Menu>
  ) : null;
};

const Menu = styled.div`
  width: 150px;
  min-width: fit-content;
  background: white;
  border-radius: 3px;
  position: absolute;
  top: 45px;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${p => p.theme.darkBoxShadow}
  overflow: hidden;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  &:link,
  &:visited {
    color: inherit;
  }
`;

const MenuItem = styled(Text)`
  padding: 10px 0px;
  padding-left: 15px;
  cursor: pointer;
  transition: all 50ms ease-in-out;
  &:hover {
    background: ${p => p.theme.lightGrey};
  }
`;

export default DropDownMenu;
