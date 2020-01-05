import React from "react";
import { Text } from "../ui/StyledComponents";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const DropDownMenu = ({ visible = false, handleToggleMenu, handleSignOut }) => {
  const history = useHistory();
  const handleRouteChange = async (route = "") => {
    // Close drawer UI before pushing new route
    await handleToggleMenu();
    history.push(`/${route}`);
  };
  return visible ? (
    <Menu aria-haspopup="true" aria-expanded="false">
      <MenuItem role="menuitem" onClick={() => handleRouteChange("account")}>
        Account
      </MenuItem>

      <MenuItem role="menuitem" onClick={() => handleRouteChange("settings")}>
        Settings
      </MenuItem>

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
