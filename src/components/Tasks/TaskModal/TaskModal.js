import React, { useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateTask } from "../../../thunks/taskThunk";
import { toggleModal } from "../../../reducers/taskSlice";
import { Formik, Form } from "formik";
import { Text, Textarea, Button } from "../../../ui/StyledComponents";
import TaskHeader from "./TaskHeader";
import { ModalBackground, ModalContainer } from "../../../ui/Modal";
import { useClickOffElement } from "./customHooks";
import CheckboxField from "../../../ui/formik/CheckboxField";
import { FaRegStickyNote } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";

const TaskModal = ({ currentTask, showModal, toggleModal }) => {
  const { taskTitle } = currentTask;
  const customRef = useRef();
  const [clickedOffElement] = useClickOffElement(customRef, showModal);
  if (clickedOffElement && showModal) toggleModal();
  const initialFormState = {};
  return (
    <ModalBackground show={showModal}>
      <ModalContainer noPadding ref={customRef}>
        <Formik initialValues={initialFormState}>
          {({ isSubmitting }) => (
            <Form>
              <TaskHeader onClose={toggleModal} taskTitle={taskTitle} />

              <ModalBody>
                <LeftPanel>
                  <NotesPanel>
                    <TitleText>
                      <FaRegStickyNote /> Notes
                    </TitleText>
                    <Textarea noBorder placeholder="Description..." />
                  </NotesPanel>
                  <ToDoPanel>
                    <TitleText>
                      <FiCheckSquare /> To Do List
                    </TitleText>
                    <ToDoInnerPanel>
                      <CheckboxField description="Cull photos" />
                      <CheckboxField description="Upload to gallery" />
                      <CheckboxField description="Ask for review" />
                    </ToDoInnerPanel>
                  </ToDoPanel>
                </LeftPanel>

                <RightPanel>
                  <DetailPanel>
                    <DetailText>
                      <span>Priority:</span> <Bubble>Low</Bubble>
                    </DetailText>
                    <DetailText>
                      <span>Due Date:</span> March 28th, 2020
                    </DetailText>
                    <DetailText>
                      <span>Client:</span> Jessica & John
                    </DetailText>
                  </DetailPanel>
                </RightPanel>
              </ModalBody>
              <ButtonPanel>
                <Button>Save</Button>
              </ButtonPanel>
            </Form>
          )}
        </Formik>
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBody = styled.div`
  padding: 10px 25px;
  padding-bottom: 25px;
  display: flex;
`;

const LeftPanel = styled.div`
  width: 60%;
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

const RightPanel = styled.div`
  width: 40%;
  margin-left: 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
`;

const DetailPanel = styled.div`
  height: 50px;
  padding: 0px 10px;
`;

const DetailText = styled(Text)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  & span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const Bubble = styled(Text)`
  background: ${(p) => p.theme.red};
  color: white;
  padding: 2px 5px;
  font-weight: bold;
  border-radius: 3px;
  margin-left: 5px;
  height: fit-content;
`;

const NotesPanel = styled.div`
  height: 150px;
`;

const ToDoPanel = styled.div``;

const ToDoInnerPanel = styled.div`
  padding-top: 20px;
  padding-left: 10px;
`;

const ButtonPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0px 10px;
  padding-bottom: 10px;
`;

const mapState = (state) => {
  return {
    currentTask: state.tasks.currentTask,
    showModal: state.tasks.showModal,
  };
};

const mapDispatch = { updateTask, toggleModal };

export default connect(mapState, mapDispatch)(TaskModal);
