import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  Login,
  Cart,
  SignUp,
  EmailVerification,
  Logout,
  ForgotPassword,
  ResetPassword,
  Homepage,
} from "./pages";
import { Header } from "./components";

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={SignUp} />
            <Route path="/cart" component={Cart} />
            <Route
              exact={true}
              path="/EmailVerification"
              component={EmailVerification}
            />
            <Route exact={true} path="/logout" component={Logout} />
            <Route
              exact={true}
              path="/forgotPasssword"
              component={ForgotPassword}
            />
            <Route
              exact={true}
              path="/resetPassword"
              component={ResetPassword}
            />
          </Switch>
        </Container>
      </main>
    </Fragment>
  );
};

export default App;
