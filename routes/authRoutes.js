const express = require('express');
const router = express.Router();
const {
    authUser,
    signup,
    signin
} = require('../controllers/authController');

const { authMiddleware } = require('../middlewares');

// validators
/*const { runValidation } = require('../validators');
const {
    userSignupValidator,
    userSigninValidator,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../validators/authValidator');*/

router.get('/auth', authMiddleware, authUser);
router.post('/signup', signup);
router.post('/signin', signin);
/*router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);*/

module.exports = router;