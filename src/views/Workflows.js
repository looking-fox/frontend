import React, { Component } from "react";
import { Text } from "../ui/StyledComponents";
import { connect } from "react-redux";

class Workflows extends Component {
  componentDidMount() {
    // Grab initial workflows
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

export default connect(mapState, null)(Workflows);
