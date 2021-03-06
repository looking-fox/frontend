import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getForms,
  addFormDraft,
  updateFormDraft,
  updateForm,
  publishForm,
} from "../../../thunks/formThunk";
import styled from "styled-components";
import Header from "./Header";
import { Formik, Form } from "formik";
import FormField from "./FormField";
import AddField from "./AddField";
import { generateFormState } from "./formUtils";
import { mergeFormChanges } from "../../../utils/utils";
import isEqual from "lodash.isequal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // change opacity if dragging
  opacity: isDragging ? 0.5 : 1,
  width: "calc(100% - 75px)",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class ViewForm extends Component {
  state = {
    form: {},
    initialFormState: {},
    unpublishedChanges: false,
  };

  async componentDidMount() {
    if (!this.props.forms.length) await this.props.getForms();
    // Handle page refresh with empty state
    if (!Object.keys(this.state.form).length) {
      this.handleLoadingForm();
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) this.handleLoadingForm();
    if (prevProps.currentFormLink !== this.props.currentFormLink) {
      this.props.history.push(`/forms/${this.props.currentFormLink}`);
    }
  }

  handleLoadingForm = () => {
    const { formLink: link } = this.props.match.params;
    const form = this.props.forms.find((form) => form.formLink === link) || {};
    if (!Object.keys(form).length) {
      return this.props.history.push("/forms/");
    }
    const initialFormState = generateFormState(form);
    this.setState({
      form,
      initialFormState,
      unpublishedChanges: form.formDraftOf ? true : false,
    });
  };

  handlePublishNewField = (form, initialFormState) => {
    this.setState({ form, initialFormState, unpublishedChanges: true });
  };

  handleDeleteField = (formFieldId) => {
    let [newForm, newFormFields] = this.generateFormCopy();
    let idx = newFormFields.findIndex((f) => f.formFieldId === formFieldId);
    newFormFields.splice(idx, 1);
    newForm.formFields = newFormFields;
    this.setState({ form: newForm }, () => this.handlePublishDraft());
  };

  handleValidation = async (values = {}) => {
    const errors = {};
    Object.keys(values).map((item) => {
      // Titles are required for all input fields
      if (item.includes("Title") && !values[item])
        return (errors[item] = "Required");
      else return item;
    });
    // Save draft if no form errors
    if (!Object.keys(errors).length) await this.handlePublishDraft(values);
    // Update UI and return errors object to formik
    else this.setState({ unpublishedChanges: true });
    return errors;
  };

  handleUpdateForm = async (fieldString, fieldValue) => {
    const initForm = JSON.parse(JSON.stringify(this.state.initialFormState));
    initForm[fieldString] = fieldValue;
    const noChanges = isEqual(initForm, this.state.initialFormState);
    if (noChanges) return;
    await this.handlePublishDraft(initForm);
  };

  handlePublishDraft = async (values = {}) => {
    const { form } = this.state;
    const updatedForm = mergeFormChanges(form, values, true);
    //Create or update draft
    if (form.formDraftOf) {
      await this.props.updateFormDraft(form.formId, updatedForm);
    } else {
      await this.props.addFormDraft(updatedForm);
      this.props.history.replace(`/forms/${this.props.currentFormLink}`);
      await this.handleLoadingForm();
    }
  };

  handleSubmitForm = async () => {
    await this.props.publishForm(this.state.form.formId);
    this.props.history.replace(`/forms/${this.props.currentFormLink}`);
  };

  onDragEnd = ({ source, destination }, cb) => {
    // dropped outside the list
    if (!destination) return;
    let newForm = JSON.parse(JSON.stringify(this.state.form));
    const { formFields: newFormFields } = newForm;
    // swap stored list order fields
    newFormFields[source.index]["formFieldOrder"] = destination.index;
    newFormFields[destination.index]["formFieldOrder"] = source.index;
    // swap in array stored in state
    const formFields = reorder(newFormFields, source.index, destination.index);
    newForm.formFields = formFields;
    this.setState({ form: newForm }, () => cb(true));
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
              {({
                values,
                errors,
                isSubmitting,
                isValid,
                isValidating,
                validateForm,
              }) => {
                return (
                  <>
                    <Form>
                      <Header
                        isSubmitting={isSubmitting}
                        isValidating={isValidating}
                        isValid={isValid}
                        unpublishedChanges={unpublishedChanges}
                      />

                      <InnerForm>
                        <DragDropContext
                          onDragEnd={(e) => this.onDragEnd(e, validateForm)}
                        >
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {form.formFields.map((field, idx) => {
                                  const lastField = form.formFields.length <= 1;
                                  return (
                                    <Draggable
                                      key={String(idx)}
                                      draggableId={String(idx)}
                                      index={idx}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          )}
                                        >
                                          <FormField
                                            key={
                                              field.formFieldId ||
                                              `field-${idx}`
                                            }
                                            values={values}
                                            errors={errors}
                                            field={field}
                                            lastField={lastField}
                                            handleUpdateForm={
                                              this.handleUpdateForm
                                            }
                                            handleDeleteField={
                                              this.handleDeleteField
                                            }
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>

                        <AddField
                          form={form}
                          handlePublishNewField={this.handlePublishNewField}
                        />
                      </InnerForm>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </FormContainer>
        </Container>
      );
  }
}

const Container = styled.div`
  width: 80vw;
  height: calc(100vh - 60px);
  background: ${(p) => p.theme.colors.lightGrey};
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

const mapDispatch = {
  getForms,
  addFormDraft,
  updateFormDraft,
  updateForm,
  publishForm,
};

export default connect(mapState, mapDispatch)(ViewForm);
