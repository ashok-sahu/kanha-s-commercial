import React from "react";
import { Alert } from "react-bootstrap";

const InfoMessage = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

InfoMessage.defaultProps = {
  variant: "info",
};

export default InfoMessage;
