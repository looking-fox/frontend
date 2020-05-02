import React from "react";
import styled from "styled-components";
import { Text, SimpleButton } from "./StyledComponents";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  children,
  showModal,
  simpleModal,
  noPadding,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = null,
}) => {
  return (
    <ModalBackground show={showModal}>
      <ModalContainer simpleModal={simpleModal} noPadding={noPadding}>
        <ModalHeader>
          <CloseIcon onClick={onClose} />
        </ModalHeader>

        {simpleModal ? (
          <>
            <ModalBody>
              <ModalTitle>{title}</ModalTitle>
              <ModalDescription>{description}</ModalDescription>
            </ModalBody>
            <ModalActions>
              <ModalButton fullWidth error onClick={onConfirm}>
                Yes
              </ModalButton>
            </ModalActions>
          </>
        ) : (
          children
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  display: ${(p) => (p.show ? "inherit" : "none")};
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 3px;
  ${(p) => p.theme.boxShadow};
  max-width: ${(p) => (p.simpleModal ? "350px" : "80vw")};
  min-width: 300px;
  min-height: 20vh;
  padding: ${(p) => (p.noPadding ? "0px" : "10px 25px")};
`;

const ModalHeader = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0.5em 0em;
`;

const ModalBody = styled.div`
  padding-bottom: 10px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-self: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const CloseIcon = styled(IoMdClose)`
  margin-left: auto;
  cursor: pointer;
  font-size: 1.5em;
`;

const ModalTitle = styled(Text)`
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  line-height: 125%;
  width: 80%;
  margin: 0 auto;
`;

const ModalDescription = styled(Text)`
  font-size: 1em;
  text-align: center;
  line-height: 125%;
  color: #777777;
  padding-top: 10px;
  width: 80%;
  margin: 0 auto;
`;

const ModalButton = styled(SimpleButton)`
  min-width: 50px;
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
`;

export default Modal;
