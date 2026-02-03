import mongoose from "mongoose"
import Brand from "./model/brand-model.js"
export const validateId = (req,res,next)=>{

    const {id} = req.params
    if (!mongoose.isValidObjectId(id)){
        return res.status(400).json({message : "bad id"})
    }
    next()

}

export const brandExists = (req,res,next)=>{


    const {brand_id} = req.body
    const exists = Brand.exists({_id : brand_id})
    if (!exists){
        res.status(404).json("brand not found")
    }

    next()


}