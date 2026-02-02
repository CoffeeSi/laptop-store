import mongoose from "mongoose"
import Brand from "./models/brand-model.js"

export const addBrand = async (req, res, next) =>{

    try{

        const {brand_name, country} = req.body
        if (!brand_name || !country){
            return res.status(400).json({message : "Bad request, no brand or country"})
        }
        const exists = await Brand.findOne({brand_name : {$regex : new RegExp(`^${brand_name}$`, "i")}})
        if (exists){
            return res.status(409).json({message : "Brand with such name already exists"})
        }

        const newBrand = new Brand({

            brand_name,
            country

        })

        await newBrand.save()

        return res.status(201).json(newBrand)
    }catch(err){
        next(err)
    }

}