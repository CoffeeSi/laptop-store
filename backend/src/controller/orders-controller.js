import Order from "../model/order-model.js"
import Laptop from "../model/laptop-model.js"
import { createOrder , changeOrderStatus, refundLaptop} from "../services/order-service.js"

export const addOrder = async (req, res, next) => {
  try {
    const order = createOrder(req.body)
    if (!order){
      res.status(400).json({message : "bad request"})
    }
    res.status(201).json(order)

  } catch (err) {
    if (err.message == "order items required"){
      res.status(400).json("order items are empty")
    }
    if (err.message == "laptop not found"){

      res.status(400).json("laptop not found")

    }
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

export const patchOrderStatus = async(req,res,next)=>{
  try{
  const exportDataSet = {
    id : req.params.id,
    status : req.body.status
  }
  const order = await changeOrderStatus(exportDataSet)
  res.status(200).json(order)
  }catch(err){
    if (err.message == "Order not found"){
      res.status(404).json({message : "Order not found"})
    }
    next(err)
  }
}

export const patchOrderItems = async(req,res,next)=>{

  try{
    const dataSet = {

      id : req.params.id,
      laptop_id : req.body.laptop_id

    }
    const newOrder = await refundLaptop(dataSet)

    res.status(200).json(newOrder)
  }catch(err){
    if(err.message == "bad data"){
      res.status(400).json({message : "Bad data"})
    }
    if (err.message == "Order not found"){

      res.status(404).json({message : "Order not found"})
    }
    next(err)
  }

}