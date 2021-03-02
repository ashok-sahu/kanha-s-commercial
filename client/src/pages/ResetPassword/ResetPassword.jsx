import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, CircularProgress } from "@material-ui/core/";
import { ErrorMessage, SuccessMessage, FormContainer } from "../../components";
import * as UserActions from "../../actions/userActions";
import * as UserConstants from "../../constants/userConstants";
import styles from "./resetPassword.style";

const ResetPassword = ({ history }) => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const classes = styles();
  const resetPasswordDetails = useSelector((state) => state.resetPassword);
  const { error, loading, message, success } = resetPasswordDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token")
      ? queryParams.get("token").trim()
      : null;
    if (token) {
      setToken(token);
    } else {
      history.push("/login");
    }
  }, [dispatch, history, token]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
  }, [history, dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetPassworData = {
      newPassword,
      token,
    };
    dispatch(UserActions.resetPassword(resetPassworData));
  };

  return (
    <Fragment>
      {error && (
        <ErrorMessage
          header="Auth Error"
          message={error}
          reset={userConstants.FORGOT_PASSWORD_SEND_RSET}
        />
      )}
      {success && (
        <SuccessMessage
          header="Done"
          message={message}
          reset={userConstants.FORGOT_PASSWORD_SEND_RSET}
        />
      )}
      <FormContainer>
        <h1>Reset Password</h1>
        <Form>
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            autoComplete="password"
            autoFocus
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
              <>Reset</>
            )}
          </Button>
        </Form>
      </FormContainer>
    </Fragment>
  );
};

export default ResetPassword;
