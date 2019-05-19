import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { login } from "../actions/auth";

const Profile = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <header>
        <h1>Welcome to your profile, Biswajit Barman</h1>
      </header>
      <main>
        <p>This is your profile thumbnail</p>
      </main>
    </Fragment>
  );
};

Profile.prototype = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Profile);
