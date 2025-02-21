import mongoose, { Schema } from "mongoose";

const otherProductSchema = new Schema({
  id: Number,
  name: String,
  Description: String,
  Price: Number,
  image:String,
  Calories:Number,
  Protein:Number,
  Fat:Number,
  Carbohydrates:Number,
  type: String,
  restaurantId: String//pass mongo db default _id for restaurant
});
//scaling,monetization,tech
mongoose.models = {};
const OtherProduct = mongoose.model.OtherProduct || mongoose.model("OtherProduct", otherProductSchema);
export default OtherProduct