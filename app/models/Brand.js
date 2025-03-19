import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

export default Brand;
