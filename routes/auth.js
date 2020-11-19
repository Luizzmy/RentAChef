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
router.get('/menus/create', isAuth, createMenuView)
router.post('/menus/create', isAuth, createMenuProcess)
router.get('/menus/delete/:id', isAuth, deleteMenu)
router.get('/menus/edit/:id', isAuth, editMenuView)
router.post('/menus/edit/:id', isAuth, editMenuProcess) 


//Chef Signup
router.get('/chef/signup', isNotAuth, chefSignupView)
router.post('/chef/signup', isNotAuth, chefSignupProcess)

//User Signup
router.get('/user/signup', isNotAuth, userSignupView)
router.post('/user/signup', isNotAuth, userSignupProcess)

//Login
router.get('/login', isNotAuth, loginView)
router.post('/login', isNotAuth, loginProcess)

//Logout
router.get('/logout', isAuth, logout)

//Profile 
router.get('/profile', isAuth,  profileView)

//Profile edit
router.get('/profile/edit', isAuth,  userEditProfileView)
router.post('/profile/edit', isAuth,  uploadPicture.single('image'), userEditProfileProcess)

//Social Login
router.get("/auth/google", isNotAuth, googleInit)
router.get("/auth/google/callback", isNotAuth, googleCb)

//Public Views
router.get('/profile/:id', publicProfileView)
router.get('/profile/:id/menu', publicMenuView)

//Send an email
router.get('/sendemail/:id', isAuth,  viewWriteEmail)
router.post('/sendemail/:id', isAuth,  sendEmail)


module.exports = router