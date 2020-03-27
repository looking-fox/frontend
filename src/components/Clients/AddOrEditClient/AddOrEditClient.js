import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getWorkflows } from "../../../thunks/workflowThunks";
import { Formik, Form } from "formik";
import {
  Field,
  FormErrorText,
  Textarea,
  Text
} from "../../../ui/StyledComponents";
import Select from "react-select";
import NewClientHeader from "./NewClientHeader";

class AddOrEditClient extends Component {
  state = { workflowOptions: [], selectedWorkflowId: null, newClient: true };

  async componentDidMount() {
    await this.props.getWorkflows();
    await this.generateOptions();
    const { params } = this.props.match;
    console.log("Params: ", params);
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
    }
    //TO DO: Phone Number Validation
    return errors;
  };

  handleSelectMenu = ({ value }) => {
    const { wfId } = this.state.workflowOptions[value] || {};
    this.setState({ selectedWorkflowId: wfId });
  };

  handleTextareaInput = ({ value }) => {
    this.setState({ customNote: value });
  };

  handleSubmitForm = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  render() {
    const { workflowOptions, newClient } = this.state;
    const initialFormState = { name: "", email: "", phone: "" };
    return (
      <Container>
        <Formik
          initialValues={initialFormState}
          validate={this.handleValidation}
          onSubmit={this.handleSubmitForm}
        >
          {({ isSubmitting, values: formState }) => (
            <Form>
              <NewClientHeader
                disabled={isSubmitting}
                newClient={newClient}
                formState={formState}
              />
              <FormContainer>
                <LeftPanel>
                  <Field type="name" name="name" placeholder="Name" />
                  <FormErrorText name="name" component="div" />

                  <Field type="email" name="email" placeholder="Email" />
                  <FormErrorText name="email" component="div" />

                  <Field type="phone" name="phone" placeholder="Phone Number" />
                  <FormErrorText name="phone" component="div" />

                  <StyledSelect
                    options={workflowOptions}
                    defaultValue={workflowOptions[0]}
                    onChange={this.handleSelectMenu}
                  />

                  <Textarea
                    placeholder="Custom Note..."
                    onChange={this.handleTextareaInput}
                  />
                </LeftPanel>
                <RightPanel>
                  <Text>Activity Panel Coming Soon!</Text>
                </RightPanel>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: hidden;
  position: relative;
`;

const FormContainer = styled.div`
  display: flex;
  overflow-y: auto;
`;

const LeftPanel = styled.div`
  width: 50vw;
  padding: 25px 50px;
  padding-top: 50px;
  box-sizing: border-box;
  height: calc(100vh - 120px);
`;

const RightPanel = styled.div`
  width: 50vw;
  height: calc(100vh - 120px);
  padding-top: 150px;
  text-align: center;
  box-sizing: border-box;
`;

const StyledSelect = styled(Select)`
  margin: 10px 0px;
`;

const mapState = state => {
  return { workflows: state.workflow.workflows };
};

const mapDispatch = { getWorkflows };

export default connect(mapState, mapDispatch)(AddOrEditClient);
