import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage, FormContainer } from "../../components";
import EmailverifyStyle from "./EmailVerify.style";
import * as UserActions from "../../actions/userActions";
import * as UserConstants from "../../constants/userConstants";


const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const userAuthdata = useSelector((state)=>state)
  const dispatch = useDispatch()
  const classes = EmailverifyStyle();
  return (
    <Fragment>
      <FormContainer>
        <h1>Email Verification</h1>
        <Form>
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Verification Code"
            name="code"
            autoComplete="code"
            autoFocus
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
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
              <>Verify</>
            )}
          </Button>
        </Form>
      </FormContainer>
      hello
    </Fragment>
  );
};

export default EmailVerification;
