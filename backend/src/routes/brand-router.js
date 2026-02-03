import {Router} from "express"

import {addBrand, deleteBrand, patchBrand, getBrands, getBrandById} from "../controller/brands-controller"
import {validateId} from "../middleware/validate-id"

const router = Router()

//POST
router.post("/brands", addBrand)

//GET
router.get("/brands", getBrands)
router.get("/users/:id", validateId, getBrandById)

//PATCH
router.patch("/users/:id", validateId, patchBrand)

//DELETE
router.delete("/users/:id", validateId, deleteBrand)