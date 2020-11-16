const bcrypt = require('bcrypt')
const User = require('../models/User.model')
const Chef = require('../models/Chef.model.js')
const passport = require('../configs/passport')
const {emailRegister} = require('..configs/nodemailer')

exports.landingPage = (req, res) => res.render('index')

exports.chefSignupView = (req,res) => res.render('auth/chef/signup')

exports.chefSignupProcess = async (req, res) => {

}

exports.userSignupView = (req,res) => res.render('auth/user/signup')

exports.userSignupProcess = async (req, res) => {

}

exports.loginView = (req,res) => res.render('/auth/login')

exports.loginProcess = async (req,res) => {

}

exports.logout = (req,res) => {
  req.logout()
  res.redirect('/login')
}

exports.chefHome = (req, res) => {

}

exports.userHome = (req,res) => {
  
}