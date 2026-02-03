import { Router } from "express"
import {addLaptop, deleteLaptop, patchLaptop, getLaptops, getLaptopById} from "../controller/laptop-controller.js"

import { validateId, brandExists } from "../middleware/validate-id.js"

const laptop_router = Router()

// GET
laptop_router.get("/laptops", getLaptops)
laptop_router.get("/laptops/:id", validateId, getLaptopById)

// POST
laptop_router.post("/laptops", brandExists, addLaptop)

// PATCH
laptop_router.patch("/laptops/:id", validateId, brandExists, patchLaptop)

// DELETE
laptop_router.delete("/laptops/:id", validateId, deleteLaptop)

export default laptop_router
