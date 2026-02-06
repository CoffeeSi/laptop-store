import * as z from "zod"
import { createReview, listReviews, removeReview } from "../services/review-service.js"
import { createReviewDTO } from "./dto/create-review.js"
export const addReview = async (req, res, next) => {
  try {

    const dto = await createReviewDTO.parseAsync(req.body)
    const review = await createReview({dto : dto, user_id : req.user.id})
    res.status(201).json(review)

  } catch (err) {
        if (err instanceof z.ZodError){
        return res.status(400).json({message : "Bad request data"})
    }
    next(err)
  }
}

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await listReviews()
    res.status(200).json(reviews)
  } catch (err) {
    next(err)
  }
}

export const deleteReview = async(req,res,next)=>{

  try{

    const removed = await removeReview({review_id: req.params.id,role: req.user.role,user_id: req.user.id });
    res.status(200).json(removed)

  }catch(err){
    if (err.message == "not found"){
      return res.status(404).json("Not found")
    }
    next(err)
  }

}
