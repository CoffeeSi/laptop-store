import mongoose from "mongoose"
import Order from "../model/order-model.js"
import User from "../model/user-model.js"
import Review from "../model/review-model.js"
export const getUserOrders = async (dataSet) => {

    const id = dataSet.user_id
    if (!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("invalid id")
    }
    const brandObjectId = new mongoose.Types.ObjectId(id);

    const orders = await Order.find({user_id : brandObjectId})
    return orders
}

export const updateUserService = async(dataSet) =>{

    const id = dataSet.user_id

    const{full_name, email, phone, address} = dataSet.data

    if (!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("invalid id")
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

export const getUserDataById = async(dataSet)=>{

    const id = dataSet.user_id
    if (!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("invalid id")
    }
    const user = await User.findById(id)
    if (!user){
        throw new Error("user not found")
    }
    return user

}

export const getUserReviews = async(dataSet)=>{

    const id = dataSet.user_id
    if (!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("invalid id")
    }
    const userObjectId = new mongoose.Types.ObjectId(id);
    const reviews = await Review.find({user_id : userObjectId})
    return reviews

}