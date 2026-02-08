import * as z from "zod"
import { createReview, listReviews, removeReview, getReviewsByLaptopId } from "../services/review-service.js"
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
    if (err.message === "You can only review laptops you have purchased") {
        return res.status(403).json({message : err.message})
    }
    if (err.message === "You have already reviewed this laptop") {
        return res.status(400).json({message : err.message})
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

export const getReviewsByLaptop = async (req, res, next) => {
  try {
    const reviews = await getReviewsByLaptopId(req.params.laptopId)
    res.status(200).json(reviews)
  } catch (err) {
    if (err.message === "invalid id") {
      return res.status(400).json({message : "Invalid laptop ID"})
    }
    next(err)
  }
}

export const deleteReview = async(req,res,next)=>{

  try{

    const removed = await removeReview({review_id: req.params.id,role: req.user.role,user_id: req.user.id });
    res.status(200).json(removed)

  }catch(err){
    if (err.message == "not found"){
      res.status(404).json("Not found")
    }
    next(err)
  }

}
