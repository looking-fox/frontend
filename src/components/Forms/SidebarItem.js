import React from "react";
import styled from "styled-components";
import { Text } from "../../ui/StyledComponents";

const SidebarItem = ({ name, active }) => (
  <Item>
    <Text>{name}</Text>
    {active && <Bubble>Active</Bubble>}
  </Item>
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
    background: ${p => p.theme.lightGrey};
  }
`;

const Bubble = styled(Text)`
  background: ${p => p.theme.green};
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

export default SidebarItem;
