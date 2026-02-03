import {Router} from "express"
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