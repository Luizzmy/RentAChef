const Router=require('express')
const uploadPicture=require('../configs/cloudinary')
const {createEvent,
  viewCreateEvent,
  updateEvent, 
  viewEditEvent, 
  viewMyEvents,
  viewEventDetails,
  deleteEvent,
  viewWriteEmail
}=require('../controllers/events')
const { 
  isAuth, 
  isNotAuth,
  checkRole
} = require('../middlewares/index')
const router=Router()

//Create Event
router.get('/create', isAuth, viewCreateEvent)
router.post('/create', uploadPicture.single('image'), createEvent)

//Edit & Update Event
router.get('/edit/:id', isAuth, viewEditEvent)
router.post('/edit/:id', uploadPicture.single('image'), updateEvent)

//List All Events
router.get('/events-user', isAuth, viewMyEvents)

//Event details
router.get('/detail/:id', isAuth, viewEventDetails)

//Delete event
router.post('/delete/:id', deleteEvent)

module.exports = router;
