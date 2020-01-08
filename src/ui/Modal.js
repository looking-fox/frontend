import React from "react";
import styled from "styled-components";
import { Text, SimpleButton } from "./StyledComponents";
import { IoMdClose } from "react-icons/io";

const Modal = ({ children, showModal, simpleModal, onClose, onConfirm }) => {
  return (
    <ModalContainer show={showModal} simpleModal={simpleModal}>
      <ModalHeader>
        <CloseIcon onClick={onClose} />
      </ModalHeader>
      {simpleModal ? (
        <>
          <ModalBody>
            <ModalTitle>Are you sure?</ModalTitle>
            <ModalDescription>
              This action cannot be undone. Even if you like, really want to
              undo it.{" "}
            </ModalDescription>
          </ModalBody>
          <ModalActions>
            <ModalButton outline error onClick={onClose}>
              Cancel
            </ModalButton>
            <ModalButton outline success onClick={onConfirm}>
              Confirm
            </ModalButton>
          </ModalActions>
        </>
      ) : (
        children
      )}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 3px;
  ${p => p.theme.boxShadow};
  display: ${p => (p.show ? "inherit" : "none")};
  max-width: ${p => (p.simpleModal ? "400px" : "80vw")};
  min-width: 300px;
  min-height: 20vh;
  padding: 10px 25px;
  overflow: hidden;
  animation: fadeIn 200ms ease-in-out;
  @keyframes fadeIn {
    from {
      transform: translate(-50%, -40%);
    }
    to {
      transform: translate(-50%, -50%);
    }
  }
`;

const ModalHeader = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0.5em 0em;
`;

const ModalBody = styled.div`
  padding: 10px 0px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-self: flex-end;
  padding-top: 25px;
  padding-bottom: 10px;
`;

const CloseIcon = styled(IoMdClose)`
  margin-left: auto;
  cursor: pointer;
  font-size: 1.5em;
`;

const ModalTitle = styled(Text)`
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  padding-bottom: 0.25em;
  line-height: 125%;
`;

const ModalDescription = styled(Text)`
  font-size: 1.1em;
  text-align: center;
  line-height: 125%;
  color: #777777;
`;

const ModalButton = styled(SimpleButton)`
  margin: 0;
  margin-left: 1em;
`;

export default Modal;
