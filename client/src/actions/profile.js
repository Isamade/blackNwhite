import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = (searchString, duration, length, interest, amount) => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    let res;
    if(searchString || duration || interest || amount){
      switch(length) {
        case 'days':
          break;
        case 'weeks':
          duration = duration * 7;
          break;
        case 'months':
          duration = duration * 31;
          break;
        case 'years':
          duration = duration * 365;
          break;
        default:
          break;
      }
      res = await axios.get(`/api/users?search=${searchString}&duration=${duration}&interest=${interest}&amount=${amount}`);
    } else {
      res = await axios.get('/api/users/');
    }

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const updateProfile = (
  { name, email, password, bio },
  history,
  edit = false
) => async dispatch => {
  try {
    const body = { name, email, password, bio };

    const res = await axios.patch('/api/user', body);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Update Successful', 'success', 10000));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/user');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};