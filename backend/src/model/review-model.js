import mongoose from "mongoose"

const reviews_schema = mongoose.Schema({

    rating : {type : Number, required : true},
    comment : {type : String, required : true},
    review_date : {type : Date, default : Date.now},
    laptop_id : {type : mongoose.Types.ObjectId, required : true, ref : "Laptops"},
    user_id : {type : mongoose.Types.ObjectId, required : true, ref : "Users"}

})

const Review = mongoose.model("Reviews", reviews_schema)

export default Review