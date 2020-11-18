const Event = require('../models/Event.model')
const User=require('../models/User.model')

//Event Creation
exports.viewCreateEvent=(req, res)=>{
  const {_id}=req.user
  const userId=_id
  console.log(userId)
  res.render('Events/createEvent', {token:process.env.MAPBOX_TOKEN})
} 


exports.createEvent= async (req,res)=>{
  const {name, type, address, city, state, country, capacity, start, end, description, date, foodTypes, menu, lat, lng}=req.body
  const {_id}=req.user
  const userId=_id
  const location={
    type:"Point",
    coordinates:[lng, lat]
  }
  const picture=req.file.path
  console.log(userId)
  await Event.create({userId, name, type, address, city, state, country, capacity, start, end, description, date, foodTypes, menu, picture, location})
  res.render('Events/events-user')
}

//Event Edition
exports.viewEditEvent= async (req,res)=>{
  const {id}=req.params
  const event = await Event.findById(id)
  res.render('Events/editEvent', {event, token:process.env.MAPBOX_TOKEN})
} 

exports.updateEvent=async(req,res)=>{
  const {id}=req.params
  const {name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu}=req.body
  const location={
    type:"Point",
    coordinates:[lng, lat]
  }
  const picture=req.file.path
  await Event.findByIdAndUpdate(id,{name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu, picture,location},{new:true})
  res.redirect('/events-user')
}

//List All Events
exports.viewMyEvents=async(req,res)=>{
  const {id}=req.user
  const events=await Event.find({userId:id})
  res.render('Events/events-user', {events})
}

//Event Details
exports.viewEventDetails=async(req,res)=>{
  const {id}=req.params
  const event=await Event.findById()
  console.log(event)
  res.render('Events/eventDetail', {event, token:process.env.MAPBOX_TOKEN})
}

//Event Delete
exports.deleteEvent=async(req,res)=>{
  const {id}=req.params
  const {event}=await Event.findByIdAndDelete(id)
  console.log(event)
  res.redirect('/events-user')
}