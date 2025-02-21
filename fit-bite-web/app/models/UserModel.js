
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {type:String, required:true},
    // {type:String, required:true},
    // required: true,
    ContactNumber: {type:Number, required:true, unique:true},
    // {type:Number, required:true, unique:true},
    // required: true,
    Address: {type:String, required:true},
    Email: {type:String, required:true, unique:true},
        // {type:String, required:true, unique:true},
    // required: true,
    Password:{type:String, required:true},
    //  {type:String, required:true},
    // {type:String, required:true},
}, {timestamps:true})
mongoose.models = {};
const User =
  mongoose.model.User || mongoose.model("User", userSchema);
export default User;