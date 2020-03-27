import React, { Component, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getClients, updateClientProgress } from "../../thunks/clientThunk";
import Client from "./Client";
import ViewClientsHeader from "./ViewClientsHeader";
import AddOrEditClientModal from "./AddOrEditClientModal/AddOrEditClientModal";

class ViewClients extends Component {
  state = { showModal: false };

  componentDidMount() {
    this.props.clients.length === 0 && this.props.getClients();
  }

  handleClientActionChange = async (clientId, newIndex) => {
    await this.props.updateClientProgress({ clientId, newIndex });
  };

  handleToggleModal = () => {
    this.setState(state => {
      return { showModal: !state.showModal };
    });
  };

  render() {
    return (
      <>
        <ViewClientsHeader handleToggleModal={this.handleToggleModal} />

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

        <AddOrEditClientModal
          showModal={this.state.showModal}
          toggleModal={this.handleToggleModal}
        />
      </>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 120px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
`;

const mapState = state => {
  return { clients: state.client.clients };
};

const mapDispatch = { getClients, updateClientProgress };

export default connect(mapState, mapDispatch)(ViewClients);
