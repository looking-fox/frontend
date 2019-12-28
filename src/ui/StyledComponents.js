import React from "react";
import loadingWhite from "../assets/images/loading-white.svg";
import styled from "styled-components";
import InitialButton from "./Button";
import Container from "./Container";
import Text from "./Text";
import Input from "./Input";

const Button = props => {
  const { isLoading, children } = props;
  return (
    <InitialButton {...props}>
      {isLoading ? (
        <Image src={loadingWhite} alt="loading spinner" />
      ) : (
        children
      )}
    </InitialButton>
  );
};

const Image = styled.img`
  height: 1.3em;
`;

export { Button, Container, Text, Input };
