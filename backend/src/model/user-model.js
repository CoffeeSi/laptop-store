    import mongoose from "mongoose"

    const user_schema = mongoose.Schema({

        full_name : {type : String, required : true},
        email : {type : String, required : true, unique : true},
        phone : {type : String, required : true},
        address : {type : String, required : true},
        created_at : {type : Date, default : Date.now},
        passwordHash : {type : String, required : true},
        role : {type : String, enum : ["admin", "customer"]}// either : admin, customer

    })

    const User = mongoose.model("Users", user_schema)

    export default User