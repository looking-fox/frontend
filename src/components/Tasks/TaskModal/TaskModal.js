import React from "react";
// import styled from "styled-components";
import { connect } from "react-redux";
import { updateTask } from "../../../thunks/taskThunk";
import { toggleModal } from "../../../reducers/taskSlice";
// import { Formik, Form } from "formik";
import { Modal } from "../../../ui/StyledComponents";

const TaskModal = ({ showModal, toggleModal }) => {
  return (
    <Modal showModal={showModal} onClose={toggleModal}>
      <p>Modal Pop up!</p>
    </Modal>
  );
};

const mapState = (state) => {
  return {
    currentTask: state.tasks.currentTask,
    showModal: state.tasks.showModal,
  };
};

const mapDispatch = { updateTask, toggleModal };

export default connect(mapState, mapDispatch)(TaskModal);
