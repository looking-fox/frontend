import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getWorkflows } from "../../../thunks/workflowThunks";
import { addClient } from "../../../thunks/clientThunk";
import { Formik, Form } from "formik";
import {
  Field,
  FormErrorText,
  Modal,
  Button
} from "../../../ui/StyledComponents";
import CustomSelect from "../../../ui/formik/CustomSelect";
import CustomTextarea from "../../../ui/formik/CustomTextarea";

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
    if (!values.clientFullName) {
      errors.clientFullName = "Required";
    } else if (
      values.clientEmail &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.clientEmail)
    ) {
      errors.clientEmail = "Invalid email address";
    } else if (!values.wfId) {
      errors.wfId = "Required";
    } else if (!values.clientDate) {
      errors.clientDate = "Required";
    } else if (values.clientDate.length !== 10) {
      // Error with invalid date length
      errors.clientDate = "Invalid Date Format";
    }
    //TO DO: Phone Number Validation
    //TO DO: Refactor into utility function with yup validation
    return errors;
  };

  handleSubmitForm = async (newClientInfo, { setSubmitting }) => {
    setSubmitting(true);
    await this.props.addClient(newClientInfo);
    setSubmitting(false);
    await this.props.toggleModal();
  };

  render() {
    const { showModal, toggleModal } = this.props;
    const { workflowOptions, newClient } = this.state;
    const initialFormState = {
      clientFullName: "",
      clientEmail: "",
      clientPhone: "",
      clientDate: "",
      clientPrivateNote: "",
      wfId: null
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
              <Field
                type="clientFullName"
                name="clientFullName"
                placeholder="Name"
              />
              <FormErrorText name="clientFullName" component="div" />

              <Field
                type="clientEmail"
                name="clientEmail"
                placeholder="Email"
              />
              <FormErrorText name="clientEmail" component="div" />

              <Field
                type="clientPhone"
                name="clientPhone"
                placeholder="Phone Number"
              />
              <FormErrorText name="clientPhone" component="div" />

              <Field type="date" name="clientDate" />
              <FormErrorText name="clientDate" component="div" />

              <Field
                options={workflowOptions}
                component={CustomSelect}
                name="wfId"
                idName="wfId"
              />
              <FormErrorText name="wfId" component="div" />

              <Field
                name="clientPrivateNote"
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
