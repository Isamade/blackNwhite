const express = require('express');
const router = express.Router();

const fs = require('fs'); 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: path.resolve(__dirname, 'uploads'), 
    filename: (req, file, cb) => {
        cb(null, 'pic') 
    } 
}); 
  
const upload = multer({ storage });

const {
    addPost,
    addPhoto,
    getPost,
    listPosts,
    listPhotos,
    listMyPosts,
    listMyPhotos,
    removePost,
    removePhoto,
    searchBlog,
    retrievePostImage,
    retrievePhotoImage,
    testPostImage
} = require('../controllers/blogController');

const { adminMiddleware, authMiddleware, blogMiddleware } = require('../middlewares');

router.get('/blog/search', searchBlog);
router.get('/blog/blogPost/:id', getPost);
router.get('/blog/posts/:page', listPosts);
router.get('/blog/photos/:page', listPhotos);
router.get('/blog/myposts/:page', authMiddleware, listMyPosts);
router.get('/blog/myphotos/:page', authMiddleware, listMyPhotos);
//router.get('blog/:id', retrievePost);
router.get('/blog/post/:id/image', retrievePostImage);
router.get('/blog/photo/:id/image', retrievePhotoImage);
router.post('/blog/post', authMiddleware, upload.single('photo'), addPost);
router.post('/blog/photo', authMiddleware, upload.single('picture'), addPhoto);
router.delete('/blog/post/:id', authMiddleware, removePost);
router.delete('/blog/photo/:id', authMiddleware, removePhoto);
//router.patch('/blog', authMiddleware, updatePost);

router.delete('/blog/post/adminRemove', authMiddleware, adminMiddleware, removePost);
router.delete('/blog/photo/adminRemove', authMiddleware, adminMiddleware, removePhoto);

module.exports = router;