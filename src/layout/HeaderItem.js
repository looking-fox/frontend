import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Text } from "../ui/StyledComponents";

const HeaderItem = ({ text = "", link = "", children }) => {
  return (
    <NavLink to={link}>
      <Text link withIcon>
        {children}
        {text}
      </Text>
    </NavLink>
  );
};

const NavLink = styled(Link)`
  text-decoration: none;
  &:link,
  &:visited {
    color: inherit;
  }
`;

export default HeaderItem;
