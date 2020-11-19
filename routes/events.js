const Router=require('express')
const uploadPicture=require('../configs/cloudinary')
const {createEvent,
  viewCreateEvent,
  updateEvent, 
  viewEditEvent, 
  viewMyEvents,
  viewEventDetails,
  deleteEvent,
  eventMenuView,
  createMenuView,
  createMenuProcess,
  deleteMenu,
  editMenuView,
  editMenuProcess,
  publicViewMyEvents,
  publicViewEventDetails,
  publicEventMenuView,
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

//Event Menu
router.get('/:id/menu/', eventMenuView)
router.get('/:id/menu/create', createMenuView)
router.post('/:id/menu/create', createMenuProcess)
router.get('/:id/menu/delete', deleteMenu)
router.get('/:id/menu/edit', editMenuView)
router.post('/:id/menu/edit', editMenuProcess)

//Public Events
router.get('/:id/events-user', publicViewMyEvents)
router.get('/:id/events-user/detail', publicViewEventDetails )
router.get('/:id/publicmenu', publicEventMenuView )

module.exports = router;
