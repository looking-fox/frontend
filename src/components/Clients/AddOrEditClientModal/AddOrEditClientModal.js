import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getWorkflows } from "../../../thunks/workflowThunks";
import { addClient } from "../../../thunks/clientThunk";
import { Formik, Form } from "formik";
import {
  Field,
  FormErrorText,
  Textarea,
  Modal
} from "../../../ui/StyledComponents";
import CustomSelect from "../../../ui/formik/CustomSelect";

import Select from "react-select";

class AddOrEditClientModal extends Component {
  state = {
    workflowOptions: [],
    selectedWorkflowId: null,
    newClient: true,
    customNote: ""
  };

  async componentDidMount() {
    await this.props.getWorkflows();
    await this.generateOptions();
  }

  generateOptions = () => {
    const workflowOptions = this.props.workflows.map((wf, idx) => {
      return { label: wf.wfName, value: idx, wfId: wf.wfId };
    });
    this.setState({ workflowOptions });
  };

  handleValidation = values => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    } else if (!this.state.selectedWorkflowId) {
      errors.workflowMenu = "Required";
    }
    //TO DO: Phone Number Validation
    return errors;
  };

  handleSelectMenu = ({ value }) => {
    const { wfId } = this.state.workflowOptions[value] || {};
    this.setState({ selectedWorkflowId: wfId });
  };

  handleTextareaInput = event => {
    this.setState({ customNote: event.target.value });
  };

  handleSubmitForm = async (values, { setSubmitting }) => {
    const newClient = {
      ...values,
      ...{
        customNote: this.state.customNote,
        workflowId: this.state.selectedWorkflowId
      }
    };
    const result = await this.props.addClient(newClient);
    console.log("Result: ", result);
    setSubmitting(false);
  };

  render() {
    const { showModal, toggleModal } = this.props;
    const { workflowOptions, newClient } = this.state;
    const initialFormState = { name: "", email: "", phone: "" };
    return (
      <Modal showModal={showModal} onClose={toggleModal}>
        <Formik
          initialValues={initialFormState}
          validate={this.handleValidation}
          onSubmit={this.handleSubmitForm}
        >
          {props => (
            <Form>
              <Field type="name" name="name" placeholder="Name" />
              <FormErrorText name="name" component="div" />

              <Field type="email" name="email" placeholder="Email" />
              <FormErrorText name="email" component="div" />

              <Field type="phone" name="phone" placeholder="Phone Number" />
              <FormErrorText name="phone" component="div" />

              <Field
                options={workflowOptions}
                defaultValue={workflowOptions[0]}
                onChange={this.handleSelectMenu}
                component={CustomSelect}
                isMulti={false}
                name="workflowMenu"
              />
              <FormErrorText name="workflowMenu" component="div" />

              <Textarea
                placeholder="Custom Note..."
                onChange={this.handleTextareaInput}
              />
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }
}

const StyledSelect = styled(Select)`
  margin: 10px 0px;
`;

const mapState = state => {
  return { workflows: state.workflow.workflows };
};

const mapDispatch = { getWorkflows, addClient };

export default connect(mapState, mapDispatch)(AddOrEditClientModal);
