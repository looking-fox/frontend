import React from "react";
import { actionTagColors } from "../../../config/config";
import styled, { css } from "styled-components";
import { Input, Text } from "../../../ui/StyledComponents";
import { IoMdColorFilter } from "react-icons/io";

const DetailPanel = ({
  wfName,
  wfTagColor,
  wfActionsLength,
  handleInput,
  handleSelectNewColor
}) => {
  const activePreview = wfName.length || wfActionsLength > 1;
  return (
    <DetailContainer>
      <WorkflowInput
        placeholder="Type Workflow Name..."
        name="wfName"
        value={wfName}
        onChange={handleInput}
      />

      <ColorPickerContainer>
        <ColorText>
          <IoMdColorFilter />
          Select Tag Color
        </ColorText>
        <ColorSelector>
          {Object.keys(actionTagColors).map((item, idx) => {
            const selected = actionTagColors[item] === wfTagColor;
            return (
              <ColorIcon
                color={actionTagColors[item]}
                key={idx}
                selected={selected}
                onClick={() => handleSelectNewColor(actionTagColors[item])}
              />
            );
          })}
        </ColorSelector>
      </ColorPickerContainer>
      <PreviewContainer>
        <PreviewTitle>Workflow Preview:</PreviewTitle>
        <PreviewBar activePreview={activePreview}>
          <PreviewTagColor color={wfTagColor}>
            {wfName || "Preview"}
          </PreviewTagColor>
          <PreviewSteps>{wfActionsLength} Steps</PreviewSteps>
        </PreviewBar>
      </PreviewContainer>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  width: 40vw;
  height: calc(100vh - 120px),
  box-sizing: border-box;
  padding: 0px 50px;
  padding-top: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  box-sizing: border-box;
  margin-top: 25px;
`;

const PreviewTitle = styled(Text)`
  text-align: center;
  margin: 25px 0px;
  font-size: 1.1em;
`;

const PreviewBar = styled.div`
  background: white;
  border-radius: 3px;
  ${p => p.theme.sideBoxShadow};
  opacity: ${p => (p.activePreview ? 1 : 0.6)};
  display: flex;
  padding: 1em;
  display: flex;
  align-items: center;
  width: 90%;
`;

const PreviewTagColor = styled(Text)`
  background: ${p => (p.color ? p.color : p.theme.primaryColor)};
  color: white;
  font-weight: bold;
  border-radius: 3px;
  margin: 0em 0.25em;
  padding: 0.25em 0.5em;
`;

const PreviewSteps = styled(Text)`
  margin-left: auto;
  margin-right: 10px;
`;

const WorkflowInput = styled(Input)`
  background: white;
  width: 90%;
  margin-top: 25px;
`;

const ColorPickerContainer = styled.div`
  background: white;
  border-radius: 3px;
  padding: 1em;
  margin: 25px 0px;
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  width: 90%;
  box-sizing: border-box;
  ${p => p.theme.sideBoxShadow};
`;

const ColorSelector = styled.div`
  display: flex;
  justify-content: center;
`;

const ColorText = styled(Text)`
  font-size: 1em;
  text-align: center;
  margin-bottom: 25px;
  ${p => p.theme.flexAllCenter};
  & svg {
    margin-right: 5px;
  }
`;

const ColorIcon = styled.div`
  background: ${p => p.color || p.theme.primaryColor};
  border-radius: 50%;
  height: 25px;
  min-height: 25px;
  width: 25px;
  min-width: 25px;
  margin: 0px 20px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  &:hover {
    ${p => p.theme.sideBoxShadow};
    transform: scale(1.1);
  }
  ${p =>
    p.selected
      ? css`
          opacity: 1;
          transform: scale(1.1);
          margin: 0px 25px;
        `
      : css`
          opacity: 0.5;
        `}
`;

export default DetailPanel;
