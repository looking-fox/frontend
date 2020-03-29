import React from "react";
import loadingWhite from "../assets/images/loading-white.svg";
import styled from "styled-components";
import SimpleButton from "./Button";
import Container from "./Container";
import Text from "./Text";
import Input from "./Input";
import Textarea from "./Textarea";
import Toast from "./Toast";
import Modal from "./Modal";
import Field from "./formik/Field";
import FormErrorText from "./formik/FormErrorText";
import Link from "./Link";

const Button = props => {
  const { isLoading, children } = props;
  return (
    <SimpleButton {...props}>
      {isLoading ? (
        <Image src={loadingWhite} alt="loading spinner" />
      ) : (
        children
      )}
    </SimpleButton>
  );
};

const Image = styled.img`
  height: 1.3em;
`;

export {
  Button,
  SimpleButton,
  Container,
  Text,
  Input,
  Textarea,
  Toast,
  Modal,
  Field,
  FormErrorText,
  Link
};
