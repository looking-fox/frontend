import React, { Component } from "react";
import { Button, Text } from "../../../ui/StyledComponents";
import styled from "styled-components";
import { IoIosAdd, IoIosGitCompare } from "react-icons/io";
import NewWorkflowHeader from "./NewWorkflowHeader";
import Action from "./Action";
import DetailPanel from "./DetailPanel";
import { connect } from "react-redux";
import { checkForEmptyObject } from "../../../utils/utils";
import { addWorkflow, updateWorkflow } from "../../../thunks/workflowThunks";
import { toastSuccess } from "../../../reducers/toastSlice";

class NewWorkflow extends Component {
  state = {
    wfName: "",
    wfTagColor: "#c17258",
    wfId: null,
    wfActions: [
      { wfActionName: "New Inquiry", wfActionType: "task" },
      { wfActionName: "Send Info Guide", wfActionType: "task" },
      { wfActionName: "Send Contract", wfActionType: "task" },
      { wfActionName: "Get Paid", wfActionType: "task" }
    ],
    currentActionToEditIndex: null,
    newWorkflow: true
  };

  componentDidMount() {
    const { params } = this.props.match;
    const { workflows } = this.props;
    document.addEventListener("mousedown", this.handleClickOutside);
    const editingExistingWorkflow = !checkForEmptyObject(params);
    if (editingExistingWorkflow) {
      // Handle Edit Workflow Logic
      const idx = workflows.findIndex(item => item.wfId === +params.wfId);
      const { wfName, wfTagColor, wfActions } = workflows[idx] || {};
      this.setState({
        wfName,
        wfTagColor,
        wfId: +params.wfId,
        wfActions,
        newWorkflow: false
      });
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

  handleAddOrUpdateWorkflow = e => {
    e.preventDefault();
    try {
      const { wfId, wfActions, wfName, wfTagColor, newWorkflow } = this.state;
      if (!wfActions.length || !wfName.length || !wfTagColor.length) {
        // Create Toast UI ?
        return;
      } else {
        // Add new workflow
        const wfData = { wfName, wfTagColor, wfActions };
        newWorkflow
          ? this.props.addWorkflow(wfData)
          : this.props.updateWorkflow({ ...wfData, wfId });
        this.props.history.push("/workflows");
        this.props.toastSuccess(
          `Workflow ${newWorkflow ? "added" : "updated"}`
        );
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
      wfTagColor,
      newWorkflow
    } = this.state;
    const noActions = wfActions.length === 0;

    return (
      <Container>
        <NewWorkflowHeader
          wfTagColor={wfTagColor}
          newWorkflow={newWorkflow}
          handleAddOrUpdateWorkflow={this.handleAddOrUpdateWorkflow}
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
  height: calc(100vh - 60px);
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

const mapState = state => {
  return { workflows: state.workflow.workflows };
};

const mapDispatch = { addWorkflow, updateWorkflow, toastSuccess };

export default connect(mapState, mapDispatch)(NewWorkflow);
