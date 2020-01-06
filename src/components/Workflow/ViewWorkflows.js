import React, { Component } from "react";
import { Text, Button } from "../../ui/StyledComponents";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getWorkflows, addWorkflow } from "../../thunks/workflowThunks";
import { IoMdCreate, IoMdTrash, IoIosAdd } from "react-icons/io";

class ViewWorkflows extends Component {
  componentDidMount() {
    // Grab initial workflows
    this.props.getWorkflows();
  }

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
              <div
                style={{
                  width: "20%",
                  opacity: 0.5,
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <Text>{item.actions.length} Steps</Text>
                <Icon>
                  <IoMdCreate />
                </Icon>
                <Icon>
                  <IoMdTrash />
                </Icon>
              </div>
            </WorkflowContainer>
          );
        })}
        <LinkButton to="/workflows/new">
          <NewButton outline>
            <IoIosAdd />
            Add Workflow
          </NewButton>
        </LinkButton>
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

const Icon = styled.button`
  border: none;
  cursor: pointer;
  padding: 3px 5px;
`;

const NewButton = styled(Button)`
  margin-left: auto;
  margin-top: 25px;
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

const mapDispatch = { getWorkflows, addWorkflow };

export default connect(mapState, mapDispatch)(ViewWorkflows);
