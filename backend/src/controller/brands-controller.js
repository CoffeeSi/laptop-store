import mongoose from "mongoose"
import Brand from "../model/brand-model.js"
import {registerBrand, getBrandStatistics} from "../services/brand-service.js"
export const addBrand = async (req, res, next) =>{

    try{

        const newBrand = registerBrand(req.body)

        return res.status(201).json(newBrand)

    }catch(err){
        if (err.message == "Already exists"){
            return res.status(409).json({ message: "Brand already exists" });
        }
        if (err.message == "invalid name or country"){
            return res.status(400).json({message : "Bad data"})
        }
        next(err)
    }
}

export const deleteBrand = async (req,res,next)=>{

    try{
        const deletedBrand = deleteBrand(req.params)

        return res.status(200).json(deletedBrand)
    }catch(err){
        if (err.message == "no such brand"){
            return res.status(404).json({message : "Brand not found"})
        }
        next(err)
    }

} 

export const patchBrand = async (req,res,next)=>{


    try{

        const {id} = req.params

        const {brand_name, country} = req.body


        const exists = await Brand.findOne({brand_name : {$regex : new RegExp(`^${brand_name}$`, "i")}, _id : {$ne : id}})
        if (exists){
            return res.status(409).json({message : "Brand with such name already exists"})
        }
        
        const updateData ={}
        if (brand_name) updateData.brand_name = brand_name
        if (country) updateData.country = country
        const brand = await Brand.findByIdAndUpdate(id, updateData, {new: true,runValidators: true})
        if (!brand){
            return res.status(404).json({message : "Brand not found"})
        }
        return res.status(200).json(brand)
    }catch (err){
        next(err)
    }

}

export const getBrands = async(req,res,next)=>{

    try{

        const brands = await Brand.find({})
        return res.status(200).json(brands)

    }catch(err){
        next(err)
    }

}
export const getBrandById = async(req,res,next)=>{
    try{
        const id = req.params.id

        const brand = await Brand.findById(id)
        if (!brand){
            return res.status(404).json({message : "brand not found"})
        }
        return res.status(200).json(brand)

    }catch(err){
        next(err)
    }

}

export const getBrandStats = async (req,res,next) =>{
    try{

    const stats = await getBrandStatistics(req.params)
    
    return res.status(200).send(stats)

    }catch(err){
        if(err.message == "brand dne"){
            return res.status(404).json({message : "Brand does not exists"})
        }
    }
}
