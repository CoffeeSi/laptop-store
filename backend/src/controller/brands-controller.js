
import {registerBrand, getBrandStatistics, getAllBrands, deleteBrand as removeBrand} from "../services/brand-service.js"
import { createBrandDTO } from "./dto/create-brand.js"
export const addBrand = async (req, res, next) =>{

    try{
        const dto = await createBrandDTO(req.body)
        const newBrand = await registerBrand(dto)

        return res.status(201).json(newBrand)

    }catch(err){
        if (err.message == "Already exists"){
            return res.status(409).json({ message: "Brand already exists" });
        }
        if (err instanceof z.ZodError){
            return res.status(400).json({message : "Bad request data"})
        }
        if (err.message == "invalid name or country"){
            return res.status(400).json({message : "Bad data"})
        }
        next(err)
    }
}

export const deleteBrand = async (req,res,next)=>{

    try{
        const deletedBrand = await removeBrand({brand_id : req.params.id})

        return res.status(200).json(deletedBrand)
    }catch(err){
        if (err.message == "no such brand"){
            return res.status(404).json({message : "Brand not found"})
        }
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        next(err)
    }

} 

export const getBrands = async(req,res,next)=>{

    try{

        const brands = await getAllBrands({})
        return res.status(200).json(brands)

    }catch(err){
        next(err)
    }

}
// export const getBrandById = async(req,res,next)=>{
//     try{

//         const brand = await Brand.findById(id)
//         if (!brand){
//             return res.status(404).json({message : "brand not found"})
//         }
//         return res.status(200).json(brand)

//     }catch(err){
//         if(err.message == "invalid id"){
//             return res.status(400).json({ message: "invalid id"})
//         }
//         next(err)
//     }

// }

export const getBrandStats = async (req,res,next) =>{
    try{

    const stats = await getBrandStatistics({brand_id : req.params.id})
    
    return res.status(200).send(stats)

    }catch(err){
        if(err.message == "brand dne"){
            return res.status(404).json({message : "Brand does not exists"})
        }
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        next(err)
    }
}

//not used i.g.
// export const patchBrand = async (req,res,next)=>{


//     try{

//         const {id} = req.params

//         const {brand_name, country} = req.body


//         const exists = await Brand.findOne({brand_name : {$regex : new RegExp(`^${brand_name}$`, "i")}, _id : {$ne : id}})
//         if (exists){
//             return res.status(409).json({message : "Brand with such name already exists"})
//         }
        
//         const updateData ={}
//         if (brand_name) updateData.brand_name = brand_name
//         if (country) updateData.country = country
//         const brand = await Brand.findByIdAndUpdate(id, updateData, {new: true,runValidators: true})
//         if (!brand){
//             return res.status(404).json({message : "Brand not found"})
//         }
//         return res.status(200).json(brand)
//     }catch (err){
//         next(err)
//     }

// }

