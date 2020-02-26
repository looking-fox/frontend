import React from "react";
import styled from "styled-components";
import { Text, Modal } from "../../../ui/StyledComponents";

const ClientModal = ({ showModal }) => {
  return (
    <Modal showModal={showModal}>
      <Text>Modal Space</Text>
    </Modal>
  );
};

export default ClientModal;
