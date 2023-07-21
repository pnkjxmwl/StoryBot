import  express  from "express";
import { createstory, getAllStory, getStory } from "../../controllers/story-controller.js";
import { createUser ,getUser,signIn,isAuthenticated } from '../../controllers/user-controller.js'

const router= express.Router()

router.post('/story',createstory);
router.get('/story',getStory);
router.get('/stories',getAllStory)

router.get('/user',getUser)
router.post('/signup',createUser)
router.post('/signin',signIn)
router.get('/isAuthenticated',isAuthenticated)
export default router;
