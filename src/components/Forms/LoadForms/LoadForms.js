import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getForms } from "../../../thunks/formThunk";
import { Spinner, Text } from "../../../ui/StyledComponents";

class LoadForms extends Component {
  state = { noForms: false };

  async componentDidMount() {
    await this.props.getForms();
    if (this.props.forms.length) {
      // Redirect to default form
      const { formLink } = this.props.forms[0];
      this.props.history.push(`/forms/${formLink}`);
    } else {
      // User has no forms
      this.setState({ noForms: true });
    }
  }

  render() {
    const { noForms } = this.state;
    return (
      <Container>
        {noForms ? (
          <>
            <Title>No Forms</Title>
            <Text>Click "Add Form" to Get Started!</Text>
          </>
        ) : (
          <Spinner color="black" size={50} />
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  width: 75vw;
  background: ${p => p.theme.lightGrey};
  box-sizing: border-box;
  ${p => p.theme.flexAllCenter}
  flex-direction: column;
`;

const Title = styled(Text)`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 25px;
`;

const mapState = state => {
  return { forms: state.forms.forms };
};

const mapDispatch = { getForms };

export default connect(mapState, mapDispatch)(LoadForms);
