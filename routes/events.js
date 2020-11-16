const Router=require('express')
const uploadPicture=require('../configs/cloudinary')
const {createEvent,
  viewCreateEvent,
  updateEvent, 
  viewEditEvent, 
  viewMyEvents
}=require('../controllers/events')
const router=Router()

//Create Event
router.get('/create', viewCreateEvent)
router.post('/create', uploadPicture.single('image'), createEvent)

//Edit & Update Event
router.get('/edit/:id', viewEditEvent)
router.post('/edit/:id', uploadPicture.single('image'), updateEvent)

//List All Events
router.get('/events-user', viewMyEvents)

module.exports = router;