import { Router } from "express"
import { deleteUser, patchUser, getUsers, getUserById } from "../controller/user-controller.js"
import { validateId } from "../middleware/validate-id.js"
const router = Router()

//GET
router.get("/", getUsers)
router.get("/:id", validateId, getUserById)

//PATCH
router.patch("/:id", validateId, patchUser)

//DELETE
router.delete("/:id", validateId, deleteUser)

export default router;