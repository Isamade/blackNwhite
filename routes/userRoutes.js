const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middlewares');
const { getUser, deleteUser, updateUser, getAvatar, updateAvatar, updateRole } = require('../controllers/userController');

router.get('/user/:id/profile', getUser);
router.get('/user/:id/photo', getAvatar);
//router.get('/user/bloggers', getBloggers);
router.delete('/user', authMiddleware, deleteUser);
router.patch('/user', authMiddleware, updateUser);
router.patch('/user/updateAvatar', authMiddleware, updateAvatar);

router.delete('/adminDelete', authMiddleware, adminMiddleware, deleteUser);
router.patch('/adminUpdate', authMiddleware, adminMiddleware, updateRole);

module.exports = router;