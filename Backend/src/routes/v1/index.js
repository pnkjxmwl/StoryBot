import  express  from "express";
import { createstory, getStory } from "../../controllers/story-controller.js";

const router= express.Router()

router.post('/story',createstory);
router.get('/story',getStory);

export default router;
