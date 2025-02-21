import mongoose, { Schema } from "mongoose";

const dessertSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  image:String,
});
mongoose.models = {};
const Dessert = mongoose.model.Dessert || mongoose.model("Dessert", dessertSchema);
export default Dessert