const bcrypt = require('bcrypt')
const User = require('../models/User.model')
const Menu = require('../models/Menu.model')
const passport = require('../configs/passport')
const {userRegister, userContact} = require('../configs/nodemailer')

const mongoose = require('mongoose');

////////////////////////  MENU /////////////////////////

//TO DO
//edit and delete

exports.userMenuView = async (req, res) => {
  const { id } = req.user
  const menus = await Menu.find({ userId: id })
  console.log({menus})
  res.render("menus/userMenu", { menus })
}

exports.createMenuView = (req, res) => res.render('menus/createMenu')

exports.createMenuProcess = async (req, res) => {
  const userId = req.user._id
  const {name, type, price, description} = req.body
  const menu=await Menu.create({
    userId,
    name,
    type,
    price,
    description
  })
  console.log(menu)
  res.redirect('/menus')
}

//FINISH
exports.deleteMenu = async (req, res) => {

}

//FINISH
exports.editMenuView = (req,res) => {}
//FINISH
exports.editMenuProcess = async (req, res) => {
}


////////////////////////  LOGIN / LOGOUT  ////////////////////////


exports.loginView = (req,res) => res.render('auth/login')

exports.loginProcess = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
})

exports.logout = (req,res) => {
  req.logout()
  res.redirect('/login')
}

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
        password: hashPass
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
        password: hashPass
  })

    await userRegister(names, email, role)
    res.redirect('/login')
}

////////////////////////  PROFILES  ////////////////////////

// exports.profileView = (req, res) => res.render('profiles/userProfile')
exports.profileView = async (req,res) => {
  const {_id} = req.user
  const user = await User.findById(_id)
  user.isChef = req.user.role === 'Chef'
  res.render('profiles/userProfile', user)
}

exports.publicProfileView=async(req,res)=>{
  const {id}=req.params
  const user=await User.findById(id)
  user.isChef = req.user.role === 'Chef'
  console.log(user)
  res.render('profiles/publicProfile', user)
}

exports.userEditProfileView = async (req,res) => {
  const {_id} = req.user
  const user = await User.findById(_id)
  user.isChef = req.user.role === 'Chef'
  res.render('profiles/userEditProfile', user)
}

exports.userEditProfileProcess = async (req,res,next) => {
  const id = req.user.id
  let picture = ""

  const { names, lastNames, email, favFoods, description, phoneNumber, city, state, country
    // menu_name, 
    // menu_type, 
    // menu_price, 
    // menu_description
  } = req.body
  // console.log(menu_description)
  if (req.file) {
    picture = req.file.path
  } 

  await User.findByIdAndUpdate(id, 
    {
      names,
      picture,
      lastNames, 
      email, 
      favFoods, 
      description, 
      phoneNumber, 
      city, 
      state, 
      country
      // 'menu.name': menu_name,
      // 'menu.type': menu_type,
      // 'menu.price': menu_price
      // 'menu.description': menu_description
    },
    { new: true })
  res.redirect('/profile')
}

//Write email
exports.viewWriteEmail=async (req,res)=>{
  const {id}=req.params
  const {email}=req.user
  const sender=email
  const user= await User.findById(id)
  console.log(sender)
  res.render('emails/sendemail', {user,sender})
}

exports.sendEmail=async (req,res)=>{
  const {sender, email, body, budget}=req.body
  const {names}=req.user
  const {id}=req.params
  const user= await User.findById(id)
  senderName=names
  const userName=user.names
  await userContact(userName, senderName, email, sender, body, budget)
  res.redirect('/profile')
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