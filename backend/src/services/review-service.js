import Review from "../model/review-model.js"
import Order from "../model/order-model.js"
import mongoose from "mongoose";

export const createReview = async(dataSet)=>{

    const {dto, user_id } = dataSet
    if (!mongoose.Types.ObjectId.isValid(user_id)){
        throw new Error("invalid id")
    }
    
    const userObjectId = new mongoose.Types.ObjectId(user_id);
    const laptopObjectId = new mongoose.Types.ObjectId(dto.laptop_id);
    
    const hasPurchased = await Order.findOne({
        user_id: userObjectId,
        'items.laptop_id': laptopObjectId
    });
    
    if (!hasPurchased) {
        throw new Error("You can only review laptops you have purchased");
    }
    
    const existingReview = await Review.findOne({
        user_id: userObjectId,
        laptop_id: laptopObjectId
    });
    
    if (existingReview) {
        throw new Error("You have already reviewed this laptop");
    }
    
    const review = new Review({
        rating : dto.rating,
        comment : dto.comment,
        laptop_id : laptopObjectId,
        user_id : userObjectId
    })
    
    await review.save()
    return review


}

export const listReviews = async()=>{

    const reviews = await Review.find()
    .populate("user_id", "full_name")
    .populate("laptop_id")
    return reviews

}

export const getReviewsByLaptopId = async(laptop_id)=>{
    if (!mongoose.Types.ObjectId.isValid(laptop_id)){
        throw new Error("invalid id")
    }
    
    const reviews = await Review.find({ laptop_id })
    .populate("user_id", "full_name")
    .sort({ review_date: -1 })
    return reviews
}

export const removeReview = async({ review_id, role, user_id })=>{
    if (!mongoose.Types.ObjectId.isValid(user_id) && !mongoose.Types.ObjectId.isValid(review_id)){
        throw new Error("invalid id")
    }
    const reviewObjectId = new mongoose.Types.ObjectId(review_id)
    const userObjectId = new mongoose.Types.ObjectId(user_id)
    const filter = {
        _id: reviewObjectId
    }
    if (role !== "admin"){
        filter.user_id = userObjectId
    }

    const deletedReview = await Review.findOneAndDelete(filter)
    if (!deletedReview){
        throw new Error("not found")
    }
    return deletedReview
}