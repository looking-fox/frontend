import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Header from "./Header";
import { Text } from "../../../ui/StyledComponents";

class ViewForm extends Component {
  render() {
    const { formLink } = this.props.match.params;
    const form =
      this.props.forms.find(form => form.formLink === formLink) || {};
    const formWithContent = form.formFields && form.formFields.length;

    return (
      <Container>
        <Header formTitle={form.formTitle} />
        <FormContainer>
          {formWithContent &&
            form.formFields.map((field, idx) => {
              return (
                <Text key={field.formFieldId || idx}>
                  {field.formFieldTitle}
                </Text>
              );
            })}
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
const mapDispatch = {};

export default connect(mapState, mapDispatch)(ViewForm);
