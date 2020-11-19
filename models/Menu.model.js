const {Schema, model} = require('mongoose')

const menuSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  name: String,
  type: [String],
  price: Number,
  description: String
},{
  timestamps: true
})

module.exports = model("Menu", menuSchema)