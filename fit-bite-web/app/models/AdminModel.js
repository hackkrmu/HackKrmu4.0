
import mongoose, { Schema } from "mongoose";
const adminSchema = new Schema({
    username: {type:String, required:true},

    Email: {type:String, required:true, unique:true},
        // {type:String, required:true, unique:true},
    // required: true,
    Password:{type:String, required:true},
    //  {type:String, required:true},
    // {type:String, required:true},
}, {timestamps:true})
mongoose.models = {};
const Admin =
  mongoose.model.Admin || mongoose.model("Admin", adminSchema);
export default Admin;