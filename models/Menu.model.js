const {Schema, model} = require('mongoose')

const menuSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  type: [String],
  price: Number,
  description: String
},{
  timestamps: true
})

module.exports = model("Menu", menuSchema)