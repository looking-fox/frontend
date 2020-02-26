import React from "react";
import styled from "styled-components";
import { Text } from "../../ui/StyledComponents";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? state.selectProps.menuColor : "inherit",
    fontSize: 14
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const fontSize = 14;
    return { ...provided, opacity, transition, fontSize };
  }
};

const generateOptions = wfActions => {
  return wfActions.map((action, idx) => {
    return { label: action.wfActionName, value: idx };
  });
};

const Client = ({ client, handleClientActionChange }) => {
  let clientDate = client.clientDate
    ? new Date(client.clientDate).toDateString()
    : "No Date";
  const options = generateOptions(client.wfActions);
  return (
    <Container>
      <PanelText>{client.clientFullName}</PanelText>
      <WorkflowBubble bubbleColor={client.wfTagColor}>
        {client.wfName}
      </WorkflowBubble>
      <PanelText>{clientDate}</PanelText>

      <SelectWrapper>
        <Select
          options={options}
          defaultValue={options[client.currentWfIndex]}
          menuColor={client.wfTagColor}
          styles={customStyles}
          onChange={({ value }) =>
            handleClientActionChange(client.clientId, value)
          }
        />
      </SelectWrapper>
    </Container>
  );
};

export default Client;

const Container = styled.div`
  background: white;
  margin: 25px 0px;
  padding: 1em;
  border-radius: 3px;
  ${p => p.theme.sideBoxShadow};
  min-width: fit-content;
  display: grid;
  grid-template-rows: 1;
  grid-template-columns: repeat(4, 1fr);
`;

const PanelText = styled(Text)`
  margin: 0px 25px;
  display: flex;
  align-items: center;
`;

const WorkflowBubble = styled(Text)`
  width: fit-content;
  height: fit-content;
  background: ${p => p.bubbleColor};
  color: white;
  font-weight: bold;
  margin: 0px 10px;
  padding: 3px 5px;
  border-radius: 3px;
  display: flex;
  align-self: center;
`;

const SelectWrapper = styled.div`
  width: 150px;
`;
