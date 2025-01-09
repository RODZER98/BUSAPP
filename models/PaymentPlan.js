const mongoose = require('mongoose');

const PaymentPlanSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  price: { type: Number, required: true },
  trips: { type: Number, required: true },
  duration: { type: String, required: true }, // e.g., '1 month', '6 months'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PaymentPlan', PaymentPlanSchema);