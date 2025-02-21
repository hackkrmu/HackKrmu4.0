import mongoose, { Schema } from "mongoose";

const smallCakeSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  image:String,
});
mongoose.models = {};
const smallCake = mongoose.model.smallCake || mongoose.model("smallCake", smallCakeSchema);
export default smallCake