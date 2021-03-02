import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form } from "react-bootstrap";
import { FormContainer, ErrorMessage } from "../../components";
import * as UserActions from "../../actions/userActions";
import * as UserConstants from "../../constants/userConstants";

import loginStyle from "./Login.style";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userAuthData = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userAuthData;
  const dispatch = useDispatch();
  const classes = loginStyle();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, userInfo, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UserActions.Auth(email, password));
  };

  return (
    <Fragment>
      {error && (
        <ErrorMessage
          header="Auth Error"
          message={error}
          reset={UserConstants.RESET}
        />
      )}
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                color="inherit"
                className={classes.prgressColor}
              />
            ) : (
              <>Sign In</>
            )}
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
          <Col className="text-right">
            <Link to={"/forgotPasssword"}>Forgot Password</Link>
          </Col>
        </Row>
      </FormContainer>
    </Fragment>
  );
};

export default Login;
