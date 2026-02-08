import mongoose from 'mongoose'
import Brand from '../model/brand-model.js'
import Laptop from '../model/laptop-model.js'
import Review from '../model/review-model.js'
export const registerBrand = async (dataSet) =>{
    const {brand_name, country} = dataSet

    const exists = await Brand.findOne({brand_name : {$regex : new RegExp(`^${brand_name}$`, "i")}})
    if (exists){throw new Error("Already exists")}

    const newBrand = new Brand({brand_name, country})

    await newBrand.save()
    
    return newBrand

}

export const deleteBrand = async(dataSet) =>{
    const {brand_id} = dataSet
    if (!mongoose.Types.ObjectId.isValid(brand_id)){
        throw new Error("invalid id")
    }
    const someBrand = await Brand.findByIdAndDelete(brand_id);
    if (!someBrand){

        throw new Error("no such brand")
    }
    return someBrand

}

export const getBrandStatistics = async (dataSet) =>{

    const {brand_id} = dataSet
    if (!mongoose.Types.ObjectId.isValid(brand_id)){
        throw new Error("invalid id")
    }
    const brandObjectId = new mongoose.Types.ObjectId(brand_id);
    const exists = await Brand.findById(brand_id)

    if(!exists){
        throw new Error("brand dne")
    }
    
    const totalLaptops = await Laptop.countDocuments({ brand_id: brandObjectId });
    
    let reviewStats = await Review.aggregate([
        {
            $lookup: {
                from: "laptops",
                localField: "laptop_id",
                foreignField: "_id",
                as: "laptop_info"
            }
        },
        {
            $unwind: "$laptop_info"
        },
        {
            $match: { "laptop_info.brand_id": brandObjectId }
        },
        {
            $group: {
                _id: "$laptop_info.brand_id",
                avgRating: { $avg: "$rating" },
                minRating: { $min: "$rating" },
                maxRating: { $max: "$rating" },
                totalReviews: { $sum: 1 },
                ratings: { $push: "$rating" }
            }
        },
        {
            $project: {
                _id: 1,
                avgRating: { $round: ["$avgRating", 2] },
                minRating: 1,
                maxRating: 1,
                totalReviews: 1,

                fiveStarCount: {
                    $size: {
                        $filter: {
                            input: "$ratings",
                            as: "rating",
                            cond: { $eq: ["$$rating", 5] }
                        }
                    }
                },
                fourStarCount: {
                    $size: {
                        $filter: {
                            input: "$ratings",
                            as: "rating",
                            cond: { $eq: ["$$rating", 4] }
                        }
                    }
                },
                threeStarCount: {
                    $size: {
                        $filter: {
                            input: "$ratings",
                            as: "rating",
                            cond: { $eq: ["$$rating", 3] }
                        }
                    }
                },
                twoStarCount: {
                    $size: {
                        $filter: {
                            input: "$ratings",
                            as: "rating",
                            cond: { $eq: ["$$rating", 2] }
                        }
                    }
                },
                oneStarCount: {
                    $size: {
                        $filter: {
                            input: "$ratings",
                            as: "rating",
                            cond: { $eq: ["$$rating", 1] }
                        }
                    }
                }
            }
        }
    ]);

    if (!reviewStats || reviewStats.length === 0) {
        return {
            _id: brandObjectId,
            avgRating: 0,
            minRating: 0,
            maxRating: 0,
            totalReviews: 0,
            totalLaptops,
            fiveStarCount: 0,
            fourStarCount: 0,
            threeStarCount: 0,
            twoStarCount: 0,
            oneStarCount: 0
        };
    }
    
    return {
        ...reviewStats[0],
        totalLaptops
    };
}

export const getAllBrands = async (dataSet)=>{

    const brands = await Brand.find({})

    return brands

}