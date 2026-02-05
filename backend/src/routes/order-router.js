import { Router } from "express"
import { addOrder, getOrders } from "../controller/orders-controller.js"
import { validateId } from "../middleware/validate-id.js"

const router = Router()

router.post("/", addOrder)
router.get("/", getOrders)

export default router
