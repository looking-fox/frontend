import React, { useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateFullTask } from "../../../thunks/taskThunk";
import { toggleModal, hideModal } from "../../../reducers/taskSlice";
import { Text, Textarea, Button } from "../../../ui/StyledComponents";
import Checkbox from "./Checkbox";
import TaskHeader from "./TaskHeader";
import { ModalBackground, ModalContainer } from "../../../ui/Modal";
import { useClickOffElement } from "../../../hooks/customHooks";
import DetailPanel from "./DetailPanel";
import { FaRegStickyNote } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import { useFormState } from "react-use-form-state";
import isEqual from "lodash.isequal";

const TaskModal = ({
  currentTask,
  showModal,
  uid,
  toggleModal,
  hideModal,
  updateFullTask,
}) => {
  const [formState, { text }] = useFormState(currentTask);
  const { values: form } = formState;

  const handleCloseTaskModal = async () => {
    const noFormChanges = isEqual(formState.values, currentTask);
    if (!noFormChanges) {
      await updateFullTask(currentTask.taskId, formState.values);
    }
    hideModal();
  };

  const customRef = useRef();
  useClickOffElement(customRef, handleCloseTaskModal);

  const generateFormCopy = (id) => {
    const newFormActions = [...form.taskActions];
    let index = null;
    if (id) {
      index = newFormActions.findIndex((item) => item.taskActionId === id);
    }
    return [newFormActions, index];
  };

  const setForm = (taskActions) => {
    formState.setField("taskActions", taskActions);
    // setField resets validation. not using validation for this form.
  };

  const handleFormChange = (item, value) => {
    formState.setField(item, value);
  };

  const handleClientChange = ({ value: clientId, label: clientFullName }) => {
    formState.setField("clientFullName", clientFullName);
    formState.setField("clientId", clientId);
  };

  const handleCheckboxChange = (taskActionId, key, newValue) => {
    const [newFormActions, idx] = generateFormCopy(taskActionId);
    const newAction = { ...newFormActions[idx] };
    newAction[key] = newValue;
    newFormActions.splice(idx, 1, newAction);
    setForm(newFormActions);
  };

  const handleCheckboxDelete = (taskActionId) => {
    const [newFormActions, idx] = generateFormCopy(taskActionId);
    newFormActions.splice(idx, 1);
    setForm(newFormActions);
  };

  const handleAddTaskAction = () => {
    const [newFormActions] = generateFormCopy();
    let newTaskAction = {
      taskId: form.taskId,
      taskActionName: "",
      taskCompleted: false,
      taskActionId: Math.random(),
      uid,
    };
    newFormActions.push(newTaskAction);
    setForm(newFormActions);
    // How do we determine new fields on the backend?
  };

  const { taskDueDate, taskPriority } = form;
  const clientForTask = { value: form.clientId, label: form.clientFullName };

  return (
    <ModalBackground show={showModal}>
      <ModalContainer noPadding ref={customRef}>
        <TaskHeader
          taskTitle={form.taskTitle}
          textElement={text}
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
                {...text("taskNotes")}
                value={form.taskNotes || ""}
                placeholder="Description..."
              />
            </NotesPanel>

            <ToDoPanel>
              <TitleText>
                <FiCheckSquare /> To Do List
              </TitleText>
              <ToDoInnerPanel>
                {form.taskActions &&
                  form.taskActions.map((item, idx) => {
                    const isLastItem = form.taskActions.length - 1 === idx;
                    return (
                      <Checkbox
                        key={item.taskActionId || idx}
                        item={item}
                        isLastItem={isLastItem}
                        handleCheckboxChange={handleCheckboxChange}
                        handleCheckboxDelete={handleCheckboxDelete}
                      />
                    );
                  })}
                <AddTaskButton onClick={handleAddTaskAction}>
                  + Add Task
                </AddTaskButton>
              </ToDoInnerPanel>
            </ToDoPanel>
          </LeftPanel>

          <RightPanel>
            <DetailPanel
              taskDueDate={taskDueDate}
              taskPriority={taskPriority}
              clientForTask={clientForTask}
              handleFormChange={handleFormChange}
              handleClientChange={handleClientChange}
            />
          </RightPanel>
        </ModalBody>
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

const AddTaskButton = styled(Button)`
  background: transparent;
  border: none;
  color: black;
  margin-left: 0px;
  opacity: 0.5;
  &:hover {
    box-shadow: none;
    opacity: 1;
  }
`;

const mapState = (state) => {
  return {
    currentTask: state.tasks.currentTask,
    showModal: state.tasks.showModal,
    uid: state.user.uid,
  };
};

const mapDispatch = { updateFullTask, toggleModal, hideModal };

export default connect(mapState, mapDispatch)(TaskModal);
