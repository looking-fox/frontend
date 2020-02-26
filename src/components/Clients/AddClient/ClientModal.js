import React, { Component } from "react";
import { connect } from "react-redux";
import { getWorkflows } from "../../../thunks/workflowThunks";
import styled from "styled-components";
import { Button, Modal, Input, TextArea } from "../../../ui/StyledComponents";
import Select from "react-select";

class ClientModal extends Component {
  state = { workflowOptions: [{ label: "Choose Workflow...", value: null }] };

  async componentDidMount() {
    await this.props.getWorkflows();
    await this.generateOptions();
  }

  generateOptions = () => {
    const workflowOptions = this.props.workflows.map((wf, idx) => {
      return { label: wf.wfName, value: idx };
    });
    this.setState({ workflowOptions });
  };

  render() {
    const { showModal, handleToggleClientModal } = this.props;
    const { workflowOptions } = this.state;
    return (
      <Modal showModal={true} onClose={handleToggleClientModal}>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Phone #" />
        <StyledSelect
          options={workflowOptions}
          defaultValue={workflowOptions[0]}
          onChange={({ value }) => alert("Value: ", value)}
        />
        <Input type="date" />
        <TextArea />
        <AddButton>Add Client</AddButton>
      </Modal>
    );
  }
}

const AddButton = styled(Button)`
  margin: 10px 0px;
  margin-left: auto;
`;

const StyledSelect = styled(Select)`
  margin: 10px 0px;
`;

const mapState = state => {
  return { workflows: state.workflow.workflows };
};

const mapDispatch = { getWorkflows };

export default connect(mapState, mapDispatch)(ClientModal);
