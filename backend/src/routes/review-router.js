import { Router } from "express"
import { addReview, deleteReview } from "../controller/review-controller.js"
import { validateId } from "../middleware/validate-id.js"
import { protect} from "../middleware/role-validator.js"

const review_router = Router()

review_router.post("/", protect, addReview)

//review_router.get("/", getReviews)

review_router.delete("/:id", protect, validateId, deleteReview)

export default review_router
