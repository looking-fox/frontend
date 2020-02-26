import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getClients, updateClientProgress } from "../../thunks/clientThunk";
import Client from "./Client";
import ViewClientsHeader from "./ViewClientsHeader";
import ClientModal from "./AddClient/ClientModal";

class ViewClients extends Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    this.props.clients.length === 0 && this.props.getClients();
  }

  handleClientActionChange = async (clientId, newIndex) => {
    await this.props.updateClientProgress({ clientId, newIndex });
  };

  handleToggleClientModal = () => {
    return this.setState(state => {
      return { showModal: !state.showModal };
    });
  };

  render() {
    const { clients } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <ViewClientsHeader
          handleToggleClientModal={this.handleToggleClientModal}
        />

        <ClientModal
          showModal={showModal}
          handleToggleClientModal={this.handleToggleClientModal}
        />

        <Container>
          {clients.map((client, idx) => {
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

const mapState = state => {
  return { clients: state.client.clients };
};

const mapDispatch = { getClients, updateClientProgress };

export default connect(mapState, mapDispatch)(ViewClients);

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
`;
