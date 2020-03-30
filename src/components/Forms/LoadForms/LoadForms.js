import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getForms } from "../../../thunks/formThunk";
import { Spinner, Text } from "../../../ui/StyledComponents";

const LoadForms = props => {
  const [showLoadingIcon, setLoadingIcon] = useState(false);
  const [noForms, setNoForms] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoadingIcon(true);
    }, 750);

    async function loadForms() {
      await props.getForms();
      if (props.forms.length) {
        // Redirect to default form
        const { formLink } = props.forms[0];
        props.history.push(`/forms/${formLink}`);
      } else {
        // User has no forms
        setNoForms(true);
      }
    }

    loadForms();

    return () => clearTimeout(loadingTimer);
  }, [props.forms]);

  return (
    <Container>
      {noForms && !showLoadingIcon ? (
        <>
          <Title>No Forms</Title>
          <Text>Click "Add Form" to Get Started!</Text>
        </>
      ) : (
        <Spinner color="black" size={50} visible={showLoadingIcon} />
      )}
    </Container>
  );
};

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
