import React, { Component } from "react";
import { Text, Button, Modal } from "../../ui/StyledComponents";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getWorkflows,
  addWorkflow,
  archiveWorkflow
} from "../../thunks/workflowThunks";
import { IoMdCreate, IoMdTrash, IoIosAdd } from "react-icons/io";

class ViewWorkflows extends Component {
  state = { showModal: false, workFlowToArchive: {} };

  componentDidMount() {
    //Grab workflows if initially loading
    this.props.workflows.length === 0 && this.props.getWorkflows();
  }

  handleToggleModal = workflow => {
    this.setState(state => {
      return {
        showModal: !state.showModal,
        workFlowToArchive: workflow ? workflow : {}
      };
    });
  };

  handleConfirmModal = () => {
    // Archive existing workflow
    if (!this.state.workFlowToArchive) return;
    try {
      const { wfId } = this.state.workFlowToArchive;
      this.props.archiveWorkflow(wfId);
      this.handleToggleModal();
    } catch (err) {
      console.log("Delete Error: ", err);
      this.handleToggleModal();
    }
  };

  handleAddNewWorkflow = () => {
    try {
      const newWorkflow = {
        wfName: "Adventure Session",
        wfTagColor: "blue",
        wfSteps: ["New Inquiry", "Send Questionnaire", "Book within 1 week"]
      };
      this.props.addWorkflow(newWorkflow);
    } catch (err) {
      // Handle Error
    }
  };

  render() {
    return (
      <Container>
        <Title>Workflows</Title>
        <SubTitle>
          Create and edit workflows that are available for each of your clients.
          Streamline your process and build an organized workflow.
        </SubTitle>
        {this.props.workflows.map((item, idx) => {
          return (
            <WorkflowContainer key={item.wfId || idx}>
              <WorkflowBubble bubbleColor={item.wfTagColor}>
                {item.wfName}
              </WorkflowBubble>
              <DetailsContainer>
                <Text>{item.actions.length} Steps</Text>
                <Link to={`/workflows/edit/${item.wfId}`}>
                  <Icon>
                    <IoMdCreate />
                  </Icon>
                </Link>
                <Icon onClick={() => this.handleToggleModal(item)}>
                  <IoMdTrash />
                </Icon>
              </DetailsContainer>
            </WorkflowContainer>
          );
        })}
        <LinkButton to="/workflows/new">
          <NewButton outline>
            <IoIosAdd />
            Add Workflow
          </NewButton>
        </LinkButton>
        <Modal
          showModal={this.state.showModal}
          simpleModal
          title={`Are you sure you want to delete ${this.state.workFlowToArchive.wfName}?`}
          description="Previous clients will not be affected."
          onConfirm={this.handleConfirmModal}
          onClose={this.handleToggleModal}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
`;

const Title = styled(Text)`
  font-size: 2em;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 10px;
  text-align: center;
`;

const SubTitle = styled(Text)`
  text-align: center;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 70%;
  line-height: 150%;
`;

const WorkflowContainer = styled.div`
  background: white;
  border-bottom: 0.5px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  &:last-of-type {
    border-bottom: none;
  }
`;

const WorkflowBubble = styled(Text)`
  background: ${p => p.bubbleColor};
  color: white;
  font-weight: bold;
  padding: 3px 5px;
  border-radius: 3px;
`;

const DetailsContainer = styled.div`
  width: 20%;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Icon = styled.button`
  border: none;
  cursor: pointer;
  padding: 3px 5px;
  font-size: 1em;
`;

const NewButton = styled(Button)`
  margin-left: auto;
  margin-top: 25px;
  margin-bottom: 100px;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  &:link,
  &:visited {
    color: inherit;
  }
`;

const mapState = state => {
  const { workflows } = state.workflow;
  return { workflows };
};

const mapDispatch = { getWorkflows, addWorkflow, archiveWorkflow };

export default connect(mapState, mapDispatch)(ViewWorkflows);
