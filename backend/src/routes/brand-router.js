import {Router} from "express"

import {addBrand, deleteBrand, patchBrand, getBrands, getBrandById, getBrandStats} from "../controller/brands-controller.js"
import {validateId} from "../middleware/validate-id.js"

const brand_router = Router()

//POST
brand_router.post("/brands", addBrand)

//GET
brand_router.get("/brands", getBrands)
brand_router.get("/brands/:id", validateId, getBrandById)
brand_router.get("/brands/stats/:id", validateId, getBrandStats)


//PATCH
brand_router.patch("/brands/:id", validateId, patchBrand)

//DELETE
brand_router.delete("/brands/:id", validateId, deleteBrand)

export default brand_router