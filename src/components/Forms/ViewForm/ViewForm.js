import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getForms,
  addFormDraft,
  updateFormDraft,
  updateForm,
} from "../../../thunks/formThunk";
import styled from "styled-components";
import Header from "./Header";
import { Formik, Form } from "formik";
import FormField from "./FormField";
import AddField from "./AddField";
import { generateFormState } from "./formUtils";
import { mergeFormChanges } from "../../../utils/utils";

class ViewForm extends Component {
  state = {
    form: {},
    initialFormState: {},
    unpublishedChanges: false,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.formLink !== this.props.match.params.formLink ||
      prevProps.forms !== this.props.forms
    ) {
      this.handleLoadingForm();
    }
  }

  handleLoadingForm = () => {
    const { formLink: link } = this.props.match.params;
    const form = this.props.forms.find((form) => form.formLink === link) || {};
    const initialFormState = generateFormState(form);
    this.setState({
      form,
      initialFormState,
      unpublishedChanges: form.formDraftOf ? true : false,
    });
  };

  generateFormCopy = () => {
    let newForm = { ...this.state.form };
    let newFormFields = [...newForm.formFields];
    return [newForm, newFormFields];
  };

  generateNewField = (type = "SHORT_ANSWER") => {
    const formFieldOrder = this.state.form.formFields.length;
    const newField = {
      formFieldTitle: "Question",
      formFieldDescription: "",
      formFieldPlaceholder: "",
      formFieldType: type,
      formFieldOrder,
    };
    return newField;
  };

  handleDeleteField = (formFieldId) => {
    let [newForm, newFormFields] = this.generateFormCopy();
    let idx = newFormFields.findIndex((f) => f.formFieldId === formFieldId);
    newFormFields.splice(idx, 1);
    newForm.formFields = newFormFields;
    this.setState({ form: newForm });
  };

  handleAddField = () => {
    let [newForm, newFormFields] = this.generateFormCopy();
    let newField = this.generateNewField();
    newFormFields.push(newField);
    newForm.formFields = newFormFields;
    this.setState({ form: newForm });
  };

  handleValidation = async (values) => {
    const errors = {};
    Object.keys(values).filter((item) => {
      // Titles are required for all input fields
      if (item.includes("Title") && !values[item].length) {
        errors[item] = "Required";
      }
    });
    // Save draft if no form errors
    if (!Object.keys(errors).length) await this.handlePublishDraft(values);
    // Update UI and return errors object to formik
    else this.setState({ unpublishedChanges: true });
    return errors;
  };

  handlePublishDraft = async (values) => {
    const { form } = this.state;
    const updatedForm = mergeFormChanges(form, values, true);
    //Create or update draft
    if (form.formDraftOf) {
      await this.props.updateFormDraft(form.formId, updatedForm);
    } else {
      await this.props.addFormDraft(updatedForm);
      this.props.history.push(`/forms/${this.props.currentFormLink}`);
      await this.handleLoadingForm();
    }
  };

  handleSubmitForm = async (formUpdates, { setSubmitting }) => {
    const { form } = this.state;
    setSubmitting(true);
    const updatedForm = mergeFormChanges(form, formUpdates, false);
    await this.props.updateForm(form.formId, updatedForm);
    setSubmitting(false);
  };

  render() {
    const { form, initialFormState, unpublishedChanges } = this.state;
    // Do not render form without initial values
    if (Object.keys(initialFormState).length === 0) return null;
    else
      return (
        <Container>
          <FormContainer>
            <Formik
              validateOnBlur={true}
              validateOnChange={false}
              enableReinitialize={true}
              key={this.props.currentFormLink}
              initialValues={initialFormState}
              validate={this.handleValidation}
              onSubmit={this.handleSubmitForm}
            >
              {({ values, isSubmitting, isValid, isValidating }) => (
                <>
                  <Form>
                    <Header
                      isSubmitting={isSubmitting}
                      isValidating={isValidating}
                      isValid={isValid}
                      unpublishedChanges={unpublishedChanges}
                    />
                    <InnerForm>
                      {form.formFields.map((field, idx) => {
                        return (
                          <FormField
                            key={field.formFieldId || `field-${idx}`}
                            field={field}
                            values={values}
                            handleDeleteField={this.handleDeleteField}
                          />
                        );
                      })}
                      <AddField handleAddField={this.handleAddField} />
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
  width: 80vw;
  height: calc(100vh - 60px);
  background: ${(p) => p.theme.lightGrey};
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
  align-items: center;
  overflow-y: scroll;
  height: calc(100vh - 150px);
  padding: 25px 0px;
  padding-bottom: 50px;
  box-sizing: border-box;
`;

const mapState = (state) => ({
  forms: state.forms.forms,
  currentFormLink: state.forms.currentFormLink,
});
const mapDispatch = { getForms, addFormDraft, updateFormDraft, updateForm };

export default connect(mapState, mapDispatch)(ViewForm);
