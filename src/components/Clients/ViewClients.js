import React, { Component } from "react";
import styled from "styled-components";
import { Text } from "../../ui/StyledComponents";
import { connect } from "react-redux";
import { getClients } from "../../thunks/clientThunk";
import Client from "./Client";

class ViewClients extends Component {
  componentDidMount() {
    this.props.clients.length === 0 && this.props.getClients();
  }

  render() {
    const { clients } = this.props;
    return (
      <Container>
        {clients.map((client, idx) => {
          return <Client key={client.clientId || idx} client={client} />;
        })}
      </Container>
    );
  }
}

const mapState = state => {
  return { clients: state.client.clients };
};
const mapDispatch = { getClients };

export default connect(mapState, mapDispatch)(ViewClients);

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
`;
