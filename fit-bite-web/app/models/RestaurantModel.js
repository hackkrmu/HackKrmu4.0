import mongoose, { Schema } from "mongoose";

// Define the schema for the individual items in the form data
const restaurantItemSchema = new Schema({
  name: String,
  description: String,
});

// Define the main schema for the form data containing multiple items
const restaurantTypeSchema = new Schema({
  items: [restaurantItemSchema],
});
const restaurantSchema = new Schema({
  userId: { type: String, required: true},
  restaurantName: { type: String, required: true},
  // required: true,
  restaurantContactNumber: { type: Number, required: true},
  // required: true,
  restaurantEmail: { type: String, required: true},
  // required: true,
  restaurantAddress: { type: String, required: true},
  // required: true,
  restaurantLat: { type: Number, required: true},
  // required: true,
  restaurantLng: { type: Number, required: true},
  // required: true,
  restaurantType: restaurantTypeSchema,
  restaurantImage: { type: String},
});
mongoose.models = {};
const Restaurant =
  mongoose.model.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
