const User = require('../models/User.model')
const Menu = require('../models/Menu.model')
const Event = require("../models/Event.model");
const mongoose = require('mongoose');

//regex
exports.landingPage = (req,res,next) => {
  if (req.isAuthenticated()) {
    res.redirect('/feed')
  }
  res.render('index')
}

exports.search = async (req,res) => {
  const {searchText, filter} = req.body
  

  //CHEF: CHECK IF SEARCHTEXT COMES UP AS NAME OR LASTNAME OF CHEF
  if(filter === "chefs") {
    const users = await User.find({ '$and' : [{role:"Chef"},{'$or': [{names:new RegExp(searchText,'i')},{lastNames:new RegExp(searchText,'i')}]}]})
    console.log(users)
    if (!users) {
      const error = "No results found"
      res.render('feeds/feed', {error})
      return;
    } 
    // users.forEach(element => {
    //   const celement.userId
    // })
    res.render('feeds/feed', { users })
    

  //USER: CHECK IF SEARCHTEXT COMES UP AS NAME/LASTNAME OF USER
  } else if (filter === "users") {
    const users = await User.find({ '$and' : [{role:"User"},{'$or': [{names:new RegExp(searchText,'i')},{lastNames:new RegExp(searchText,'i')}]}]})
    // userSearch.searchTerm = searchText
    console.log(users)
    if (!users) {
      const error = "No results found"
      res.render('feeds/feed', {error})
      return;
    } 
    res.render('feeds/feed', { users })
    

  //EVENT: 
  // } else if (filter === "events") {

  //   //EVENT 1A. CHECK FIRST IF SEARCHTEXT MATCHES USER OR CHEF
  //   eventCreators = await User.find({'$or': [{names:new RegExp(searchText,'i')},{lastNames:new RegExp(searchText,'i')}]})
    
  //   //EVENT 1B. IF MATCH, CHECK IF IDs MATCH EVENT.USERID (CHECK IF USERS CREATED EVENT)
  //   if (eventCreators) {
  //     eventCreators.forEach( async element => {
  //       results = await Event.find({'$or': [{userId: element._id},{name: new RegExp(searchText,'i')}]})
  //     })

  //   //EVENT 3. IF NO USER MATCH, SIMPLY SEARCH EVENTS FOR SEARCHTEXT
  //   } else {
  //     results = await Event.find({name: new RegExp(searchText,'i')})
  //   }
  } else if (filter === "events") {
    const events = await Event.find({name: new RegExp(searchText,'i')})
    console.log(events)
    if (!events) {
      const error = "No results found"
      res.render('feeds/feed', {error})
      return;
    } 
    res.render('feeds/feed', { events })
    


  } else {
    const error = "No results found"
    res.render('feeds/feed', {error})
    return;
  }

  
  // console.log(searchText, filter, results)
  // res.redirect('/feed', {results} )
  // res.redirect('/')
  
}

exports.feedView = async (req,res) => {
  if (req.user.role === "Chef") {
    const events = await Event.find()
    res.render('feeds/feed', {events})
  } else if (req.user.role === "User") {
    const users = await User.find({role : "Chef"})
    res.render('feeds/feed', {users})
  }
  
  res.render('feeds/feed')
}