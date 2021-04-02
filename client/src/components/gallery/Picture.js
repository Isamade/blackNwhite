import React from 'react';
import PropTypes from 'prop-types';

const Picture = ({
  image: {
    _id,
    heading,
    createdAt
  }
}) => {

  return (
      <div className="design-item">
          <div className="design-img">
              <img src={`/api/blog/photo/${_id}/image`} alt="black" />
              <span><i className="fas fa-image"></i></span>
              <span>{createdAt.split('T')[0]}</span>
          </div>
          <div className="design-title">
              <a href="index.html">{heading}</a>
          </div>
      </div>
  );
};

Picture.propTypes = {
  image: PropTypes.object.isRequired
};

export default Picture;
