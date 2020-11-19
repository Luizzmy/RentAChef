const User = require('../models/User.model')
const Menu = require('../models/Menu.model')
const Event = require("../models/Event.model");
const mongoose = require('mongoose');

//regex
exports.landingPage = (req,res,next) => res.render('index')

exports.search = async (req,res) => {
  const {searchText, filter} = req.body
  let results, eventCreators
  if(filter === "chefs") {
    results = await User.find({ $and : [{role:"Chef"},{'$or': [{names:new RegExp(searchText,'i')},{lastNames:new RegExp(searchText,'i')}]}]})
  } else if (filter === "users") {
    results = await User.find({ $and : [{role:"User"},{'$or': [{names:new RegExp(searchText,'i')},{lastNames:new RegExp(searchText,'i')}]}]})
  } else if (filter === "event") {
    eventCreators = await User.find({'$or': [{names:new RegExp(searchText,'i')},{lastNames:new RegExp(searchText,'i')}]})
    if (eventCreators) {
      eventCreators.forEach(element => {
        console.log(`CONSOLE LOGGGGG ${element.names} ==> ${element._id}`)
        results.push() //NOT FINISHED
      })
    } else {
      results = await Event.find({'$or': [{names:new RegExp(searchText,'i')},{lastNames:new RegExp(searchText,'i')}]})
    }
    // results = await Event.find('$or': [{name:}])
  }
  console.log(searchText, filter, results)
  res.redirect('/feed', results)
}