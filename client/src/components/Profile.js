import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { getUserData } from "../actions/auth";

const Profile = ({ isAuthenticated, getUserData }) => {
  useEffect(() => {
    getUserData();
  }, []);

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
  isAuthenticated: PropTypes.bool,
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getUserData }
)(Profile);
