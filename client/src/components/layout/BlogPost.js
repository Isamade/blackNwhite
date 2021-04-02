import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/blog';
import Spinner from './Spinner';

const BlogPost = ({getPost, blog: {post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id);
      }, [getPost, match.params.id]);
    console.log('id', match.params.id);
    console.log('post', post);
    return loading || (post === null) ? (
        <Spinner />
      ) : (
        <Fragment>
            <section className="about" id="about">
                <div className="container">
                    <div className="about-content">
                        <div>
                            <img src={`/api/blog/post/${post._id}/image`} alt="" />
                        </div>
                        <div className="about-text">
                            <div className="title">
                                <h2>{post.title}</h2>
                                <p>{post.createdAt.split('T')[0]}</p>
                            </div>
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

BlogPost.propTypes = {
    getPost: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
};
  
const mapStateToProps = (state) => ({
    blog: state.blog
});

export default connect(mapStateToProps, {getPost})(BlogPost);