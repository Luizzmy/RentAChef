const { Router } = require('express');
const router = new Router();
const fileUploader = require('../configs/cloudinary')
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
  chefEditProfileView,
  chefEditProfileProcess,
  googleInit,
  googleCb
} = require('../controllers/auth')

router.get('/chef/signup', chefSignupView)
router.post('/chef/signup', chefSignupProcess)
router.get('/user/signup', userSignupView)
router.post('/user/signup', userSignupProcess)
router.get('/login', loginView)
router.post('/login', loginProcess)
router.get('/logout', logout)
router.get('/profile/', isNotAuth, profileView)
router.get('/profile/edit/:id', chefEditProfileView)
router.post('/profile/edit/:id', chefEditProfileProcess)

//=====SOCIAL========
router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

module.exports = router