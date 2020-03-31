import React, { Component } from "react";
import { connect } from "react-redux";
import { getForms } from "../../../thunks/formThunk";
import styled from "styled-components";
import Header from "./Header";
import { Formik, Form } from "formik";
import FormField from "./FormField";

class ViewForm extends Component {
  state = { form: {}, initialFormState: {} };

  async componentDidMount() {
    if (!this.props.forms.length) {
      // GET forms if no forms in props
      await this.props.getForms();
    }
    await this.handleLoadingForm();
  }

  handleLoadingForm = () => {
    let initialFormState = {};
    const { formLink } = this.props.match.params;
    const form =
      this.props.forms.find(form => form.formLink === formLink) || {};

    form.formFields &&
      form.formFields.map(field => {
        initialFormState[`formFieldTitle-${field.formFieldId}`] =
          field.formFieldTitle;
        initialFormState[`formFieldDescription-${field.formFieldId}`] =
          field.formFieldDescription;
        initialFormState[`formFieldPlaceholder-${field.formFieldId}`] =
          field.formFieldPlaceholder;
        initialFormState["formTitle"] = form.formTitle || "New Form";
      });
    this.setState({ form, initialFormState });
  };

  handleDeleteField = formFieldId => {
    let newForm = { ...this.state.form };
    let newFormFields = [...newForm.formFields];
    let idx = newFormFields.findIndex(f => f.formFieldId === formFieldId);
    newFormFields.splice(idx, 1);
    newForm.formFields = newFormFields;
    this.setState({ form: newForm });
  };

  handleValidation = values => {
    const errors = {};
    console.log("Validation Values: ", values);
    // if (!values.clientFullName) {
    //   errors.clientFullName = "Required";
    // }
    return errors;
  };

  handleSubmitForm = async (formInfo, { setSubmitting, resetForm }) => {
    console.log("Submit Form Info: ", formInfo);
    // setSubmitting(true);
    // setSubmitting(false);
    // resetForm();
  };

  render() {
    const { form, initialFormState } = this.state;
    // Do not render form without initial values
    if (Object.keys(initialFormState).length === 0) return null;
    else
      return (
        <Container>
          <FormContainer>
            <Formik
              initialValues={initialFormState}
              validate={this.handleValidation}
              onSubmit={this.handleSubmitForm}
            >
              {({ isSubmitting }) => (
                <>
                  <Form>
                    <Header submitDisabled={isSubmitting} />
                    <InnerForm>
                      {form.formFields.map((field, idx) => (
                        <FormField
                          key={field.formFieldId || idx}
                          field={field}
                          handleDeleteField={this.handleDeleteField}
                        />
                      ))}
                    </InnerForm>
                  </Form>
                </>
              )}
            </Formik>
          </FormContainer>
        </Container>
      );
  }
}

const Container = styled.div`
  width: 75vw;
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const InnerForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const mapState = state => ({ forms: state.forms.forms });
const mapDispatch = { getForms };

export default connect(mapState, mapDispatch)(ViewForm);
