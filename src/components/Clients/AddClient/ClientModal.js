import React from "react";
import styled from "styled-components";
import { Text, Modal } from "../../../ui/StyledComponents";

const ClientModal = ({ showModal, handleToggleClientModal }) => {
  return (
    <Modal showModal={showModal} onClose={handleToggleClientModal}>
      <Text>Modal Space</Text>
    </Modal>
  );
};

export default ClientModal;
