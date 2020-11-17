const { Router } = require('express');
const router = new Router();
const fileUploader = require('../configs/cloudinary')
const bcrypt = require('bcrypt')

const {
  chefSignupView,
  chefSignupProcess,
  userSignupView,
  userSignupProcess,
  loginView,
  loginProcess,
  logout,
  chefProfile,
  userProfile,
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
router.get('/profile/chef/', chefProfile)
router.get('/profile/user/', userProfile)

//=====SOCIAL========
router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

module.exports = router