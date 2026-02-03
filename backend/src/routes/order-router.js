import { Router } from "express"
import { addOrder, getOrders } from "../controller/order-controller.js"
import { validateId } from "../middleware/validate-id.js"

const router = Router()

router.post("/orders", addOrder)
router.get("/orders", getOrders)

export default router
