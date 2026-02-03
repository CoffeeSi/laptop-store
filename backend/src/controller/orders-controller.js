import Order from "../model/order-model.js"
import Laptop from "../model/laptop-model.js"

export const addOrder = async (req, res, next) => {
  try {
    const { user_id, items, status } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "order items required" })
    }

    let total_price = 0

    for (const item of items) {
      const laptop = await Laptop.findById(item.laptop_id)
      if (!laptop) {
        return res.status(404).json({ message: "laptop not found" })
      }
      total_price += laptop.price * item.quantity
      item.unit_price = laptop.price
    }

    const order = new Order({
      user_id,
      items,
      total_price,
      status
    })

    await order.save()
    res.status(201).json(order)

  } catch (err) {
    next(err)
  }
}

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user_id")
      .populate("items.laptop_id")
    res.json(orders)
  } catch (err) {
    next(err)
  }
}
