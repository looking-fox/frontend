import styled, { css } from "styled-components";

export default styled.div`
  min-height: 100vh;
  ${props =>
    props.centerAll &&
    css`
      display: flex;
    `};
`;
