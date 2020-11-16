const Router=require('express')
const uploadPicture=require('../configs/cloudinary')
const {createEvent, viewCreateEvent, updateEvent, viewEditEvent}=require('../controllers/events')
const router=Router()

router.get('/create', viewCreateEvent)
router.post('/create', uploadPicture.single('image'), createEvent)
router.get('/edit/:id', viewEditEvent)

router.post('/edit/:id', uploadPicture.single('image'), updateEvent)

module.exports = router;