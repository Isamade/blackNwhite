import {
    GET_POSTS,
    GET_PHOTOS,
    GET_MYPOSTS,
    GET_MYPHOTOS,
    DELETE_BLOG,
    DELETE_PHOTO,
    BLOG_ERROR,
    GET_POST,
    SEARCH_BLOG
  } from '../actions/types';
  
  const initialState = {
    post: null,
    posts: [],
    gallery: [],
    loading: true,
    error: {},
    searchResults: null
  };
  
  const blog = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_POST:
        return {
          ...state,
          post: payload,
          loading: false
        };
      case SEARCH_BLOG:
        return {
          ...state,
          searchResults: payload,
          loading: false
        }
      case GET_POSTS:
      case GET_MYPOSTS:
        return {
          ...state,
          posts: payload,
          loading: false
        };
      case GET_PHOTOS:
      case GET_MYPHOTOS:
        return {
          ...state,
          gallery: payload,
          loading: false
        };
      case DELETE_BLOG:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== payload),
          loading: false
        };
      case DELETE_PHOTO:
        return {
          ...state,
          gallery: state.gallery.filter(photo => photo._id !== payload),
          loading: false
        };
      case BLOG_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  
  export default blog