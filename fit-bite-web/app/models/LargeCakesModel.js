import mongoose, { Schema } from "mongoose";

const LargeCakeSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  image:String,
});
mongoose.models = {};
const LargeCake = mongoose.model.LargeCake || mongoose.model("LargeCake", LargeCakeSchema);
export default LargeCake