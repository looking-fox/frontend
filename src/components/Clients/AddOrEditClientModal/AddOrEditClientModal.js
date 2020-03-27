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
  Modal,
  Button
} from "../../../ui/StyledComponents";
import CustomSelect from "../../../ui/formik/CustomSelect";
import CustomTextarea from "../../../ui/formik/CustomTextarea";

import Select from "react-select";

class AddOrEditClientModal extends Component {
  state = {
    workflowOptions: [],
    newClient: true
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
    } else if (!values.workflowMenu) {
      errors.workflowMenu = "Required";
    }
    //TO DO: Phone Number Validation
    return errors;
  };

  handleSubmitForm = async (newClientInfo, { setSubmitting }) => {
    const result = await this.props.addClient(newClientInfo);
    console.log("Result: ", result);
    setSubmitting(false);
  };

  render() {
    const { showModal, toggleModal } = this.props;
    const { workflowOptions, newClient } = this.state;
    const res = workflowOptions.length ? workflowOptions[0]["wfId"] : null;
    const initialFormState = {
      name: "",
      email: "",
      phone: "",
      customNote: "",
      workflowMenu: res
    };

    return (
      <Modal showModal={showModal} onClose={toggleModal}>
        <Formik
          initialValues={initialFormState}
          validate={this.handleValidation}
          onSubmit={this.handleSubmitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="name" name="name" placeholder="Name" />
              <FormErrorText name="name" component="div" />

              <Field type="email" name="email" placeholder="Email" />
              <FormErrorText name="email" component="div" />

              <Field type="phone" name="phone" placeholder="Phone Number" />
              <FormErrorText name="phone" component="div" />

              <Field
                options={workflowOptions}
                component={CustomSelect}
                name="workflowMenu"
                value={res}
                idName="wfId"
              />
              <FormErrorText name="workflowMenu" component="div" />

              <Field
                name="customNote"
                component={CustomTextarea}
                placeholder="Custom Note..."
              />

              <StySubmitButton type="submit" disabled={isSubmitting}>
                Submit
              </StySubmitButton>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }
}

const StySubmitButton = styled(Button)`
  margin: 10px;
  margin-left: auto;
`;

const mapState = state => {
  return { workflows: state.workflow.workflows };
};

const mapDispatch = { getWorkflows, addClient };

export default connect(mapState, mapDispatch)(AddOrEditClientModal);
