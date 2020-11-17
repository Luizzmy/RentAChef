const {Schema, model}=require('mongoose')

const eventSchema= new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  type: String,
  picture:{
    type: String,
    default: "../public/images/default_event.png"
  },
  city: String,
  state: String,
  country: String,
  address:String,
  location:{
    type: {type:String},
    coordinates:[Number]
  },
  capacity: Number,
  start: String,
  end: String,
  description: String,
  date: String,
  foodTypes:[String],
  menu: [{name: String, type: String, price:Number, description: String}]  //No tan importante  
},{
  timestamps:true
})

eventSchema.index({location:"2dsphere"})

module.exports=model("Event", eventSchema)