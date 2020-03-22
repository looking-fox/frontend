import React, { Component } from "react";
import { connect } from "react-redux";
import { getWorkflows } from "../../../thunks/workflowThunks";
import styled from "styled-components";
import { Button, Modal, Input, TextArea } from "../../../ui/StyledComponents";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";

class ClientModal extends Component {
  async componentDidMount() {
    await this.props.getWorkflows();
    await this.generateOptions();
  }

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  generateOptions = () => {
    const workflowOptions = this.props.workflows.map((wf, idx) => {
      return { label: wf.wfName, value: idx };
    });
    this.setState({ workflowOptions });
  };

  handleValidation = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  handleSubmitForm = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  render() {
    const { showModal, handleToggleClientModal } = this.props;
    const initialFormState = { name: "", email: "", phone: "" };
    return (
      <Modal showModal={true} onClose={handleToggleClientModal}>
        <Formik
          initialValues={initialFormState}
          validate={this.handleValidation}
          onSubmit={this.handleSubmitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="name" name="name" />
              <StyErrorMessage name="name" component="div" />

              <Field type="email" name="email" />
              <StyErrorMessage name="email" component="div" />

              <Field type="phone" name="phone" />
              <StyErrorMessage name="phone" component="div" />

              <AddButton type="submit" disabled={isSubmitting}>
                Add Client
              </AddButton>
            </Form>
          )}
        </Formik>
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

const StyErrorMessage = styled(ErrorMessage)`
  color: red;
  margin: 10px 0px;
`;

const mapState = state => {
  return { workflows: state.workflow.workflows };
};

const mapDispatch = { getWorkflows };

export default connect(mapState, mapDispatch)(ClientModal);

{
  /* <Input
          placeholder="Name"
          name="clientName"
          onChange={this.handleInput}
        />
        <Input
          placeholder="Email"
          name="clientEmail"
          onChange={this.handleInput}
        />
        <Input
          placeholder="Phone #"
          name="clientPhoneNumber"
          onChange={this.handleInput}
        />
        <StyledSelect
          options={workflowOptions}
          defaultValue={workflowOptions[0]}
          onChange={({ value }) => alert("Value: ", value)}
        />
        <Input type="date" name="clientDate" onChange={this.handleInput} />
        <TextArea
          placeholder="Custom Note..."
          name="clientNote"
          onChange={this.handleInput}
        /><Input
        placeholder="Name"
        name="clientName"
        onChange={this.handleInput}
      />
      <Input
        placeholder="Email"
        name="clientEmail"
        onChange={this.handleInput}
      />
      <Input
        placeholder="Phone #"
        name="clientPhoneNumber"
        onChange={this.handleInput}
      />
      <StyledSelect
        options={workflowOptions}
        defaultValue={workflowOptions[0]}
        onChange={({ value }) => alert("Value: ", value)}
      />
      <Input type="date" name="clientDate" onChange={this.handleInput} />
      <TextArea
        placeholder="Custom Note..."
        name="clientNote"
        onChange={this.handleInput}
      /> */
}
