import {Router} from "express"

import {addBrand, deleteBrand, patchBrand, getBrands, getBrandById} from "../controller/brands-controller.js"
import {validateId} from "../middleware/validate-id.js"

const brand_router = Router()

//POST
brand_router.post("/brands", addBrand)

//GET
brand_router.get("/brands", getBrands)
brand_router.get("/users/:id", validateId, getBrandById)

//PATCH
brand_router.patch("/users/:id", validateId, patchBrand)

//DELETE
brand_router.delete("/users/:id", validateId, deleteBrand)

export default brand_router