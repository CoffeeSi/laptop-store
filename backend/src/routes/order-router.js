import { Router } from "express"
import { addOrder, getOrders } from "../controller/orders-controller.js"
import { validateId } from "../middleware/validate-id.js"

const order_router = Router()

order_router.post("/orders", addOrder)
order_router.get("/orders", getOrders)

export default order_router
