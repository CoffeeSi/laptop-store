import { Router } from "express"
import { patchUser, getUserById, getOrdersOfUser, getReviewsOfUser } from "../controller/user-controller.js"
import { validateId } from "../middleware/validate-id.js"
import { protect } from "../middleware/role-validator.js"

const user_router = Router()

//GET
//router.get("/users/", getUsers)
user_router.get("/:id", protect, validateId, getUserById)
user_router.get("/:id/orders", protect, validateId, getOrdersOfUser)
user_router.get("/:id/reviews", protect, validateId, getReviewsOfUser)

//PATCH
user_router.patch("/:id", protect, validateId, patchUser)
//DELETE
//router.delete("/users/:id", validateId, deleteUser)

export default user_router
