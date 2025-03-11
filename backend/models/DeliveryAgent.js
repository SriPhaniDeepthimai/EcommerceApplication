// models/DeliveryAgent.js
import mongoose from "mongoose";

const DeliveryAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  photo: { type: String }, // Store the path to the photo
}, { timestamps: true });

const DeliveryAgentModel = mongoose.models.DeliveryAgent||mongoose.model("DeliveryAgent",DeliveryAgentSchema);
export default DeliveryAgentModel;


