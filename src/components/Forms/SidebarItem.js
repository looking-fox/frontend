import React from "react";
import styled, { css } from "styled-components";
import { Text, Link } from "../../ui/StyledComponents";

const SidebarItem = ({ name, active, link, formIsOpen = false }) => (
  <Link to={`/forms/${link}`}>
    <Item formIsOpen={formIsOpen}>
      <Text>{name}</Text>
      {active ? <Bubble>Active</Bubble> : <StyledText>Draft</StyledText>}
    </Item>
  </Link>
);

const Item = styled.div`
  width: 100%;
  padding: 1em 0em;
  padding-left: 20px;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  display: flex;
  align-items: center;
  &:hover {
    background: #fafafa;
  }
  ${(p) =>
    p.formIsOpen &&
    css`
      background: #fafafa;
    `}
`;

const Bubble = styled(Text)`
  background: ${(p) => p.theme.green};
  color: white;
  font-weight: bold;
  border-radius: 3px;
  padding: 0.5em;
  font-size: 0.5em;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: fit-content;
  margin-left: 10px;
`;

const StyledText = styled(Text)`
  color: #cccccc;
  font-weight: bold;
  font-size: 0.7em;
  width: fit-content;
  margin-left: 10px;
  font-style: italic;
`;

export default SidebarItem;
