import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost, getMyPosts, deletePost } from '../../actions/blog';

const ProfileBlog = ({
    blog: { posts, loading },
    addPost,
    getMyPosts,
    deletePost
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        photo: '',
        page: 0
    });
    
    const { title, description, content, photo, page } = formData;

    useEffect(() => {
        getMyPosts(page);
    }, [getMyPosts, page]);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const onSubmit = e => {
        e.preventDefault();
        addPost({title, description, content, photo}); 
    };

    const prevPosts = () => {
        if (page > 0) {
            setFormData({...formData, page: (page - 1)})
        }
    }

    const nextPosts = () => {
        if (posts.length > 0) {
            setFormData({...formData, page: (page + 1)})
        }
    }

  return (
    <Fragment>
        <p className="lead clear my-top">
            <button className="m-1" onClick={prevPosts}><i className='fas fa-angle-left' style={{fontSize: 18}}></i></button>
             My Posts
            <button className="m-1" onClick={nextPosts}><i className='fas fa-angle-right' style={{fontSize: 18}}></i></button>
        </p>
        <div className="blog-content">
            {posts.length > 0 ? (
            posts.map(post => (
                <div className="blog-item" key={post._id}>
                    <div className="blog-img">
                        <img src={`/api/blog/post/${post._id}/image`} alt='black' className='round-img img-item' />
                        <span><i className="fas fa-file-image"></i></span>
                    </div>
                    <div className="blog-text">
                        <span>{post.createdAt.split('T')[0]}</span>
                        <h2> {post.title} </h2>
                        <p> {post.description} </p>
                        <button onClick={() => deletePost(post._id)} className='btn btn-danger'>Delete</button>
                    </div>
                </div>
            ))
            ) : (
                    <h4>No posts yet...</h4>
            )}
        </div>
        <p className="lead clear">
            <i className="fa fa-newspaper" /> Create a blog post
        </p>
        <div className='profile bg-light my-bot4'>
            <form className="form" onSubmit={onSubmit} action="/api/blog/createBlog" method="post" encType="multipart/form-data">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        type="text"
                        placeholder="Content"
                        name="content"
                        value={content}
                        onChange={onChange}
                    />
                </div>
                <label htmlFor="photo"> Image: </label>
                <input type="file" name="photo" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })} />
                <input type="submit" className="btn btn-primary my-1" value="Submit" />
            </form>
        </div>
    </Fragment>
  );
};

ProfileBlog.propTypes = {
    addPost: PropTypes.func.isRequired,
    getMyPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(mapStateToProps, { addPost, getMyPosts, deletePost })(ProfileBlog);