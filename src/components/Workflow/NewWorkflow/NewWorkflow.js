import React, { Component } from "react";
import { Button, Text } from "../../../ui/StyledComponents";
import styled from "styled-components";
import { IoIosAdd, IoIosGitCompare } from "react-icons/io";
import NewWorkflowHeader from "./NewWorkflowHeader";
import Action from "./Action";
import DetailPanel from "./DetailPanel";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { checkForEmptyObject } from "../../../utils/utils";
import { addWorkflow } from "../../../thunks/workflowThunks";
import { toastSuccess } from "../../../reducers/toastSlice";

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
    const editingExistingWorkflow = !checkForEmptyObject(
      this.props.match.params
    );
    if (editingExistingWorkflow) {
      // Handle Edit Workflow Logic
    }
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
        this.props.toastSuccess("Workflow added");
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

    return (
      <Container>
        <NewWorkflowHeader
          wfTagColor={wfTagColor}
          handleAddWorkflow={this.handleAddWorkflow}
        />
        <InnerContainer>
          <DetailPanel
            wfName={wfName}
            wfTagColor={wfTagColor}
            wfActionsLength={wfActions.length}
            handleInput={this.handleInput}
            handleSelectNewColor={this.handleSelectNewColor}
          />
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

const mapDispatch = { addWorkflow, toastSuccess };

export default connect(null, mapDispatch)(NewWorkflow);
