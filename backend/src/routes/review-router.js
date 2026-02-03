import { Router } from "express"
import { addReview, getReviews } from "../controller/review-controller.js"

const router = Router()

router.post("/reviews", addReview)
router.get("/reviews", getReviews)

export default router
