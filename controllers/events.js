const Event = require('../models/Event.model')
const User=require('../models/User.model')

//Event Creation
exports.viewCreateEvent=(req, res)=>res.render('Events/createEvent')

exports.createEvent= async (req,res)=>{
  const {name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu}=req.body
  const picture=req.file.path
  await Event.create({name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu, picture})
  res.redirect('/events-user')
}

//Event Edition
exports.viewEditEvent= async (req,res)=>{
  const {id}=req.params
  const event = await Event.findById(id)
  res.render('Events/editEvent', event)
} 

exports.updateEvent=async(req,res)=>{
  const {id}=req.params
  const {name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu}=req.body
  const picture=req.file.path
  await Event.findByIdAndUpdate(id,{name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu},{new:true})
  res.redirect('/events-user')
}