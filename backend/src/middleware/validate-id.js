import mongoose from "mongoose"

export const validateId = (req,res,next)=>{

    const {id} = req.params
    if (!mongoose.isValidObjectId(id)){
        return res.status(400).json({message : "bad id"})
    }
    next()

}
