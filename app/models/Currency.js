import mongoose from "mongoose";

const CurrencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  value: { type: Number, required: true },
  isDefault: { type: Boolean, default: false },
});

export default mongoose.models.Currency || mongoose.model("Currency", CurrencySchema);
