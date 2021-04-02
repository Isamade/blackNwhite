import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = ({ forgotPassword, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    emailSent: false
  });

  const { email, emailSent } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email);
    setFormData({ ...formData, emailSent: true });
  };

  if (emailSent) {
    return <Redirect to="/resetPassword" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Forgot Password?</h1>
      <p className="lead">
        <i className="fas fa-user" /> Log in with your Email
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      <div><Link to="/resetPassword">Click here</Link> to reset password</div>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);