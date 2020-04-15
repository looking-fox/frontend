import React, { useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateTask } from "../../../thunks/taskThunk";
import { toggleModal } from "../../../reducers/taskSlice";
import { Text, Textarea, Button, Checkbox } from "../../../ui/StyledComponents";
import TaskHeader from "./TaskHeader";
import { ModalBackground, ModalContainer } from "../../../ui/Modal";
import { useClickOffElement } from "./customHooks";
import { FaRegStickyNote } from "react-icons/fa";
import { FiCheckSquare, FiTrash2, FiBookmark } from "react-icons/fi";

const TaskModal = ({ currentTask, showModal, toggleModal }) => {
  const { taskTitle } = currentTask;
  const customRef = useRef();
  const [clickedOffElement] = useClickOffElement(customRef, showModal);
  if (clickedOffElement && showModal) toggleModal();

  return (
    <ModalBackground show={showModal}>
      <ModalContainer noPadding ref={customRef}>
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
                <Checkbox label="Get groceries!" checked={true} />
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

const DetailPanel = styled.div`
  height: fit-content;
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

const DetailButton = styled(Button)`
  font-size: 0.8em;
  margin: 0;
  margin-bottom: 10px;
  justify-content: flex-start;
  width: 100px;
  border: none;
  color: ${(p) => (p.color ? p.color : "inherit")};
  &:hover {
    box-shadow: none;
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

const ToDoPanel = styled.div`
  margin-bottom: 50px;
  border: 2px dotted grey;
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
