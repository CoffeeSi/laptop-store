import {Router} from "express"

import {addBrand, deleteBrand, getBrands, getBrandStats} from "../controller/brands-controller.js"
import {validateId} from "../middleware/validate-id.js"
import { protect, restrictTo } from "../middleware/role-validator.js"

const brand_router = Router()

//POST
brand_router.post("/", protect, restrictTo("admin"), addBrand)

//GET
brand_router.get("/", getBrands)
// brand_router.get("/:id", validateId, getBrandById)
brand_router.get("/stats/:id", validateId, getBrandStats)


//PATCH
//brand_router.patch("/brands/:id", validateId, patchBrand)

//DELETE
brand_router.delete("/brands/:id", protect,validateId,restrictTo("admin"), deleteBrand)

export default brand_router
