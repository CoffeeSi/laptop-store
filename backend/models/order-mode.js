import mongoose from "mongoose"

const order_schema = mongoose.Schema({

    customer_id : {type : mongoose.Types.ObjectId, required : true},
    order_date : {type : Date, default: Date.now},
    status : {type : string, enum : ["pending", "shipping", "delievered"], required: true},
    total_price : {type : Number, required: true},
    items : {laptop_id : {type : mongoose.Types.ObjectId, required: true}, quantity : {type : Number, required : true}, unit_price : {type : Number, required :true}}

})

const Order = mongoose.Model("Orders", order_schema)

export default Order