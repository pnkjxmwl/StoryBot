import  express  from "express";
import { createstory, getStory } from "../../controllers/story-controller.js";
import { createUser, getUser } from "../../controllers/user-controller.js";
const router= express.Router()

router.post('/story',createstory);
router.get('/story',getStory);
router.post('/signup',createUser)
router.get('/user',getUser)

export default router;
