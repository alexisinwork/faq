import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema ({     
    reference: { type: String, required: true },
    date: { type: Date, required: true },
    delivered: { type: Boolean, required: true },
    cost: { type: Number, required: true },
})

// orderSchema.methods.speak = function () {
//     const greeting = this.name
//       ? "Meow name is " + this.name
//       : "I don't have a name";
//     console.log(greeting);
//   }

export default mongoose.model('Order', orderSchema)