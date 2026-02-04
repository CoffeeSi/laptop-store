import mongoose from 'mongoose'
import Brand from '../model/brand-model.js'
import Laptop from '../model/laptop-model.js'
import Review from '../model/review-model.js'
export const registerBrand = async (dataSet) =>{
    const {brand_name, country} = dataSet
    if (!brand_name || !country){
        throw new Error("invalid name or country")
    }
    const exists = await Brand.findOne({brand_name : {$regex : new RegExp(`^${brand_name}$`, "i")}})
    if (exists){throw new Error("Already exists")}

    const newBrand = new Brand({brand_name, country})

    await newBrand.save()
    
    return newBrand

}

export const deleteBrand = async(dataSet) =>{
    const {id} = dataSet
    const someBrand = await Brand.findByIdAndDelete(id);
    if (!someBrand){

        throw new Error("no such brand")
    }
    return someBrand

}

export const getBrandStatistics = async (dataSet) =>{

    const {id} = dataSet
    const brandObjectId = new mongoose.Types.ObjectId(id);
    const exists = await Brand.findById(id)

    if(!exists){
        throw new Error("brand dne")
    }
    
    let stats = await Review.aggregate([

        {$lookup : {

            from : "laptops",
            localField : "laptop_id",
            foreignField : "_id",
            as :"laptop_info"

        }},

        {$unwind : "$laptop_info"},
        {
            $match: { "laptop_info.brand_id": brandObjectId }
        },

        {
            $group : {_id : "$laptop_info.brand_id", avg : {$avg : "$rating"}, min : {$min : "$rating"}, max : {$max : "$rating"}}
        },

    ])


    
    return stats[0] 

}