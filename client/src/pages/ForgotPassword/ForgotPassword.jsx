import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { TextField, Button, CircularProgress } from "@material-ui/core/";
import { ErrorMessage, SuccessMessage, FormContainer } from "../../components";
import styles from "./styles";
import * as UserConstants from "../../constants/userConstants";
import * as UserActions from "../../actions/userActions";

const ForgotPasxword = () => {
  const [email, setEmail] = useState("");
  const classes = styles();
  const forgotPasswordDetails = useSelector((state) => state.forgotPassword);
  const { error, loading, message, success } = forgotPasswordDetails;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UserActions.forgotPassword({ email }));
  };
  return (
    <Fragment>
      {error && (
        <ErrorMessage
          header="Auth Error"
          message={error}
          reset={UserConstants.FORGOT_PASSWORD_SEND_RSET}
        />
      )}
      {success && (
        <SuccessMessage
          header="Done"
          message={message}
          reset={UserConstants.FORGOT_PASSWORD_SEND_RSET}
        />
      )}
      <FormContainer>
        <h1>Forgot Password</h1>
        <Form>
          <TextField
            variant="outlined"
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              <>Send Request</>
            )}
          </Button>
        </Form>
      </FormContainer>
    </Fragment>
  );
};

export default ForgotPasxword;
