import mongoose from "mongoose"
import Order from "../model/order-model"
import User from "../model/user-model"
export const UserOrders = async (dataSet) => {

    const {user_id} = dataSet
    const brandObjectId = new mongoose.Types.ObjectId(user_id);
    const orders = await Order.find({user_id : brandObjectId}, {order_date : 1, status : 1, total_price : 1, items : 1})
    if (!orders || orders.length === 0){
        throw new Error("not found")
    }
    return orders
}

export const updateUserService = async(dataSet) =>{

    const id = dataSet.id
    const{full_name, email, phone, address} = dataSet.data

    if (phone && !isValidPhone(phone)) {
        throw new Error( "invalid phone format" )
    }
    if (!isValidEmail(email) && email){
       throw new Error("invalid email format")
    }
    if (email){
        const exists = await User.findOne({email : email, _id : {$ne : id}})
        if (exists) {
            throw new Error("email already exists")
        
        }
    }
    const updateData = {}
    if (full_name) updateData.full_name = full_name
    if (email) updateData.email = email
    if (phone) updateData.phone = phone
    if (address) updateData.address = address
    const user = await User.findByIdAndUpdate(
        id, updateData, {new: true,runValidators: true})

    if (!user){
        throw new Error("User not found")
    }
    return user
    
}