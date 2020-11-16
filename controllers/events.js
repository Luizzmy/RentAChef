const Event = require('../models/Event.model')
const User=require('../models/User.model')

exports.viewCreateEvent=(req, res)=>res.render('Events/createEvent')

exports.createEvent= async (req,res)=>{
  const {name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu}=req.body
  const picture=req.file.path
  await Event.create({name, type, city, state, country, capacity, start, end, description, date, foodTypes, menu, picture})
  res.render('Events/events-user')
}
