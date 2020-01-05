import React, { Component } from "react";
import { Text } from "../ui/StyledComponents";
import { connect } from "react-redux";
import { getWorkflows, addWorkflow } from "../thunks/workflowThunks";

class Workflows extends Component {
  componentDidMount() {
    // Grab initial workflows
    this.props.getWorkflows();
  }

  handleAddNewWorkflow = () => {
    try {
      const newWorkflow = {
        wfName: "Adventure Session",
        wfTagColor: "blue",
        wfSteps: ["New Inquiry", "Send Questionnaire", "Book within 1 week"]
      };
      this.props.addWorkflow(newWorkflow);
    } catch (err) {
      // Handle Error
    }
  };

  render() {
    return (
      <div>
        <Text>Workflows</Text>
      </div>
    );
  }
}

const mapState = state => {
  return { workflows: state.workflows };
};

const mapDispatch = { getWorkflows, addWorkflow };

export default connect(mapState, mapDispatch)(Workflows);
