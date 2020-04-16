import React, { useRef, useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateTask } from "../../../thunks/taskThunk";
import { toggleModal } from "../../../reducers/taskSlice";
import { Text, Textarea, Button, Checkbox } from "../../../ui/StyledComponents";
import TaskHeader from "./TaskHeader";
import { ModalBackground, ModalContainer } from "../../../ui/Modal";
import { useClickOffElement, enhancedReducer } from "./customHooks";
import DetailPanel from "./DetailPanel";
import { FaRegStickyNote } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";

const TaskModal = ({ currentTask, showModal, toggleModal }) => {
  const { taskDueDate, taskPriority } = currentTask;

  const customRef = useRef();
  useClickOffElement(customRef, showModal, toggleModal);

  const [store, dispatch] = useReducer(enhancedReducer, currentTask);

  const handleFormChange = React.useCallback(
    ({ target: { value, name, type } }) => {
      dispatch({ key: name, value });
    },
    []
  );

  return (
    <ModalBackground show={showModal}>
      <ModalContainer noPadding ref={customRef}>
        <TaskHeader
          taskTitle={store.taskTitle}
          handleUpdate={handleFormChange}
          onClose={toggleModal}
        />

        <ModalBody>
          <LeftPanel>
            <NotesPanel>
              <TitleText>
                <FaRegStickyNote /> Notes
              </TitleText>
              <Textarea
                noBorder
                name="taskNotes"
                value={store.taskNotes || ""}
                onChange={handleFormChange}
                placeholder="Description..."
              />
            </NotesPanel>

            <ToDoPanel>
              <TitleText>
                <FiCheckSquare /> To Do List
              </TitleText>
              <ToDoInnerPanel>
                <Checkbox label="Get groceries!" checked={true} />
              </ToDoInnerPanel>
            </ToDoPanel>
          </LeftPanel>

          <RightPanel>
            <DetailPanel
              taskDueDate={taskDueDate}
              taskPriority={taskPriority}
            />
          </RightPanel>
        </ModalBody>
        <ButtonPanel>
          <Button>Save</Button>
        </ButtonPanel>
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBody = styled.div`
  padding: 10px 25px;
  padding-bottom: 25px;
  display: flex;
`;

const TitleText = styled(Text)`
  padding-left: 10px;
  font-size: 1.1em;
  font-weight: bold;
  display: flex;
  align-items: center;
  & svg {
    margin-right: 5px;
  }
`;

const LeftPanel = styled.div`
  width: 60%;
`;

const RightPanel = styled.div`
  width: 35%;
  padding-left: 5%;
`;

const NotesPanel = styled.div`
  height: 150px;
`;

const ToDoPanel = styled.div`
  margin-bottom: 50px;
`;

const ToDoInnerPanel = styled.div`
  padding-top: 20px;
  padding-left: 20px;
`;

const ButtonPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0px 20px;
  padding-bottom: 20px;
`;

const mapState = (state) => {
  return {
    currentTask: state.tasks.currentTask,
    showModal: state.tasks.showModal,
  };
};

const mapDispatch = { updateTask, toggleModal };

export default connect(mapState, mapDispatch)(TaskModal);
