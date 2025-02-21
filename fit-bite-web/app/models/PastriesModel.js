import mongoose, { Schema } from "mongoose";

const PastriesSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  image:String,
});
mongoose.models = {};
const Pastries = mongoose.model.Pastries || mongoose.model("Pastries", PastriesSchema);
export default Pastries