const bcrypt = require('bcrypt')
const User = require('../models/User.model')
// const Chef = require('../models/Chef.model')
const passport = require('../configs/passport')
const {userRegister} = require('../configs/nodemailer')

const mongoose = require('mongoose');


//////////////////////////////////////////////////////////////////
/////////////////////////////  CHEF  /////////////////////////////
//////////////////////////////////////////////////////////////////

exports.chefSignupView = (req,res) => res.render('auth/chefSignup')

exports.chefSignupProcess = async (req, res) => {
  const role = "Chef"
  const { names, lastNames, email, password, password2 } = req.body

  if (!names || !lastNames || !email || !password) {
    return res.render('auth/chefSignup', { errorMessage: 'All fields are mandatory. Please provide your email and password.' })
  }

  if (password!==password2) {
    return res.render('auth/chefSignup', { errorMessage: 'Passwords do not match'})
  }

  const user = await User.findOne({ email })
  if (user) {
    return res.render('auth/chefSignup', { errorMessage: 'User already exists'})
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    return res.render('auth/chefSignup', { errorMessage: 'Password needs to have at least 6 characterss and must contain at least one number, one lowercase and one uppercase letter.' })
  }

  const salt = bcrypt.genSaltSync(12)
  const hashPass = bcrypt.hashSync(password, salt)
  await User.create({
        names,
        lastNames,
        email,
        role,
        passwordHash: hashPass
  })

    await userRegister(names, email, role)
    res.redirect('/login')
}


//////////////////////////////////////////////////////////////////
/////////////////////////////  USER  /////////////////////////////
//////////////////////////////////////////////////////////////////]

exports.userSignupView = (req, res) => res.render('auth/userSignup')


exports.userSignupProcess = async (req, res) => {
  const role = "User"
  const { names, lastNames, email, password, password2 } = req.body

  if (!names || !lastNames || !email || !password) {
    return res.render('auth/userSignup', { errorMessage: 'All fields are mandatory. Please provide your email and password.' })
  }

  if (password!==password2) {
    return res.render('auth/userSignup', { errorMessage: 'Passwords do not match'})
  }

  const user = await User.findOne({ email })
  if (user) {
    return res.render('auth/userSignup', { errorMessage: 'User already exists'})
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    return res.render('auth/userSignup', { errorMessage: 'Password needs to have at least 6 characterss and must contain at least one number, one lowercase and one uppercase letter.' })
  }

  const salt = bcrypt.genSaltSync(12)
  const hashPass = bcrypt.hashSync(password, salt)
  await User.create({
        names,
        lastNames,
        email,
        role,
        passwordHash: hashPass
  })

    await userRegister(names, email, role)
    res.redirect('/login')
}


////////////////////////  LOGIN / LOGOUT  ////////////////////////

exports.loginView = (req,res) => res.render('auth/login')

exports.loginProcess = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
  failureFlash: true
})

exports.logout = (req,res) => {
  req.logout()
  res.redirect('/login')
}

////////////////////////  PROFILES  ////////////////////////

exports.chefProfile = (req, res) => {
  
}

exports.chefEditProfile = (req, res) => {
  
}

exports.userEditProfile = (req, res) => {
  
}

exports.userProfile = (req,res) => {

}

////////////////////////  GOOGLE  ////////////////////////

exports.googleInit = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})

exports.googleCb = passport.authenticate("google", {
  successRedirect: "/", //CHANGE
  failureRedirect: "/login"
})