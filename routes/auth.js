const { Router } = require('express');
const router = new Router();
const fileUploader = require('../configs/cloudinary')

const {
  chefSignupView,
  chefSignupProcess,
  userSignupView,
  userSignupProcess,
  loginView,
  loginProcess,
  logout,
  chefHome,
  userHome,
  // chefProfile,
  // userProfile,
  googleInit,
  googleCb
} = require('../controllers/auth')

// .get() route ==> to display the signup form to users
router.get('/chef/signup', chefSignupView)
router.post('/chef/signup', chefSignupProcess)
router.get('/user/signup', userSignupView)
router.post('/user/signup', userSignupProcess)
router.get('/login', loginView)
router.post('/login', loginProcess)

//=====SOCIAL========
router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)
module.exports = router