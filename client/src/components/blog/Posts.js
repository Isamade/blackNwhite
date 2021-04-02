import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Post from './Post';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, blog: { Posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  console.log('blog', blog);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
        <section className="blog" id="blog">
            <div className="container">
                <div className="title">
                    <h2>Blog</h2>
                    <p>recent posts</p>
                </div>
                <div className="blog-content">
                    {Posts.length > 0 ? (
                        Posts.map(post => (
                            <Post key={post._id} post={post} />
                        ))
                    ) : (
                            <h4>No posts found...</h4>
                        )}
                </div>
            </div>
        </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);