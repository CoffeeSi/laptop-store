import mongoose from "mongoose"

const laptops_schema = mongoose.Schema({

    model_name : {type : String, required :true},
    price : {type : Number, required : true},
    specifications : { cpu : {type : String, required : true}, ram : {type : Number, required : true}, storage : {type : String, required : true}, gpu : {type : String, required : true}},
    stock_quantity : {type : Number, required : true},
    brand_id : {type : mongoose.Types.ObjectId, required : true, ref : "Brands"}
})


laptops_schema.index({
    brand_id: 1,
    "specifications.gpu": 1,
    "specifications.cpu": 1,
    "specifications.ram": 1
})
const Laptop = mongoose.model("Laptops", laptops_schema)

export default Laptop