import {Router} from "express"
import { deleteUser, patchUser, getUsers, getUserById } from "../controller/user-controller.js"
import { validateId } from "../middleware/validate-id.js"
const user_router = Router()

//GET
user_router.get("/users/", getUsers)
user_router.get("/users/:id", validateId, getUserById)

//PATCH
user_router.patch("/users/:id", validateId, patchUser)

//DELETE
user_router.delete("/users/:id", validateId, deleteUser)

export default user_router
