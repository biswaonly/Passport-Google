import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

const Nav = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/">Homepage</Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          Log out
        </Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/">Homepage</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
  return (
    <nav>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
