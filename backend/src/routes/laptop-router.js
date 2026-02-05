import { Router } from "express"
import {addLaptop, deleteLaptop, patchLaptop, getLaptops, getLaptopById} from "../controller/laptop-controller.js"

import { validateId, brandExists } from "../middleware/validate-id.js"

const laptop_router = Router()

// GET
<<<<<<< HEAD
laptop_router.get("/laptops", getLaptops)
laptop_router.get("/laptops/:id", validateId, getLaptopById)

// POST
laptop_router.post("/laptops", brandExists, addLaptop)

// PATCH
laptop_router.patch("/laptops/:id", validateId, brandExists, patchLaptop)

// DELETE
laptop_router.delete("/laptops/:id", validateId, deleteLaptop)

export default laptop_router
=======
laptop_router.get("/", getLaptops)
laptop_router.get("/:id", validateId, getLaptopById)

// POST
laptop_router.post("/", brandExists, addLaptop)

// PATCH
laptop_router.patch("/:id", validateId, brandExists, patchLaptop)

// DELETE
laptop_router.delete("/:id", validateId, deleteLaptop)

export default laptop_router;
>>>>>>> d36d5aa27ff1632bc20a8f8565273c920dbe8f37
