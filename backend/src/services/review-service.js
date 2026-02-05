import Review from "../model/review-model.js"
import mongoose from "mongoose";
export const createReview = async(dataSet)=>{

    const {dto, user_id } = dataSet
    if (!mongoose.Types.ObjectId.isValid(user_id) &&!mongoose.Types.ObjectId.isValid(laptop_id) ){
        throw new Error("invalid id")
    }
    const review = new Review({
        rating : dto.rating,
        comment : dto.comment,
        laptop_id : dto.laptop_id,
        user_id : user_id
    })
    
    await review.save()
    return review


}

export const listReviews = async()=>{

    const reviews = await Review.find()
    .populate("user_id")
    .populate("laptop_id")
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