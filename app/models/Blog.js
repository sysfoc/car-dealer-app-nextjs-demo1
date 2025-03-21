import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  content: { type: String, required: true },

  categoryId: { type: String, required: true },
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  h1: { type: String, required: true },
  comments: [
    {
      user: String,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

BlogSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, "-") + "-" + uuidv4();
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
