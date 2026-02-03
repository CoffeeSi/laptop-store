import { Router } from "express"
import {addLaptop, deleteLaptop, patchLaptop, getLaptops, getLaptopById} from "../controller/laptop-controller.js"

import { validateId } from "../middleware/validate-id.js"
import { brandExists } from "../middleware/brand-exists.js"

const router = Router()

// GET
router.get("/laptops", getLaptops)
router.get("/laptops/:id", validateId, getLaptopById)

// POST
router.post("/laptops", brandExists, addLaptop)

// PATCH
router.patch("/laptops/:id", validateId, brandExists, patchLaptop)

// DELETE
router.delete("/laptops/:id", validateId, deleteLaptop)

export default router
