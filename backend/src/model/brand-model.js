import mongoose from "mongoose"

const brands_schema = mongoose.Schema({

    brand_name : {type: String, required : true},
    country : {type : String, required : true}

})

const Brand = mongoose.Model("Brands", brands_schema)

export default Brand