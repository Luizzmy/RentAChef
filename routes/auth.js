const { Router } = require('express');
const router = new Router();
const uploadPicture = require('../configs/cloudinary')
const bcrypt = require('bcrypt')

const { 
  isAuth, 
  isNotAuth,
  checkRole,
  isProfileComplete
} = require('../middlewares/index')

const {
  chefSignupView,
  chefSignupProcess,
  userSignupView,
  userSignupProcess,
  loginView,
  loginProcess,
  logout,
  profileView,
  userEditProfileView,
  userEditProfileProcess,
  googleInit,
  googleCb
} = require('../controllers/auth')

//Chef Signup
router.get('/chef/signup', chefSignupView)
router.post('/chef/signup', chefSignupProcess)

//User Signup
router.get('/user/signup', userSignupView)
router.post('/user/signup', userSignupProcess)

//Login
router.get('/login', loginView)
router.post('/login', loginProcess)

//Logout
router.get('/logout', logout)

//Profile 
router.get('/profile', profileView)

//Profile edit
router.get('/profile/edit', userEditProfileView)
router.post('/profile/edit', uploadPicture.single('image'), userEditProfileProcess)

//Social Login
router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

module.exports = router