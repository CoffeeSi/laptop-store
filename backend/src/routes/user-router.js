<<<<<<< HEAD
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
=======
import { Router } from "express"
import { deleteUser, patchUser, getUsers, getUserById } from "../controller/user-controller"
import { validateId } from "../middleware/validate-id"
const router = Router()

//GET
router.get("/users/", getUsers)
router.get("/users/:id", validateId, getUserById)

//PATCH
router.patch("/users/:id", validateId, patchUser)

//DELETE
router.delete("/users/:id", validateId, deleteUser)
>>>>>>> d36d5aa27ff1632bc20a8f8565273c920dbe8f37
