import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, deleteAccount, getCurrentProfile } from '../../actions/profile';
import ProfileBlog from '../blog/ProfileBlog';
import ProfileGallery from '../gallery/ProfileGallery';

const initialState = {
    name: '',
    email: '',
    password: '',
    bio: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  updateProfile,
  getCurrentProfile,
  deleteAccount,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if(!profile) getCurrentProfile();
    if(!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    name,
    email,
    password,
    bio
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      password,
      bio
    }, history, profile ? true : false); 
  };

  const onClick = e => {
    deleteAccount();
  }

  return (
    <Fragment>
      <button className="btn btn-danger floatright my-bot my-top" onClick={onClick}>Delete Account</button>
      <h1 className="large text-primary clear my-bot">Profile</h1>
      <p className="lead clear my-bot">
        <i className="fas fa-user" /> Make some changes to your profile
      </p>
      <div className='profile bg-light my-bot4'>
        <form className="form" onSubmit={onSubmit} action="/api/users/signUp" method="post" encType="multipart/form-data">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              placeholder="Bio"
              name="bio"
              value={bio}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" value="Submit"/>
        </form>
      </div>
      <ProfileBlog/>
      <ProfileGallery/>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { updateProfile, getCurrentProfile, deleteAccount })(
  ProfileForm
);
