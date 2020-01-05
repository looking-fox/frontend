import React, { Component } from "react";
import { Text } from "../ui/StyledComponents";
import { connect } from "react-redux";
import { getWorkflows } from "../thunks/workflowThunks";

class Workflows extends Component {
  componentDidMount() {
    // Grab initial workflows
    this.props.getWorkflows();
  }

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

const mapDispatch = { getWorkflows };

export default connect(mapState, mapDispatch)(Workflows);
