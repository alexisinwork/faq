import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  reference: { type: String, required: true },
  date: { type: Date, required: true },
  delivered: { type: Boolean, required: true },
  cost: { type: Number, required: true },
});

export default mongoose.model('Order', orderSchema);
