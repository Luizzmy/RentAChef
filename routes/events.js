const {Router}=require('express')
const uploadPicture=require('../configs/cloudinary')
const {createEvent, viewCreateEvent}=require('../controllers/events')
const router=Router()

router.get('/create', viewCreateEvent)
router.post('/create', uploadPicture.single('image'), createEvent)
router.get('/events-user')

module.exports = router