import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Post = ({
  post: {
    title,
    description,
    _id,
    createdAt
  }
}) => {
  return (
    <div className="blog-item">
        <div className="blog-img">
            <img src={`/api/blog/post/${_id}/image`} alt='black' className='round-img img-item' />
            <span><i className="fab fa-blogger-b"></i></span>
        </div>
        <div className="blog-text">
            <span>{createdAt.split('T')[0]}</span>
            <h2> {title} </h2>
            <p> {description} </p>
            <Link to={`/blog-post/${_id}`}>Read More</Link>
        </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
