import React, { Component } from "react";
import { Input, Button, Text } from "../../ui/StyledComponents";
import styled, { css } from "styled-components";
import {
  IoIosAdd,
  IoIosGitCompare,
  IoMdColorFilter,
  IoIosBookmark
} from "react-icons/io";
import { actionTagColors } from "../../config/config";
import Action from "./Action";

class NewWorkflow extends Component {
  state = {
    workflowName: "",
    workflowTagColor: "#c17258",
    workflowActions: [{ wfActionName: "New Inquiry", wfActionType: "task" }],
    currentActionToEditIndex: null
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddNewAction = () => {
    const newActionList = this.state.workflowActions.concat([
      { wfActionName: "", wfActionType: "task" }
    ]);
    this.setState({ workflowActions: newActionList });
  };

  handleSaveActionName = (e, idx) => {
    const newActionList = [...this.state.workflowActions];
    newActionList[idx]["wfActionName"] = e.target.value;
    this.setState({ workflowActions: newActionList });
  };

  handleDeleteAction = idx => {
    const newActionList = [...this.state.workflowActions];
    newActionList.splice(idx, 1);
    this.setState({ workflowActions: newActionList });
  };

  handleToggleActionMode = idx => {
    this.setState({ currentActionToEditIndex: idx });
  };

  handleSelectNewColor = (newColor = "#000") => {
    console.log("New Color: ", newColor);
    this.setState({ workflowTagColor: newColor });
  };

  render() {
    const {
      workflowActions,
      currentActionToEditIndex,
      workflowTagColor
    } = this.state;
    const noActions = workflowActions.length === 0;

    return (
      <Container>
        <HeaderSection>
          <HeaderTitle>Your New Workflow</HeaderTitle>
          <SaveButton>Save Workflow</SaveButton>
        </HeaderSection>
        <InnerContainer>
          <LeftPanel>
            <WorkflowInput
              placeholder="Wedding"
              name="workflowName"
              onChange={this.handleInput}
            />

            <ColorPickerContainer>
              <ColorText>
                <IoMdColorFilter />
                Select Tag Color
              </ColorText>
              <ColorSelector>
                {Object.keys(actionTagColors).map((item, idx) => {
                  const selected = actionTagColors[item] === workflowTagColor;
                  return (
                    <ColorIcon
                      color={actionTagColors[item]}
                      key={idx}
                      selected={selected}
                      onClick={() =>
                        this.handleSelectNewColor(actionTagColors[item])
                      }
                    />
                  );
                })}
              </ColorSelector>
            </ColorPickerContainer>
          </LeftPanel>

          <RightPanel>
            {noActions && (
              <EmptyDisplayContainer>
                <EmptyIcon />
                <EmpyText>
                  No steps in your new workflow. Please click{" "}
                  <span>add task</span> to begin.
                </EmpyText>
              </EmptyDisplayContainer>
            )}
            {workflowActions.map((action, idx) => {
              const isInEditMode = idx === currentActionToEditIndex;
              return (
                <Action
                  idx={idx}
                  stepNumber={idx + 1}
                  text={action.wfActionName}
                  key={idx}
                  isInEditMode={isInEditMode}
                  handleToggleActionMode={this.handleToggleActionMode}
                  handleSaveActionName={this.handleSaveActionName}
                  handleDeleteAction={this.handleDeleteAction}
                />
              );
            })}

            <Button
              outline
              withIcon
              style={{ marginLeft: "auto", marginRight: "15%", marginTop: 25 }}
              onClick={this.handleAddNewAction}
            >
              <IoIosAdd />
              Add Task
            </Button>
          </RightPanel>
        </InnerContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  box-sizing: border-box;
`;

const HeaderSection = styled.div`
  background: white;
  padding: 1.5em 0em;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled(Text)`
  font-size: 1.5em;
  font-weight: bold;
  padding-left: 50px;
`;

const SaveButton = styled(Button)`
  margin-left: auto;
  margin-right: 50px;
`;

const InnerContainer = styled.div`
  display: flex;
`;

const LeftPanel = styled.div`
  width: 40vw;
  padding: 0px 50px;
  padding-top: 25px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const RightPanel = styled.div`
  width: 60vw;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 50px;
`;

const WorkflowInput = styled(Input)`
  background: white;
  width: 90%;
`;

const ColorPickerContainer = styled.div`
  background: white;
  border-radius: 3px;
  padding: 1em;
  margin-top: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  width: 80%;
  box-sizing: border-box;
  ${p => p.theme.sideBoxShadow};
`;

const ColorSelector = styled.div`
  display: flex;
`;

const ColorText = styled(Text)`
  font-size: 1em;
  text-align: center;
  margin-bottom: 25px;
  ${p => p.theme.flexAllCenter};
  & svg {
    margin-right: 5px;
  }
`;

const ColorIcon = styled.div`
  background: ${p => p.color || p.theme.primaryColor};
  border-radius: 50%;
  height: 25px;
  min-height: 25px;
  width: 25px;
  min-width: 25px;
  margin: 0px 20px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  &:hover {
    ${p => p.theme.sideBoxShadow};
    transform: scale(1.1);
  }
  ${p =>
    p.selected
      ? css`
          opacity: 1;
          transform: scale(1.1);
          margin: 0px 25px;
        `
      : css`
          opacity: 0.5;
        `}
`;

const EmptyDisplayContainer = styled.div`
  margin-bottom: 50px;
  ${p => p.theme.flexAllCenter};
  flex-direction: column;
`;

const EmpyText = styled(Text)`
  font-size: 1.2em;
  & span {
    font-weight: bold;
  }
`;

const EmptyIcon = styled(IoIosGitCompare)`
  margin: 10px auto;
  margin-bottom: 25px;
  font-size: 2.5em;
`;

export default NewWorkflow;
