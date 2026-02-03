import mongoose from "mongoose"

const laptops_schema = mongoose.Schema({

    model_name : {type : String, required :true},
    price : {type : Number, required : true},
    specifications : {type : [{ cpu : {type : String, required : true}, ram : {type : String, required : true}, storage : {type : String, required : true}, gpu : {type : String, required : true}}], required : true},
    stock_quantity : {type : Number, required : true},
    brand_id : {type : mongoose.Types.ObjectId, required : true, ref : "Brands"}
})

const Laptop = mongoose.model("Laptops", laptops_schema)

export default Laptop