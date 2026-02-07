import { Router } from "express"
import { addOrder,  getOrders,  patchOrderItems, patchOrderStatus } from "../controller/orders-controller.js"
import { validateId } from "../middleware/validate-id.js"
import { protect, restrictTo } from "../middleware/role-validator.js"

const order_router = Router()

order_router.post("/", protect, addOrder)

order_router.get("/", protect, getOrders)

//patch status
order_router.patch("/:id", protect, restrictTo("admin"),validateId, patchOrderStatus)

//patch order items
order_router.patch("/:id", protect, validateId, patchOrderItems)

export default order_router
