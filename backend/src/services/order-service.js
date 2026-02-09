import mongoose from "mongoose"
import Order from "../model/order-model.js"
import Laptop from "../model/laptop-model.js"
import User from "../model/laptop-model.js"

export const listOrdersByUserID = async (user_id) => {
    const orders = await Order.find({"user_id": user_id}).populate("items.laptop_id")
    return orders
}

export const listOrders = async () => {
    const orders = await Order.find()
        .populate("items.laptop_id", "model_name")
        .populate("user_id", "full_name email");
    return orders;
}

export const createOrder = async (dataSet) =>{

    const {items,user_id} = dataSet
    if (!mongoose.Types.ObjectId.isValid(user_id)){
        throw new Error("invalid id")
    }
    if (!items || items.length === 0) {
      throw new Error("order items required")
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        let total_price = 0

        for (const item of items)
    {

        const laptop = await Laptop.findById(item.laptop_id).session(session)

        if (!laptop) {
            throw new Error("laptop not found")
        }

        if (laptop.stock_quantity < item.quantity){
            throw new Error("not in stock")
        }

        total_price += laptop.price * item.quantity
        item.unit_price = laptop.price
        await Laptop.findByIdAndUpdate(item.laptop_id,{$inc:{ stock_quantity: -item.quantity }},{new: true})

    }
        const status = "pending"
        const order = new Order({
            user_id,
            items,
            total_price,
            status
        })
        await order.save({session})
        await session.commitTransaction(); 
        return order
    }catch(err){
        await session.abortTransaction();
        throw err;
    }finally {
        session.endSession();
    }
}   

export const changeOrderStatus = async (dataSet)=>{

    const {order_id,status} = dataSet
    if (!mongoose.Types.ObjectId.isValid(order_id)){
            throw new Error("invalid id")
        }
    const order = await Order.findByIdAndUpdate(order_id, {status},{new : true, runValidators : true})
    if (!order){
        throw new Error("Order not found")
    }
    const user = await User.findById(order.user_id).select("email")

    if (!user || !user.email) {
        throw new Error("User email not found")
    }

    await transporter.sendMail({
        from: `"Laptop Store" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Order status updated",
        text: `Your order ${order._id} status has been changed to: ${status}`,
        html: `
        <h2>Order status updated</h2>
        <p>Order ID: <b>${order._id}</b></p>
        <p>New status: <b>${status}</b></p>
        `,
    })

    return order


}

export const refundLaptop = async (dataSet) => {
    const { order_id, laptop_id } = dataSet
    if (!mongoose.Types.ObjectId.isValid(order_id)){
        throw new Error("invalid id")
    }
    if (!laptop_id || !order_id){
        throw new Error("bad data")
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const order = await Order.findById(order_id).session(session)
        if (!order) throw new Error("Order not found")

        const itemIndex = order.items.findIndex(item => item.laptop_id.toString() === laptop_id)
        
        if (itemIndex === -1) {
            throw new Error("Item not found in order")
        }
        
        const refundedItem = order.items[itemIndex]
        const priceToSubtract = refundedItem.unit_price * refundedItem.quantity

        // Restore laptop stock
        await Laptop.findByIdAndUpdate(
            laptop_id,
            { $inc: { stock_quantity: refundedItem.quantity } },
            { session }
        )

        order.total_price -= priceToSubtract
        order.items.splice(itemIndex, 1)
    
        await order.save({ session })
        await session.commitTransaction();
        
        return order;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};
