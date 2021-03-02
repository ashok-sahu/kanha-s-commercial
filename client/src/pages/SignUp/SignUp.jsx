import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ErrorMessage, SuccessMessage, FormContainer } from "../../components";
import * as UserActions from "../../actions/userActions";
import * as UserConstants from "../../constants/userConstants";
import userStyles from "./signup.style";

const SignUp = ({ location, history }) => {
  const [name, setName] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const classes = userStyles();
  const userRegisterData = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();

  const { error, loading, message, success } = userRegisterData;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        const redirectUrl = redirect
          ? `/EmailVerification?redirect=${redirect}`
          : "/EmailVerification";
        history.push(redirectUrl);
      }, 5000);
    }
  }, [history, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setVerificationMessage("");
    if (password !== confirmPassword) {
      return setVerificationMessage("Passwords do not match");
    }
    dispatch(UserActions.Register(name, email, password));
  };

  return (
    <Fragment>
      <FormContainer>
        <h1>SignUp</h1>
        {error && (
          <ErrorMessage
            header="Auth Error"
            message={error}
            reset={UserConstants.USER_REGISTER_RESET}
          />
        )}
        {verificationMessage !== "" && (
          <ErrorMessage header="Auth Error" message={verificationMessage} />
        )}
        {success && (
          <SuccessMessage
            header="Register SuccessFully"
            message={message}
            reset={UserConstants.USER_REGISTER_RESET}
          />
        )}
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoComplete="email"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            variant="outlined"
            type="email"
            margin="normal"
            placeholder="ex:- JohnDoe@gmail.com"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            type="password"
            placeholder="***********"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            type="password"
            placeholder="***********"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            value={confirmPassword}
            autoComplete="current-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                color="inherit"
                className={classes.prgressColor}
              />
            ) : (
              <>Register</>
            )}
            register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Fragment>
  );
};

export default SignUp;
