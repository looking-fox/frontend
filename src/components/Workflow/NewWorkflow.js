import React, { Component } from "react";
import { Input, Button, Text } from "../../ui/StyledComponents";
import styled, { css } from "styled-components";
import { IoIosAdd, IoIosGitCompare, IoMdColorFilter } from "react-icons/io";
import { actionTagColors } from "../../config/config";
import Action from "./Action";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

class NewWorkflow extends Component {
  state = {
    workflowName: "",
    workflowTagColor: "#c17258",
    workflowActions: [
      { wfActionName: "New Inquiry", wfActionType: "task" },
      { wfActionName: "Send Info Guide", wfActionType: "task" },
      { wfActionName: "Send Contract", wfActionType: "task" },
      { wfActionName: "Get Paid", wfActionType: "task" }
    ],
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
    this.setState({
      workflowActions: newActionList,
      currentActionToEditIndex: null
    });
  };

  handleToggleActionMode = idx => {
    this.setState({ currentActionToEditIndex: idx });
  };

  handleSelectNewColor = (newColor = "#000") => {
    console.log("New Color: ", newColor);
    this.setState({ workflowTagColor: newColor });
  };

  moveAction = (dragIndex, hoverIndex) => {
    const newActionList = [...this.state.workflowActions];
    const dragActionCard = newActionList[dragIndex];
    newActionList.splice(dragIndex, 1);
    newActionList.splice(hoverIndex, 0, dragActionCard);
    this.setState({ workflowActions: newActionList });
  };

  render() {
    const {
      workflowActions,
      currentActionToEditIndex,
      workflowName,
      workflowTagColor
    } = this.state;
    const noActions = workflowActions.length === 0;
    const activePreview = workflowName.length || workflowActions.length > 1;
    return (
      <Container>
        <HeaderSection>
          <HeaderTitle>Your New Workflow</HeaderTitle>
          <SaveButton backgroundColor={workflowTagColor}>
            Save Workflow
          </SaveButton>
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
            <PreviewContainer>
              <PreviewTitle>Workflow Preview:</PreviewTitle>
              <PreviewBar activePreview={activePreview}>
                <PreviewTagColor color={workflowTagColor}>
                  {workflowName || "Preview"}
                </PreviewTagColor>
                <PreviewSteps>{workflowActions.length} Steps</PreviewSteps>
              </PreviewBar>
            </PreviewContainer>
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

            <DndProvider backend={Backend}>
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
                    moveAction={this.moveAction}
                  />
                );
              })}
            </DndProvider>

            <Button
              outline
              withIcon
              style={{
                marginLeft: "auto",
                marginRight: "15%",
                marginTop: 25,
                marginBottom: 50
              }}
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
  height: 100%;
  background: ${p => p.theme.lightGrey};
  box-sizing: border-box;
  overflow: hidden;
`;

const HeaderSection = styled.div`
  background: white;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #ebebeb;
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
  height: calc(100vh - 120px),
  box-sizing: border-box;
  padding: 0px 50px;
  padding-top: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  box-sizing: border-box;
  margin-top: 25px;
`;

const PreviewTitle = styled(Text)`
  text-align: center;
  margin: 25px 0px;
  font-size: 1.1em;
`;

const PreviewBar = styled.div`
  background: white;
  border-radius: 3px;
  ${p => p.theme.sideBoxShadow};
  opacity: ${p => (p.activePreview ? 1 : 0.6)};
  display: flex;
  padding: 1em;
  display: flex;
  align-items: center;
  width: 90%;
`;

const PreviewTagColor = styled(Text)`
  background: ${p => (p.color ? p.color : p.theme.primaryColor)};
  color: white;
  font-weight: bold;
  border-radius: 3px;
  margin: 0em 0.25em;
  padding: 0.25em 0.5em;
`;

const PreviewSteps = styled(Text)`
  margin-left: auto;
  margin-right: 10px;
`;

const RightPanel = styled.div`
  width: 60vw;
  height: calc(100vh - 120px);
  box-sizing: border-box;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-left: 25px;
`;

const WorkflowInput = styled(Input)`
  background: white;
  width: 90%;
  margin-top: 25px;
`;

const ColorPickerContainer = styled.div`
  background: white;
  border-radius: 3px;
  padding: 1em;
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  width: 90%;
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
  margin: 50px 0px;
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
