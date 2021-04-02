import React, { Fragment, useEffect, useState } from 'react';
//import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts, getPhotos} from '../../actions/blog';
import  Picture  from '../gallery/Picture';
import Post from '../blog/Post';

const Landing = ({ getPosts, getPhotos, blog: { posts, gallery }  }) => {
    const [formData, setFormData] = useState({
        postsPage: 0,
        photosPage: 0
    });
    const { postsPage, photosPage } = formData;
    useEffect(() => {
        getPosts(postsPage);
        getPhotos(photosPage);
    }, [getPosts, getPhotos, postsPage, photosPage]);
    const prevPhotos = () => {
        if (photosPage > 0) {
            setFormData({...formData, photosPage: (photosPage - 1)})
        }
    }
    const nextPhotos = () => {
        if (gallery.length > 0) {
            setFormData({...formData, photosPage: (photosPage + 1)})
        }
    }
    const prevPosts = () => {
        if (postsPage > 0) {
            setFormData({...formData, postsPage: (postsPage - 1)})
        }
    }
    const nextPosts = () => {
        if (posts.length > 0) {
            setFormData({...formData, postsPage: (postsPage + 1)})
        }
    }
  return (
    <Fragment>
    <section className="design" id="design">
        <div className="container">
            <div className="title">
                <h2>
                <button className="m-1" onClick={prevPhotos}><i className='fas fa-angle-left' style={{fontSize: 36}}></i></button>
                    Gallery
                <button className="m-1" onClick={nextPhotos}><i className='fas fa-angle-right' style={{fontSize: 36}}></i></button>
                </h2>
                <p>photos</p>
            </div>

            <div className="design-content">
                {gallery.length > 0 ? (
                gallery.map(image => (
                    <Picture key={image._id} image={image} />
                ))
                ) : (
                    <h4>No Photos Found</h4>
                )}
            </div>
        </div>
    </section>
    <section className="blog" id="blog">
        <div className="container">
            <div className="title">
                <h2>
                    <button className="m-1" onClick={prevPosts}><i className='fas fa-angle-left' style={{fontSize: 36}}></i></button>
                    Blog
                    <button className="m-1" onClick={nextPosts}><i className='fas fa-angle-right' style={{fontSize: 36}}></i></button>
                </h2>
                <p>recent posts</p>
            </div>
            <div className="blog-content">
                {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post._id} post={post}/> 
                ))
                ) : (
                    <h4>No Posts Found</h4>
                )}
            </div>
        </div>
    </section>
</Fragment>
  );
};

Landing.propTypes = {
    blog: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    getPhotos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(mapStateToProps, { getPosts, getPhotos })(Landing);
