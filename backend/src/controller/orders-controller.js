import { listOrders, createOrder , changeOrderStatus, refundLaptop} from "../services/order-service.js"
import { createOrderDTO } from "./dto/create-order.js"
import * as z from "zod"

export const addOrder = async (req, res, next) => {
  try {
    const dto = await createOrderDTO.parseAsync(req.body)
    const order = await createOrder({items : dto.items, user_id : req.user.id})

    res.status(201).json(order)

  } catch (err) {
    if (err.message == "order items required"){
      res.status(400).json("order items are empty")
    }
    if (err.message == "laptop not found"){

      res.status(400).json("laptop not found")
    }
    if (err instanceof z.ZodError){
      return res.status(400).json({message : "Bad request data"})
    }
    next(err)
  }
}


export const patchOrderStatus = async(req,res,next)=>{
  try{

  const order = await changeOrderStatus({
    order_id : req.params.id,
    status : req.body.status
  })
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

    const newOrder = await refundLaptop({

      order_id : req.params.id,
      laptop_id : req.body.laptop_id

    })

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

export const getOrders = async (req, res, next) => {
  try {
    const user_id = req.session.userID;
    const orders = await listOrders(user_id)
    res.json(orders)
  } catch (err) {
    next(err)
  }
}