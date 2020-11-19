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
  userMenuView,
  createMenuView,
  createMenuProcess,
  deleteMenu,
  editMenuView,
  editMenuProcess,
  publicProfileView,
  viewWriteEmail,
  sendEmail,
  publicMenuView,
  googleInit,
  googleCb
} = require('../controllers/auth')

//Menu
router.get('/menus', userMenuView)
router.get('/menus/create', createMenuView)
router.post('/menus/create', createMenuProcess)
router.get('/menus/delete/:id', deleteMenu)
router.get('/menus/edit/:id', editMenuView)
router.post('/menus/edit/:id', editMenuProcess) 


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

//Public Views
router.get('/profile/:id', publicProfileView)
router.get('/profile/:id/menu', publicMenuView)

//Send an email
router.get('/sendemail/:id', viewWriteEmail)
router.post('/sendemail/:id', sendEmail)


module.exports = router