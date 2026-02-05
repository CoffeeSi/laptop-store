import { Router } from "express"
import { addOrder, getOrders } from "../controller/orders-controller.js"
import { validateId } from "../middleware/validate-id.js"

const order_router = Router()

<<<<<<< HEAD
order_router.post("/orders", addOrder)
order_router.get("/orders", getOrders)
=======
router.post("/", addOrder)
router.get("/", getOrders)
>>>>>>> d36d5aa27ff1632bc20a8f8565273c920dbe8f37

export default order_router
