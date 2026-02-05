import { Router } from "express"
import { addOrder, getOrders } from "../controller/orders-controller.js"
import { validateId } from "../middleware/validate-id.js"

const order_router = Router()

order_router.post("/", addOrder)
order_router.get("/", getOrders)

export default order_router
