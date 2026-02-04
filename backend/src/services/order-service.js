import mongoose from "mongoose"
import Order from "../model/order-model"
import Laptop from "../model/laptop-model"
export const createOrder = async (dataSet) =>{

    const {user_id, items} = dataSet 
    
    if (!items || items.length === 0) {
      throw new Error("order items required")
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        let totalPrice = 0

        for (const item of items) {
        const laptop = await Laptop.findById(item.laptop_id).session(session)

        if (!laptop) {
            throw new Error("laptop not found")
        }

        if (laptop.stock_quantity < item.quantity){
            throw new Error("not in stock")
        }

        totalPrice += laptop.price * item.quantity
        item.unit_price = laptop.price
        laptop.stock_quantity -=item.quantity
        await laptop.save({session})
        }
        const status = "pending"
        const order = new Order({
            user_id,
            items,
            totalPrice,
            status
        })
        await order.save({session})
        return order
    }catch(err){
        await session.abortTransaction();
        throw err;
    }finally {
        session.endSession();
    }
}   

export const changeOrderStatus = async (dataSet)=>{

    const {id,status} = dataSet

    const order = await Order.findByIdAndUpdate(id, {status},{new : true, runValidators : true})
    if (!order){
        throw new Error("Order not found")
    }
    return order


}

export const refundLaptop = async (dataSet) => {
    const { id, laptop_id } = dataSet
    if (!laptop_id || !id){
        throw new error("bad data")
    }
    const order = await Order.findById(id)
    if (!order) throw new Error("Order not found")

    const itemIndex = order.items.findIndex(item => item.laptop_id.toString() === laptop_id)
    
    if (itemIndex > -1) {
        const priceToSubtract = order.items[itemIndex].price

        order.total_price -= priceToSubtract

        order.items.splice(itemIndex, 1)
    
        await order.save()
    }

    return order;
};
