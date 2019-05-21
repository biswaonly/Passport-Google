import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }
  return (
    <Fragment>
      <header>
        <h1>Login using...</h1>
      </header>
      <main>
        <a className="google-btn" href="http://localhost:5000/auth/google">
          Google+
        </a>
      </main>
    </Fragment>
  );
};

Login.prototype = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Login);
