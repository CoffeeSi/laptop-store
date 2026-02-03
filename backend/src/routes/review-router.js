import { Router } from "express"
import { addReview, getReviews } from "../controller/review-controller.js"

const review_router = Router()

review_router.post("/reviews", addReview)
review_router.get("/reviews", getReviews)

export default review_router
