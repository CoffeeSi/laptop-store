import { Router } from "express"
import {addLaptop, deleteLaptop, getLaptops, getLaptopById, getFilters, updateStock} from "../controller/laptop-controller.js"
import { protect, restrictTo } from "../middleware/role-validator.js"

import { validateId} from "../middleware/validate-id.js"

const laptop_router = Router()

// GET
//laptop_router.get("/", getLaptops)
laptop_router.get("/id/:id", getLaptopById)
laptop_router.get("/", getLaptops)
// laptop_router.get("/filter", getFilteredLaptops)
laptop_router.get("/filterParams", getFilters)
// POST
laptop_router.post("/", protect, restrictTo("admin"), addLaptop)

// PATCH
laptop_router.patch("/:id/stock", protect, restrictTo("admin"), validateId, updateStock)

// DELETE
laptop_router.delete("/:id", protect, restrictTo("admin"), validateId, deleteLaptop)

export default laptop_router;
