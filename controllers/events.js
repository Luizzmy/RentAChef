const Event = require('../models/Event.model')
const User=require('../models/User.model')

//Event Creation
exports.viewCreateEvent=(req, res)=>{
  console.log(process.env.MAPBOX_TOKEN)
  res.render('Events/createEvent', {token:process.env.MAPBOX_TOKEN})
} 


exports.createEvent= async (req,res)=>{
  const {name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu}=req.body
  const picture=req.file.path
  await Event.create({name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu, picture})
  res.render('Events/events-user')
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

//List All Events
exports.viewMyEvents=async(req,res)=>{
  const events=await Event.find()
  res.render('Events/events-user', {events})
}

//Event Details
exports.viewEventDetails=async(req,res)=>{
  const {id}=req.params
  const event=await Event.findById(id)
  console.log(event)
  res.render('Events/eventDetail', event)
}

//Event Delete
exports.deleteEvent=async(req,res)=>{
  const {id}=req.params
  const {event}=await Event.findByIdAndDelete(id)
  console.log(event)
  res.redirect('/events-user')
}