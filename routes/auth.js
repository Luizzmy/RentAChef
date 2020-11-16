const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Chef = require('../models/Chef.model');
const mongoose = require('mongoose');
const fileUploader = require('../configs/cloudinary')

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));