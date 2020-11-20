const Event = require("../models/Event.model");
const User = require("../models/User.model");
const Menu = require('../models/Menu.model')

//Event Creation
exports.viewCreateEvent = (req, res) => {
  const { _id } = req.user;
  const userId = _id;
  console.log(userId);
  res.render("Events/createEvent", { token: process.env.MAPBOX_TOKEN });
};

exports.createEvent = async (req, res) => {
  const {
    name,
    type,
    address,
    city,
    state,
    country,
    capacity,
    start,
    end,
    description,
    date,
    foodTypes,
    menu,
    lat,
    lng,
    menu_name,
    // menu

  } = req.body;
  const { _id } = req.user;
  const userId = _id;
  const location = {
    type: "Point",
    coordinates: [lng, lat],
  };
  if (req.file) {
    picture = req.file.path

  } else{
    picture=req.body.existingImage
  }
  console.log(userId);
  await Event.create({
    userId,
    name,
    type,
    address,
    city,
    state,
    country,
    capacity,
    start,
    end,
    description,
    date,
    foodTypes,
    menu,
    picture,
    location,
    // menu
  });
  res.redirect("/profile");
};

//Event Edition
exports.viewEditEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  const lng = event.location.coordinates[0];
  const lat = event.location.coordinates[1];
  res.render("Events/editEvent", {
    event,
    lng,
    lat,
    token: process.env.MAPBOX_TOKEN,
  });
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    type,
    city,
    state,
    country,
    capacity,
    start,
    end,
    description,
    date,
    foodTypes,
    menu,
    lng,
    lat,
  } = req.body;
  const location = {
    type: "Point",
    coordinates: [lng, lat],
  };
  if (req.file) {
    picture = req.file.path

  } else{
    picture=req.body.existingImage
  }

  const event = await Event.findByIdAndUpdate(
    id,
    {
      name,
      type,
      city,
      state,
      country,
      capacity,
      start,
      end,
      description,
      date,
      foodTypes,
      menu,
      picture,
      location,
    },
    { new: true }
  );
  console.log(event);
  res.redirect("/profile");
};

//List All Events
exports.viewMyEvents = async (req, res) => {
  const { id } = req.user;
  const events = await Event.find({ userId: id });
  res.render("Events/events-user", { events });
};

exports.publicViewMyEvents = async (req, res) => {
  const { id } = req.params;
  const events = await Event.find({ userId: id });
  res.render("Events/publicEvents", { events });
};

//Event Details
exports.viewEventDetails = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  const user = await User.findById(event.userId)
  console.log(user);
  res.render("Events/eventDetail", { event, user, token: process.env.MAPBOX_TOKEN });
};

exports.publicViewEventDetails = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  const user = await User.findById(event.userId)
  console.log(user);
  res.render("Events/publicEventDetail", { event, user, token: process.env.MAPBOX_TOKEN });
};

//Event Delete
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { event } = await Event.findByIdAndDelete(id);
  console.log(event);
  res.redirect("/profile");
};

//Menu View
exports.eventMenuView = async (req, res) => {
  const { id } = req.params
  const menus = await Menu.find({ eventId: id })
  res.render("menus/eventMenu", { menus, id })
}

exports.publicEventMenuView = async (req, res) => {
  const { id } = req.params
  const menus = await Menu.find({ eventId: id })
  res.render("menus/publicEventMenu", { menus, id })
}

exports.createMenuView = (req, res) => {
  const {id}=req.params
  console.log(id)
  res.render('menus/createEventMenu', {id})
}

exports.createMenuProcess = async (req, res) => {
  const {id} = req.params
  const eventId=id
  const userId=req.user._id
  const {name, type, price, description} = req.body
  const menu=await Menu.create({
    userId,
    eventId,
    name,
    type,
    price,
    description
  })
  console.log(menu)
  res.redirect('/menus')
}

exports.deleteMenu = async (req, res) => {
  const { id } = req.params
  await Menu.findByIdAndDelete(id)
  res.redirect('/menus')
}

exports.editMenuView = async (req,res) => {
  const { id } = req.params
  const menu = await Menu.findById(id)
  res.render('menus/editEventMenu', menu)
}

exports.editMenuProcess = async (req, res) => {
  const { id } = req.params
  const {name, type, price, description} = req.body
  await Menu.findByIdAndUpdate(id,
    {
    name,
    type,
    price,
    description
  })
  res.redirect('/menus')
}