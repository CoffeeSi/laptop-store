import { Router } from "express"
import { addOrder,  listOrders, getOrdersByUserID, patchOrderItems, patchOrderStatus } from "../controller/orders-controller.js"
import { validateId } from "../middleware/validate-id.js"
import { protect, restrictTo } from "../middleware/role-validator.js"

const order_router = Router()

order_router.post("/", protect, addOrder)

order_router.get("/", protect, getOrdersByUserID)
order_router.get("/all/", protect, restrictTo("admin"), listOrders)

//patch status
order_router.patch("/:id/status", protect, restrictTo("admin"),validateId, patchOrderStatus)

//refund item from order
order_router.patch("/:id/refund", protect, validateId, patchOrderItems)

export default order_router
