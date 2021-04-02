import React, { Fragment, useEffect } from 'react';
//import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import {getPosts, getPhotos} from '../../actions/blog';
import  Picture  from '../gallery/Picture';
import Post from '../blog/Post';
import Spinner from './Spinner';
import { search } from '../../actions/blog';

const Landing = ({search, blog: {searchResults, loading}, match}) => {
    useEffect(() => {
        search(match.params.searchString);
    }, [search, match.params.searchString]);
    //const {posts, photos} = searchResults;
    console.log('results', searchResults);
  return loading || (searchResults === null) ? (
    <Spinner />
  ) : (
    <Fragment>
    <section className="blog" id="blog">
        <div className="container">
            <div className="title">
                <h2>
                    Posts
                </h2>
            </div>
            <div className="blog-content">
                {searchResults.posts.length > 0 ? (
                searchResults.posts.map(post => (
                    <Post key={post._id} post={post}/> 
                ))
                ) : (
                    <h4>No Posts Found</h4>
                )}
            </div>
        </div>
    </section>
    <section className="design" id="design">
        <div className="container">
            <div className="title">
                <h2>
                    Images
                </h2>
            </div>
            <div className="design-content">
                {searchResults.photos.length > 0 ? (
                searchResults.photos.map(image => (
                    <Picture key={image._id} image={image} />
                ))
                ) : (
                    <h4>No Images Found</h4>
                )}
            </div>
        </div>
    </section>
</Fragment>
  );
};

Landing.propTypes = {
    blog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(mapStateToProps, {search})(Landing);