import React, { Component } from "react";
import { connect } from "react-redux";
import { getForms } from "../../../thunks/formThunk";
import styled from "styled-components";
import Header from "./Header";
import { Formik, Form } from "formik";
import FormField from "./FormField";

class ViewForm extends Component {
  async componentDidMount() {
    if (!this.props.forms.length) {
      // GET forms if no forms in props
      await this.props.getForms();
    }
  }

  render() {
    const { formLink } = this.props.match.params;
    const form =
      this.props.forms.find(form => form.formLink === formLink) || {};
    const formWithContent = form.formFields && form.formFields.length;
    const initialFormState = {};
    return (
      <Container>
        <Header formTitle={form.formTitle} />
        <FormContainer>
          <Formik
            initialValues={initialFormState}
            validate={this.handleValidation}
            onSubmit={this.handleSubmitForm}
          >
            {({ isSubmitting }) => (
              <Form>
                {formWithContent &&
                  form.formFields.map((field, idx) => (
                    <FormField key={field.formFieldId || idx} field={field} />
                  ))}
              </Form>
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

const mapState = state => ({ forms: state.forms.forms });
const mapDispatch = { getForms };

export default connect(mapState, mapDispatch)(ViewForm);
