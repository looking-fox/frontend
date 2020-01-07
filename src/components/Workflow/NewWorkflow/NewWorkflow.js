import React, { Component } from "react";
import { Input, Button, Text } from "../../../ui/StyledComponents";
import styled, { css } from "styled-components";
import { IoIosAdd, IoIosGitCompare, IoMdColorFilter } from "react-icons/io";
import { actionTagColors } from "../../../config/config";
import NewWorkflowHeader from "./NewWorkflowHeader";
import Action from "./Action";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { addWorkflow } from "../../../thunks/workflowThunks";

class NewWorkflow extends Component {
  state = {
    wfName: "",
    wfTagColor: "#c17258",
    wfActions: [
      { wfActionName: "New Inquiry", wfActionType: "task" },
      { wfActionName: "Send Info Guide", wfActionType: "task" },
      { wfActionName: "Send Contract", wfActionType: "task" },
      { wfActionName: "Get Paid", wfActionType: "task" }
    ],
    currentActionToEditIndex: null
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (!e.target.draggable) {
      this.setState({ currentActionToEditIndex: null });
    }
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddNewAction = () => {
    const newActionList = this.state.wfActions.concat([
      { wfActionName: "", wfActionType: "task" }
    ]);
    this.setState({ wfActions: newActionList });
  };

  handleSaveActionName = (e, idx) => {
    const newActionList = [...this.state.wfActions];
    newActionList[idx]["wfActionName"] = e.target.value;
    this.setState({ wfActions: newActionList });
  };

  handleDeleteAction = idx => {
    const newActionList = [...this.state.wfActions];
    newActionList.splice(idx, 1);
    this.setState({
      wfActions: newActionList,
      currentActionToEditIndex: null
    });
  };

  handleToggleActionMode = (idx = 0) => {
    this.setState({ currentActionToEditIndex: idx });
  };

  handleToggleOffActions = () => {
    this.setState({ currentActionToEditIndex: null });
  };

  handleSelectNewColor = (newColor = "#000") => {
    this.setState({ wfTagColor: newColor });
  };

  moveAction = (dragIndex, hoverIndex) => {
    const newActionList = [...this.state.wfActions];
    const dragActionCard = newActionList[dragIndex];
    newActionList.splice(dragIndex, 1);
    newActionList.splice(hoverIndex, 0, dragActionCard);
    this.setState({ wfActions: newActionList });
  };

  handleAddWorkflow = e => {
    e.preventDefault();
    try {
      const { wfActions, wfName, wfTagColor } = this.state;
      if (!wfActions.length || !wfName.length || !wfTagColor.length) {
        // Create Toast UI ?
        return;
      } else {
        // Add new workflow
        this.props.addWorkflow({ wfName, wfTagColor, wfActions });
        this.props.history.push("/workflows");
      }
    } catch (err) {
      console.log("Error: ", err);
      // Handle Error
    }
  };

  render() {
    const {
      wfActions,
      currentActionToEditIndex,
      wfName,
      wfTagColor
    } = this.state;
    const noActions = wfActions.length === 0;
    const activePreview = wfName.length || wfActions.length > 1;

    return (
      <Container>
        <NewWorkflowHeader
          wfTagColor={wfTagColor}
          handleAddWorkflow={this.handleAddWorkflow}
        />
        <InnerContainer>
          <LeftPanel>
            <WorkflowInput
              placeholder="Type Workflow Name..."
              name="wfName"
              onChange={this.handleInput}
            />

            <ColorPickerContainer>
              <ColorText>
                <IoMdColorFilter />
                Select Tag Color
              </ColorText>
              <ColorSelector>
                {Object.keys(actionTagColors).map((item, idx) => {
                  const selected = actionTagColors[item] === wfTagColor;
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
                <PreviewTagColor color={wfTagColor}>
                  {wfName || "Preview"}
                </PreviewTagColor>
                <PreviewSteps>{wfActions.length} Steps</PreviewSteps>
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
              {wfActions.map((action, idx) => {
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

const mapDispatch = { addWorkflow };

export default connect(null, mapDispatch)(NewWorkflow);
