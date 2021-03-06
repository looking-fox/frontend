import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getClients, updateClientProgress } from "../../thunks/clientThunk";
import Client from "./Client";
import ViewClientsHeader from "./ViewClientsHeader";
import AddOrEditClientModal from "./AddOrEditClientModal/AddOrEditClientModal";
import ClientTableTitles from "./ClientTableTitles";

class ViewClients extends Component {
  state = { showModal: false };

  componentDidMount() {
    this.props.clients.length === 0 && this.props.getClients();
  }

  handleClientActionChange = async (clientId, newIndex) => {
    await this.props.updateClientProgress({ clientId, newIndex });
  };

  handleToggleModal = () => {
    this.setState((state) => {
      return { showModal: !state.showModal };
    });
  };

  render() {
    return (
      <>
        <ViewClientsHeader handleToggleModal={this.handleToggleModal} />

        <Container>
          <ClientTableTitles />

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
  background: ${(p) => p.theme.colors.lightGrey};
  overflow-y: auto;
  padding: 0 15vw;
  box-sizing: border-box;
  padding-top: 25px;
`;

const mapState = (state) => {
  return { clients: state.clients.clients };
};

const mapDispatch = { getClients, updateClientProgress };

export default connect(mapState, mapDispatch)(ViewClients);
