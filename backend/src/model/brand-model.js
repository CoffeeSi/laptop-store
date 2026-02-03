import mongoose from "mongoose"

const brands_schema = mongoose.Schema({

    brand_name : {type: String, required : true, unique : true},
    country : {type : String, required : true}

})

const Brand = mongoose.model("Brands", brands_schema)

export default Brand