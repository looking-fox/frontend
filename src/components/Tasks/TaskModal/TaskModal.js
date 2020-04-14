import React, { useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateTask } from "../../../thunks/taskThunk";
import { toggleModal } from "../../../reducers/taskSlice";
import { Text } from "../../../ui/StyledComponents";
import TaskHeader from "./TaskHeader";
import { ModalBackground, ModalContainer } from "../../../ui/Modal";
import { useClickOffElement } from "./customHooks";

const TaskModal = ({ currentTask, showModal, toggleModal }) => {
  const { taskTitle } = currentTask;
  const customRef = useRef();
  const [clickedOffElement] = useClickOffElement(customRef, showModal);
  if (clickedOffElement && showModal) toggleModal();
  return (
    <ModalBackground show={showModal}>
      <ModalContainer noPadding ref={customRef}>
        <TaskHeader onClose={toggleModal} taskTitle={taskTitle} />
        <Text>Modal Info</Text>
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBody = styled.div`
  padding: 10px 25px;
`;

const mapState = (state) => {
  return {
    currentTask: state.tasks.currentTask,
    showModal: state.tasks.showModal,
  };
};

const mapDispatch = { updateTask, toggleModal };

export default connect(mapState, mapDispatch)(TaskModal);
