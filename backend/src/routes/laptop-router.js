import { Router } from "express"
import {addLaptop, deleteLaptop, patchLaptop, getLaptops, getLaptopById, getFilteredLaptops} from "../controller/laptop-controller.js"

import { validateId, brandExists } from "../middleware/validate-id.js"

const laptop_router = Router()

// GET
//laptop_router.get("/", getLaptops)
laptop_router.get("/:id", validateId, getLaptopById)
laptop_router.get("/filter", getFilteredLaptops)

// POST
laptop_router.post("/", brandExists, addLaptop)

// PATCH
laptop_router.patch("/:id", validateId, brandExists, patchLaptop)

// DELETE
laptop_router.delete("/:id", validateId, deleteLaptop)

export default laptop_router;
