import React, { useState } from "react";
import { Modal, Text } from "../ui/StyledComponents";

const Clients = () => {
  const [showModal, setShowModal] = useState(true);
  const toggle = () => {
    setShowModal(!showModal);
  };
  return (
    <div style={{ background: "#777777", height: "calc(100vh - 60px)" }}>
      <p onClick={toggle}>Clients</p>
      <Modal showModal={showModal} onClose={toggle} simpleModal>
        <Text>Wow what a good title.</Text>
      </Modal>
    </div>
  );
};

export default Clients;
