import mongoose from 'mongoose';

const { Schema } = mongoose;

const pageViewSchema = new Schema({
  name: { type: String, required: true },
  counter: { type: Number, required: true },
});

export default mongoose.model('PageView', pageViewSchema);
