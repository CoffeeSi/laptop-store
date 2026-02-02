import mongoose from "mongoose"

const order_schema = mongoose.Schema({

    customer_id : {type : mongoose.Types.ObjectId, required : true},
    order_date : {type : Date, default: Date.now},


})
