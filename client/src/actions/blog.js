import axios from 'axios';
import FormData from 'form-data';
import { setAlert } from './alert';

import {
    GET_POST,
    GET_PHOTOS,
    GET_POSTS,
    GET_MYPHOTOS,
    GET_MYPOSTS,
    DELETE_BLOG,
    DELETE_PHOTO,
    BLOG_ERROR,
    SEARCH_BLOG
} from './types';

export const getPost = (id) => async dispatch => {
  try {
    console.log('id2', id);
    const res = await axios.get(`/api/blog/blogPost/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const search = (searchInput) => async dispatch => {
  try {
    console.log(searchInput);
    const res = await axios.get(`/api/blog/search?searchString=${searchInput}`);
    dispatch({
      type: SEARCH_BLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPosts = (page) => async dispatch => {
  try {
    const res = await axios.get(`/api/blog/posts/${page}`);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPhotos = (page) => async dispatch => {
    try {
      const res = await axios.get(`/api/blog/photos/${page}`);  
      dispatch({
        type: GET_PHOTOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

export const getMyPosts = (page) => async dispatch => {
    try {
      const res = await axios.get(`/api/blog/myposts/${page}`);
      dispatch({
        type: GET_MYPOSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

export const getMyPhotos = (page) => async dispatch => {
    try {
      const res = await axios.get(`/api/blog/myphotos/${page}`);
      dispatch({
        type: GET_MYPHOTOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

export const addPost = (
  { title, description, content, photo }
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    console.log('title', title);
    const formData = new FormData();
    const body = JSON.stringify({ title, description, content });
    formData.append('body', body);
    formData.append('photo', photo);
    console.log('formdata', formData);
    const res = await axios.post('/api/blog/post', formData, config);

    dispatch({
      type: GET_MYPOSTS,
      payload: res.data
    });

    dispatch(setAlert('Update Successful', 'success', 10000));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPhoto = (
    { heading, picture }
  ) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const formData = new FormData();
      const body = JSON.stringify({ heading });
      formData.append('body', body);
      formData.append('picture', picture);
  
      const res = await axios.post('/api/blog/photo', formData, config);
  
      dispatch({
        type: GET_MYPHOTOS,
        payload: res.data
      });
  
      dispatch(setAlert('Update Successful', 'success', 10000));
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: BLOG_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

export const deletePost = (id) => async dispatch => {
    try {
      await axios.delete(`/api/blog/post/${id}`);

      dispatch({
        type: DELETE_BLOG,
        payload: id
      });

      dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
  
export const deletePhoto = (id) => async dispatch => {
  try {
    await axios.delete(`/api/blog/photo/${id}`);

    dispatch({
      type: DELETE_PHOTO,
      payload: id
    });

    dispatch(setAlert('Photo deleted', 'success'));
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};