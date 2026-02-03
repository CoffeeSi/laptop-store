import mongoose from "mongoose"
import Brand from "../model/brand-model.js"
export const validateId = (req,res,next)=>{

    const {id} = req.params
    if (!mongoose.isValidObjectId(id)){
        return res.status(400).json({message : "bad id"})
    }
    next()

}

export const brandExists = async (req,res,next)=>{
    const { brand_id} = req.body

    if (!mongoose.isValidObjectId(brand_id)) {
        return res.status(400).json({ message: "invalid brand id" })
    }

    const exists = await Brand.exists({ _id: brand_id })
    if (!exists) {
        return res.status(404).json({ message: "brand not found" })
    }

    next()

}