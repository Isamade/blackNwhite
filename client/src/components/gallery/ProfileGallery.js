import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPhoto, getMyPhotos, deletePhoto } from '../../actions/blog';

const ProfileGallery = ({
    blog: { gallery, loading },
    addPhoto,
    getMyPhotos,
    deletePhoto
}) => {
    const [formData, setFormData] = useState({
        heading: '',
        picture: '',
        page: 0
    });
    
    const { heading, picture, page } = formData;

    useEffect(() => {
        getMyPhotos(page);
    }, [getMyPhotos, page]);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const onSubmit = e => {
        e.preventDefault();
        addPhoto({heading, picture}); 
    };

    const prevPhotos = () => {
        if (page > 0) {
            setFormData({...formData, page: (page - 1)})
        }
    }

    const nextPhotos = () => {
        if (gallery.length > 0) {
            setFormData({...formData, page: (page + 1)})
        }
    }

  return (
    <Fragment>
        <p className="lead clear my-top">
            <button className="m-1" onClick={prevPhotos}><i className='fas fa-angle-left' style={{fontSize: 18}}></i></button>
            My Photos
            <button className="m-1" onClick={nextPhotos}><i className='fas fa-angle-right' style={{fontSize: 18}}></i></button>
        </p>
        <div className="blog-content">
            {gallery.length > 0 ? (
            gallery.map(image => (
                <div className="design-item" key={image._id}>
                    <div className="design-img design-img-pointer">
                        <img src={`api/blog/photo/${image._id}/image`} alt="black" />
                        <span onClick={() => deletePhoto(image._id)}><i className='fa fa-trash' style={{color: "red", fontSize: 20}}></i></span>
                        <span>{image.createdAt.split('T')[0]}</span>
                    </div>
                    <div className="design-title">
                        <a href="index.html">{image.heading}</a>
                    </div>
                </div>
            ))
            ) : (
                    <h4>No photos</h4>
            )}
        </div>
        <p className="lead clear">
              <i className="fas fa-images" /> Add to Gallery
        </p>
        <div className='profile bg-light my-bot4'>
            <form className="form" onSubmit={onSubmit} action="/api/blog/addPost" method="post" encType="multipart/form-data">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Heading"
                        name="heading"
                        value={heading}
                        onChange={onChange}
                    />
                </div>
                <label htmlFor="picture"> Photo: </label>
                <input type="file" name="picture" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })} />
                <input type="submit" className="btn btn-primary my-1" value="Submit" />
            </form>
        </div>
    </Fragment>
  );
};

ProfileGallery.propTypes = {
    addPhoto: PropTypes.func.isRequired,
    getMyPhotos: PropTypes.func.isRequired,
    deletePhoto: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(mapStateToProps, { addPhoto, getMyPhotos, deletePhoto })(ProfileGallery);