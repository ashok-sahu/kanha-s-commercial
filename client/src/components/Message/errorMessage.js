import React, { useState, Fragment } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "animate.css";

const ErrorMessage = ({ header, message, reset }) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const action = () => {
    if (reset) {
      dispatch({ type: reset });
    }
    setShow(false);
  };
  return (
    <Fragment>
      <div style={{ position: "fixed", right: "0", zIndex: "20180210" }}>
        <Toast
          onClose={action}
          show={show}
          delay={3000}
          autohide
          className="animate__animated animate__shakeX"
        >
          <Toast.Header
            style={{ background: "red", color: "white", fontWeight: "bold" }}
          >
            <strong className="mr-auto">{header}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    </Fragment>
  );
};

export default ErrorMessage;
