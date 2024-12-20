const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  condition: { type: String, enum: ["new", "used"], required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  year: { type: Number, required: true },
  mileage: { type: Number },
  gearbox: { type: String, enum: ["automatic", "manual"] },
  fuelType: { type: String },
  color: { type: String },
  description: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
