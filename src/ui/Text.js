import styled, { css } from "styled-components";

const Text = styled.p`
  ${props =>
    props.link &&
    css`
      cursor: pointer;
    `};
`;

export default Text;
