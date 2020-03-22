import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getClients, updateClientProgress } from "../../thunks/clientThunk";
import Client from "./Client";
import ViewClientsHeader from "./ViewClientsHeader";

class ViewClients extends Component {
  componentDidMount() {
    this.props.clients.length === 0 && this.props.getClients();
  }

  handleClientActionChange = async (clientId, newIndex) => {
    await this.props.updateClientProgress({ clientId, newIndex });
  };

  render() {
    return (
      <>
        <ViewClientsHeader />

        <Container>
          {this.props.clients.map((client, idx) => {
            return (
              <Client
                key={client.clientId || idx}
                client={client}
                handleClientActionChange={this.handleClientActionChange}
              />
            );
          })}
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
`;

const mapState = state => {
  return { clients: state.client.clients };
};

const mapDispatch = { getClients, updateClientProgress };

export default connect(mapState, mapDispatch)(ViewClients);
