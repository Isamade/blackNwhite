import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [formData, setFormData] = useState({
    searchInput: ''
  });

  const { searchInput } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const authLinks = (
    <nav className="navbar">
      <div className="container">
        <Link to='/' className="navbar-brand">PillarCast</Link>
        <div className="navbar-nav">
          <Link to='/profile' className="my-ryt">Profile</Link>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span>Logout</span>
          </a>
        </div>
      </div>
    </nav>
  );

  const guestLinks = (
    <nav className="navbar">
      <div className="container">
        <Link to='/' className="navbar-brand">PillarCast</Link>
        <div className="navbar-nav">
          <Link to='/register' className='my-ryt'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </nav>
  );

  return (
    <header>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks }</Fragment>
      )}
      <div className="banner">
        <div className="container">
          <h1 className="banner-title">
            <span>Pillar</span>Cast
            </h1>
          <p>find everything you need to know about...</p>
          <form onSubmit={onSubmit}>
            <input type="text"
                   className="search-input" 
                   placeholder="Search..."
                   name="searchInput"
                   value={searchInput}
                   onChange={onChange}/>
            <button type="submit" className="search-btn">
            <Link to={`/search/${searchInput}`}><i className="fas fa-search" style={{color: "black", fontSize: 25}}></i></Link>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
