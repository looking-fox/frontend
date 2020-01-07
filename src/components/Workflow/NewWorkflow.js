import React, { Component } from "react";
import { Input, Button } from "../../ui/StyledComponents";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import Action from "./Action";

class NewWorkflow extends Component {
  state = {
    workflowName: "",
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

  render() {
    const { workflowActions, currentActionToEditIndex } = this.state;
    return (
      <Container>
        <WorkflowInput
          placeholder="Wedding"
          name="workflowName"
          onChange={this.handleInput}
        />
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
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 50px;
`;

const WorkflowInput = styled(Input)`
  background: #fff;
  width: 300px;
  margin-bottom: 25px;
`;

export default NewWorkflow;
