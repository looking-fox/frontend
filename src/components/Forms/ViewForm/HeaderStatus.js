import React from "react";
import styled from "styled-components";
import { Spinner, Text } from "../../../ui/StyledComponents";

const HeaderStatus = ({ isUpdating = false, unpublishedChanges = false }) => {
  if (!unpublishedChanges) return null;
  if (isUpdating) {
    return <Spinner color="black" visible size="25" opacity="0.2" />;
  } else {
    return <StatusText>Saved As Draft</StatusText>;
  }
};

const StatusText = styled(Text)`
  font-style: italic;
  color: #777777;
  font-size: 0.8em;
`;

export default HeaderStatus;
